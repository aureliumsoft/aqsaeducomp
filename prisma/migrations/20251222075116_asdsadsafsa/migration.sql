/*
  Warnings:

  - A unique constraint covering the columns `[courseId,userId]` on the table `Enrolment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Enrolment_courseId_userId_key" ON "Enrolment"("courseId", "userId");
