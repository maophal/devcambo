-- CreateTable
CREATE TABLE "LiveCode" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "lessonId" INTEGER NOT NULL,

    CONSTRAINT "LiveCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "lessonId" INTEGER NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LiveCode_lessonId_key" ON "LiveCode"("lessonId");

-- AddForeignKey
ALTER TABLE "LiveCode" ADD CONSTRAINT "LiveCode_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
