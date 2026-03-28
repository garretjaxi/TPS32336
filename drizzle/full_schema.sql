-- Full consolidated schema for themeparkstays database
-- Run this against a fresh MySQL database to set up all tables

CREATE TABLE IF NOT EXISTS `users` (
  `id` int AUTO_INCREMENT NOT NULL,
  `openId` varchar(64) NOT NULL,
  `name` text,
  `email` varchar(320),
  `loginMethod` varchar(64),
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `stripeCustomerId` varchar(128),
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  `lastSignedIn` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `users_id` PRIMARY KEY(`id`),
  CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);

CREATE TABLE IF NOT EXISTS `orders` (
  `id` int AUTO_INCREMENT NOT NULL,
  `order_id` varchar(128) NOT NULL,
  `user_id` int,
  `guest_email` varchar(320) NOT NULL,
  `guest_name` varchar(256),
  `stripe_session_id` varchar(256),
  `stripe_payment_intent_id` varchar(256),
  `amount` decimal(10,2) NOT NULL,
  `currency` varchar(3) NOT NULL DEFAULT 'USD',
  `status` enum('pending','completed','failed','cancelled') NOT NULL DEFAULT 'pending',
  `items` json NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `orders_id` PRIMARY KEY(`id`),
  CONSTRAINT `orders_order_id_unique` UNIQUE(`order_id`)
);

CREATE TABLE IF NOT EXISTS `productInventory` (
  `id` int AUTO_INCREMENT NOT NULL,
  `productId` varchar(64) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` enum('services','welcome','activities') NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `isActive` int NOT NULL DEFAULT 1,
  `maxQuantityPerOrder` int NOT NULL DEFAULT 10,
  `description` text,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `productInventory_id` PRIMARY KEY(`id`),
  CONSTRAINT `productInventory_productId_unique` UNIQUE(`productId`)
);

CREATE TABLE IF NOT EXISTS `booking_inquiries` (
  `id` int AUTO_INCREMENT NOT NULL,
  `property_name` varchar(256),
  `guest_name` varchar(256) NOT NULL,
  `guest_email` varchar(320) NOT NULL,
  `guest_phone` varchar(32),
  `check_in` varchar(16),
  `check_out` varchar(16),
  `guests` int DEFAULT 1,
  `message` text,
  `status` enum('new','contacted','booked','closed') NOT NULL DEFAULT 'new',
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `booking_inquiries_id` PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `listings` (
  `id` int AUTO_INCREMENT NOT NULL,
  `name` varchar(256) NOT NULL,
  `tagline` varchar(512) NOT NULL,
  `location` varchar(256) NOT NULL,
  `listing_type` varchar(20) NOT NULL DEFAULT 'home',
  `beds` int NOT NULL DEFAULT 1,
  `baths` decimal(4,1) NOT NULL DEFAULT '1.0',
  `guests` int NOT NULL DEFAULT 2,
  `price` int NOT NULL DEFAULT 100,
  `rating` decimal(3,2) NOT NULL DEFAULT '5.00',
  `reviews` int NOT NULL DEFAULT 0,
  `tags` json NOT NULL,
  `badges` json NOT NULL,
  `image` text NOT NULL,
  `houfy_url` text NOT NULL DEFAULT (''),
  `featured` tinyint NOT NULL DEFAULT 0,
  `active` tinyint NOT NULL DEFAULT 1,
  `sort_order` int NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `listings_id` PRIMARY KEY(`id`)
);
