-- AlterTable
ALTER TABLE "JDMatch" ADD COLUMN     "improvements" TEXT[],
ADD COLUMN     "keywordMatch" TEXT[],
ADD COLUMN     "keywordMiss" TEXT[],
ADD COLUMN     "mistakes" TEXT[],
ADD COLUMN     "readability" TEXT,
ADD COLUMN     "spellIssues" TEXT[],
ADD COLUMN     "tone" TEXT;
