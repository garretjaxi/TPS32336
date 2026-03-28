CREATE TABLE `vip_subscribers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`discountCode` varchar(32) NOT NULL DEFAULT 'Online10',
	`discountPercentage` int NOT NULL DEFAULT 10,
	`isActive` tinyint NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `vip_subscribers_id` PRIMARY KEY(`id`),
	CONSTRAINT `vip_subscribers_email_unique` UNIQUE(`email`)
);
