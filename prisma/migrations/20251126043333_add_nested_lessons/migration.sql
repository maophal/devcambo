-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "parentId" INTEGER;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;
