/*
  Warnings:

  - You are about to drop the column `questionId` on the `Reports` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Reports` DROP FOREIGN KEY `Reports_questionId_fkey`;

-- AlterTable
ALTER TABLE `Reports` DROP COLUMN `questionId`;

-- CreateTable
CREATE TABLE `_QuestionToReports` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_QuestionToReports_AB_unique`(`A`, `B`),
    INDEX `_QuestionToReports_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_QuestionToReports` ADD CONSTRAINT `_QuestionToReports_A_fkey` FOREIGN KEY (`A`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_QuestionToReports` ADD CONSTRAINT `_QuestionToReports_B_fkey` FOREIGN KEY (`B`) REFERENCES `Reports`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
