/*
  Warnings:

  - Made the column `height` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Stat` ADD COLUMN `photo` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `height` INTEGER NOT NULL;
