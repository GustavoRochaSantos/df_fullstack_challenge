/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `text` to the `post-comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_userId_fkey`;

-- DropForeignKey
ALTER TABLE `post-comment` DROP FOREIGN KEY `post-comment_postId_fkey`;

-- DropForeignKey
ALTER TABLE `post-like` DROP FOREIGN KEY `post-like_postId_fkey`;

-- DropForeignKey
ALTER TABLE `post-repost` DROP FOREIGN KEY `post-repost_postId_fkey`;

-- DropForeignKey
ALTER TABLE `post-view` DROP FOREIGN KEY `post-view_postId_fkey`;

-- AlterTable
ALTER TABLE `post-comment` ADD COLUMN `text` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Post`;

-- CreateTable
CREATE TABLE `post` (
    `id` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `photo` VARCHAR(191) NULL,
    `comments` INTEGER NOT NULL DEFAULT 0,
    `likes` INTEGER NOT NULL DEFAULT 0,
    `reposts` INTEGER NOT NULL DEFAULT 0,
    `views` INTEGER NOT NULL DEFAULT 0,
    `changedByUser` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `userId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post-like` ADD CONSTRAINT `post-like_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post-repost` ADD CONSTRAINT `post-repost_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post-view` ADD CONSTRAINT `post-view_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post-comment` ADD CONSTRAINT `post-comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
