CREATE TABLE `booking_inquiries` (
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
--> statement-breakpoint
CREATE TABLE `orders` (
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
--> statement-breakpoint
CREATE TABLE `productInventory` (
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
--> statement-breakpoint
ALTER TABLE `users` ADD `stripeCustomerId` varchar(128);