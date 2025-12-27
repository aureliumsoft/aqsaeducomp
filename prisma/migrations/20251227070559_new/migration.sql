-- CreateEnum
CREATE TYPE "VideoSource" AS ENUM ('UPLOAD', 'EMBED');

-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "embedUrl" TEXT,
ADD COLUMN     "videoSource" "VideoSource" NOT NULL DEFAULT 'EMBED',
ALTER COLUMN "videoKey" DROP NOT NULL;
