/*
  Warnings:

  - You are about to drop the `_QuestionToReports` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_QuestionToReports` DROP FOREIGN KEY `_QuestionToReports_A_fkey`;

-- DropForeignKey
ALTER TABLE `_QuestionToReports` DROP FOREIGN KEY `_QuestionToReports_B_fkey`;

-- DropTable
DROP TABLE `_QuestionToReports`;

-- CreateTable
CREATE TABLE `_ReportsAnsweredRight` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ReportsAnsweredRight_AB_unique`(`A`, `B`),
    INDEX `_ReportsAnsweredRight_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ReportsAnsweredWrong` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ReportsAnsweredWrong_AB_unique`(`A`, `B`),
    INDEX `_ReportsAnsweredWrong_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ReportsAnsweredRight` ADD CONSTRAINT `_ReportsAnsweredRight_A_fkey` FOREIGN KEY (`A`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ReportsAnsweredRight` ADD CONSTRAINT `_ReportsAnsweredRight_B_fkey` FOREIGN KEY (`B`) REFERENCES `Reports`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ReportsAnsweredWrong` ADD CONSTRAINT `_ReportsAnsweredWrong_A_fkey` FOREIGN KEY (`A`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ReportsAnsweredWrong` ADD CONSTRAINT `_ReportsAnsweredWrong_B_fkey` FOREIGN KEY (`B`) REFERENCES `Reports`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
