/*
  Warnings:

  - The values [Advances] on the enum `CourseLevels` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CourseLevels_new" AS ENUM ('Beginner', 'Intermediate', 'Advanced');
ALTER TABLE "Course" ALTER COLUMN "level" DROP DEFAULT;
ALTER TABLE "Course" ALTER COLUMN "level" TYPE "CourseLevels_new" USING ("level"::text::"CourseLevels_new");
ALTER TYPE "CourseLevels" RENAME TO "CourseLevels_old";
ALTER TYPE "CourseLevels_new" RENAME TO "CourseLevels";
DROP TYPE "CourseLevels_old";
ALTER TABLE "Course" ALTER COLUMN "level" SET DEFAULT 'Beginner';
COMMIT;
