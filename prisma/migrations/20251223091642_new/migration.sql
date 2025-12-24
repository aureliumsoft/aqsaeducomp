-- DropForeignKey
ALTER TABLE "Enrolment" DROP CONSTRAINT "Enrolment_courseId_fkey";

-- AddForeignKey
ALTER TABLE "Enrolment" ADD CONSTRAINT "Enrolment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
