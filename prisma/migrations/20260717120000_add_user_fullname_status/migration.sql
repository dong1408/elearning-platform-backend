-- AlterTable
ALTER TABLE `users` ADD COLUMN `fullName` VARCHAR(191) NULL,
    ADD COLUMN `status` ENUM('ACTIVE', 'BLOCKED') NOT NULL DEFAULT 'ACTIVE';

-- CreateIndex
CREATE INDEX `users_status_idx` ON `users`(`status`);
