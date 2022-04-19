-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `slug` VARCHAR(191) NOT NULL DEFAULT '',
    `url` VARCHAR(191) NOT NULL DEFAULT '',
    `slug_url` VARCHAR(191) NOT NULL DEFAULT '',
    `updated_at` VARCHAR(191) NOT NULL DEFAULT '',
    `parent` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
