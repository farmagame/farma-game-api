/*
  Warnings:

  - You are about to alter the column `options` on the `Question` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Json`.

*/
-- AlterTable
ALTER TABLE `Question` MODIFY `options` JSON NOT NULL;
