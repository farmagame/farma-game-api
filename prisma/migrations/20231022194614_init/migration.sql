/*
  Warnings:

  - You are about to drop the column `reportId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Question` table. All the data in the column will be lost.
  - Added the required column `ask` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionId` to the `Reports` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Question` DROP FOREIGN KEY `Question_reportId_fkey`;

-- AlterTable
ALTER TABLE `Question` DROP COLUMN `reportId`,
    DROP COLUMN `title`,
    ADD COLUMN `ask` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Reports` ADD COLUMN `questionId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Reports` ADD CONSTRAINT `Reports_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
