-- CreateEnum
CREATE TYPE "CodeType" AS ENUM ('HTML', 'CSS', 'JS', 'TS');

-- AlterTable
ALTER TABLE "LiveCode" ADD COLUMN     "type" "CodeType" NOT NULL DEFAULT 'JS';
