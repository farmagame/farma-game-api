/*
  Warnings:

  - You are about to drop the `Options` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `options` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Options` DROP FOREIGN KEY `Options_questionId_fkey`;

-- AlterTable
ALTER TABLE `Question` ADD COLUMN `options` TEXT NOT NULL;

-- DropTable
DROP TABLE `Options`;
