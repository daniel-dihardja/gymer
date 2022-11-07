CREATE DATABASE IF NOT EXISTS `test`;
GRANT ALL ON `test`.* TO 'user'@'%';

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(64) NOT NULL,
  `role` varchar(45) NOT NULL DEFAULT 'user',
  `activationToken` varchar(256) NOT NULL DEFAULT '',
  `recoveryCode` int(11) NOT NULL DEFAULT 0,
  `isActive` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `user` (`id`, `firstName`, `lastName`, `email`, `password`, `role`, `activationToken`, `recoveryCode`, `isActive`, `createdAt`) VALUES
(1,	'John',	'Doe',	'abc@xyz.de',	'$2b$10$A6yLu395UbfL3lxReR3eq.1GjKKjzQyDHzuFNX94LzZzpxqgNaAku',	'user',	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFiY0B4eXouZGUiLCJpYXQiOjE2NjM2MDc0MTQsImV4cCI6MTY2MzYxMTAxNH0.Giwic5r2LUsWaIciNdums03ux_auqnctORsNGQuonOc',	0,	1,	'2022-09-19 19:10:14.957409');

DROP TABLE IF EXISTS `credit`;
CREATE TABLE `credit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` int(11) NOT NULL,
  `ref` varchar(255) NOT NULL,
  `total` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9f5fdca6886a2ecdb6d34b23d70` (`userId`),
  CONSTRAINT `FK_9f5fdca6886a2ecdb6d34b23d70` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `credit` (`id`, `amount`, `ref`, `total`, `price`, `createdAt`, `userId`) VALUES
(1,	100,	'buy',	100,	100,	'2022-09-19 19:10:43.574972',	1),
(2,	100,	'buy',	200,	100,	'2022-09-19 19:10:44.594725',	1),
(3,	100,	'buy',	300,	100,	'2022-09-19 19:10:45.384273',	1),
(4,	100,	'buy',	400,	100,	'2022-09-19 19:10:46.649558',	1),
(5,	100,	'buy',	500,	100,	'2022-09-19 19:10:47.274652',	1);



-- 2022-09-19 17:11:29
