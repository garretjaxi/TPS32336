CREATE TABLE `reviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`listing_id` int NOT NULL,
	`guest_name` varchar(256) NOT NULL,
	`guest_email` varchar(320),
	`rating` int NOT NULL DEFAULT 5,
	`title` varchar(256),
	`comment` text NOT NULL,
	`verified` tinyint NOT NULL DEFAULT 0,
	`helpful` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`)
);
