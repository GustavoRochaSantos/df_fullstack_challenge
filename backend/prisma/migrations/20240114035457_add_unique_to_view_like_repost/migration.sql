/*
  Warnings:

  - A unique constraint covering the columns `[postId,likedByUserId]` on the table `post-like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[postId,repostedByUserId]` on the table `post-repost` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[postId,viewedByUserId]` on the table `post-view` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `post-like_postId_likedByUserId_key` ON `post-like`(`postId`, `likedByUserId`);

-- CreateIndex
CREATE UNIQUE INDEX `post-repost_postId_repostedByUserId_key` ON `post-repost`(`postId`, `repostedByUserId`);

-- CreateIndex
CREATE UNIQUE INDEX `post-view_postId_viewedByUserId_key` ON `post-view`(`postId`, `viewedByUserId`);
