/*
  Warnings:

  - You are about to alter the column `weight` on the `Stat` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `arm` on the `Stat` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `chest` on the `Stat` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `waist` on the `Stat` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `hips` on the `Stat` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Stat` MODIFY `weight` DOUBLE NOT NULL,
    MODIFY `arm` DOUBLE NULL,
    MODIFY `chest` DOUBLE NULL,
    MODIFY `waist` DOUBLE NULL,
    MODIFY `hips` DOUBLE NULL;
