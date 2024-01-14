/*
  Warnings:

  - Added the required column `updatedAt` to the `post-comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post-comment` ADD COLUMN `changedByUser` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
