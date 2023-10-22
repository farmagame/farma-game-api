/*
  Warnings:

  - You are about to drop the column `category` on the `Reports` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Reports_category_key` ON `Reports`;

-- AlterTable
ALTER TABLE `Reports` DROP COLUMN `category`;
