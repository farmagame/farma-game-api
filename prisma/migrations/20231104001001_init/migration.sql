/*
  Warnings:

  - Added the required column `messageQuestionSuccess` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `messageQuestionWrong` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Question` ADD COLUMN `messageQuestionSuccess` VARCHAR(191) NOT NULL,
    ADD COLUMN `messageQuestionWrong` VARCHAR(191) NOT NULL;
