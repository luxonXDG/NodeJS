/*
SQLyog 企业版 - MySQL GUI v8.14 
MySQL - 5.5.5-10.1.37-MariaDB : Database - theshop
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`theshop` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `theshop`;

/*Table structure for table `banner` */

DROP TABLE IF EXISTS `banner`;

CREATE TABLE `banner` (
  `keyName` varchar(50) NOT NULL,
  `videoPath` varchar(50) NOT NULL,
  `CreateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `State` int(11) NOT NULL,
  `DelState` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `banner` */

insert  into `banner`(`keyName`,`videoPath`,`CreateTime`,`State`,`DelState`) values ('dasauto','video/dasauto.mp4','2020-04-29 18:29:00',1,1);

/*Table structure for table `category` */

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(50) NOT NULL,
  `summary` varchar(255) NOT NULL,
  `CreateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `State` int(11) NOT NULL DEFAULT '1',
  `DelState` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `categoryName` (`categoryName`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `category` */

insert  into `category`(`Id`,`categoryName`,`summary`,`CreateTime`,`State`,`DelState`) values (1,'轿车系列','实用轿车','2020-05-01 13:03:23',1,1),(2,'SUV系列','城市郊区全地形','2020-05-01 13:04:03',1,1),(3,'旗舰系列','豪华','2020-05-01 13:04:41',1,1),(4,'豪华系列','独一无二','2020-05-01 13:05:08',1,1);

/*Table structure for table `dizhi` */

DROP TABLE IF EXISTS `dizhi`;

CREATE TABLE `dizhi` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `guo` varchar(100) DEFAULT NULL,
  `shen` varchar(100) DEFAULT NULL,
  `cheng` varchar(100) DEFAULT NULL,
  `qu` varchar(100) DEFAULT NULL,
  `jie` varchar(100) DEFAULT NULL,
  `shouhuoren` varchar(100) DEFAULT NULL,
  `dianhua` varchar(100) DEFAULT NULL,
  `State` int(11) NOT NULL DEFAULT '1',
  `DelState` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`Id`),
  KEY `userId` (`userId`),
  CONSTRAINT `dizhi_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `userlist` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `dizhi` */

insert  into `dizhi`(`Id`,`userId`,`guo`,`shen`,`cheng`,`qu`,`jie`,`shouhuoren`,`dianhua`,`State`,`DelState`) values (1,1,'中国','四川','成都','金牛','茶店子东','喜德贵','18980783991',1,1),(2,1,'中国','四川','成都','武侯','芸桦路','葫芦娃','18980783991',1,1),(3,3,'中国','四川','成都','青羊','东二街','卢克西欧','18980783991',1,1),(4,1,'喜德贵','喜德贵','喜德贵','喜德贵','喜德贵','喜德贵','喜德贵',1,0),(5,1,'牛皮','请问','强无敌','驱蚊器的','恩特','其他区','18980783991',1,0),(6,1,'牛皮','4124','2131','42141','341','1343','124124',1,0);

/*Table structure for table `likebiao` */

DROP TABLE IF EXISTS `likebiao`;

CREATE TABLE `likebiao` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `peizhiId` int(11) DEFAULT NULL,
  `CreateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `State` int(11) NOT NULL DEFAULT '1',
  `DelState` int(11) NOT NULL DEFAULT '1',
  `dizhiId` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `userId` (`userId`),
  KEY `productId` (`productId`),
  KEY `peizhiId` (`peizhiId`),
  KEY `dizhiId` (`dizhiId`),
  CONSTRAINT `likebiao_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `userlist` (`Id`),
  CONSTRAINT `likebiao_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product` (`Id`),
  CONSTRAINT `likebiao_ibfk_3` FOREIGN KEY (`peizhiId`) REFERENCES `productrule` (`Id`),
  CONSTRAINT `likebiao_ibfk_4` FOREIGN KEY (`dizhiId`) REFERENCES `dizhi` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

/*Data for the table `likebiao` */

insert  into `likebiao`(`Id`,`userId`,`productId`,`peizhiId`,`CreateTime`,`State`,`DelState`,`dizhiId`) values (46,1,1,1,'2020-05-07 15:16:15',0,1,5),(47,1,2,7,'2020-05-07 15:16:20',0,1,5),(48,1,3,11,'2020-05-07 15:16:24',0,1,5),(49,1,1,1,'2020-05-07 15:17:39',0,1,6),(50,1,2,7,'2020-05-07 15:17:44',0,1,6),(51,1,3,13,'2020-05-07 15:17:51',0,1,6);

/*Table structure for table `product` */

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `summary` varchar(255) DEFAULT NULL,
  `feng` varchar(50) NOT NULL,
  `detail` text NOT NULL,
  `CatoryId` int(11) DEFAULT NULL,
  `CreateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `State` int(11) NOT NULL DEFAULT '1',
  `DelState` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`Id`),
  KEY `CatoryId` (`CatoryId`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`CatoryId`) REFERENCES `category` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

/*Data for the table `product` */

insert  into `product`(`Id`,`title`,`summary`,`feng`,`detail`,`CatoryId`,`CreateTime`,`State`,`DelState`) values (1,'朗逸','119800','img/car/jiaoche/langyi.jpg','外饰豪华镀铬套装\r\n前脸上明暗相间的镀铬饰板，通过不同材质的使用在明暗光影相交间大气又不失优雅。\r\n透镜式LED大灯\r\n全新一代朗逸全系标配LED大灯。增加行驶安全的同时，也在视觉上带来科技、未来的感受。\r\n熏黑全LED立体尾灯\r\n尾灯采用LED光源。增加行驶安全的同时，也在视觉上带来科技、未来的感受。\r\n精致车身侧标\r\n全新一代朗逸专属车身侧标，镀铬在光影错落间尽显档次。',1,'2020-05-01 13:17:53',1,1),(2,'帕萨特','189800','img/car/jiaoche/pasate.jpg','豪华',1,'2020-05-01 13:19:11',1,1),(3,'POLO','109800','img/car/jiaoche/polo.jpg','小巧',1,'2020-05-01 13:20:02',1,1),(4,'桑塔纳','79800','img/car/jiaoche/sangtana.jpg','实用',1,'2020-05-01 13:21:09',1,1),(5,'宝来','129800','img/car/jiaoche/baolai.jpg','豪华and运动',1,'2020-05-01 13:21:58',1,1),(6,'探歌','139800','img/car/suv/tange.jpg','tange',2,'2020-05-01 13:24:47',1,1),(7,'探岳','149800','img/car/suv/tanye.jpg','高级',2,'2020-05-01 13:26:12',1,1),(8,'探影','119800','img/car/suv/tanying.jpg','高级',2,'2020-05-01 13:26:53',1,1),(9,'途昂','179800','img/car/suv/tuang.jpg','高级',2,'2020-05-01 13:27:41',1,1),(10,'途观','198000','img/car/suv/tuguan.jpg','高级',2,'2020-05-01 13:28:28',1,1),(11,'辉昂','329800','img/car/qijian/huiang.jpg','高级',3,'2020-05-01 13:29:27',1,1),(12,'迈腾','349800','img/car/qijian/maiten.jpg','高级',3,'2020-05-01 13:30:19',1,1),(13,'passte(进口)','259800','img/car/qijian/passte.jpg','高级',3,'2020-05-01 13:31:08',1,1),(14,'辉腾','大众高级车','img/car/haohua/huiten.jpg','豪华',4,'2020-05-01 13:32:10',1,1);

/*Table structure for table `productrule` */

DROP TABLE IF EXISTS `productrule`;

CREATE TABLE `productrule` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `productId` int(11) DEFAULT NULL,
  `count` int(11) NOT NULL,
  `color` varchar(50) NOT NULL,
  `atmt` varchar(50) NOT NULL,
  `pailiang` varchar(50) NOT NULL,
  `peizhi` varchar(50) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `img` varchar(50) DEFAULT NULL,
  `CreateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `State` int(11) NOT NULL DEFAULT '1',
  `DelState` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`Id`),
  KEY `productId` (`productId`),
  CONSTRAINT `productrule_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

/*Data for the table `productrule` */

insert  into `productrule`(`Id`,`productId`,`count`,`color`,`atmt`,`pailiang`,`peizhi`,`price`,`img`,`CreateTime`,`State`,`DelState`) values (1,1,54,'珍珠白','5速手动','1.0T','青英版','109800',NULL,'2020-05-01 13:44:44',1,1),(2,1,23,'深邃黑','5速手动','1.0T','青英版','109800',NULL,'2020-05-01 13:46:42',1,1),(3,1,12,'珍珠白','7速双离合','1.0T','豪华版','119800',NULL,'2020-05-01 13:48:05',1,1),(4,1,12,'深邃黑','7速双离合','1.0T','豪华版','119800',NULL,'2020-05-01 13:49:20',1,1),(5,1,25,'珍珠白','7速双离合','1.3T','奢华版','139800',NULL,'2020-05-01 13:50:42',1,1),(6,1,11,'深邃黑','7速双离合','1.3T','奢华版','139800',NULL,'2020-05-01 13:52:24',1,1),(7,2,32,'庄重黑','7速双离合','1.6T','畅想版','189800',NULL,'2020-05-02 13:48:30',1,1),(8,2,23,'雪莲白','7速双离合','1.6T','畅想版','189800',NULL,'2020-05-02 13:50:28',1,1),(9,2,32,'庄重黑','9速手自一体','1.8T','全村吃饭版','219800',NULL,'2020-05-02 13:51:38',1,1),(10,2,23,'雪莲白','9速手自一体','1.8T','全村吃饭版','219800',NULL,'2020-05-02 13:52:39',1,1),(11,3,23,'无暇白','5速手动','1.2L','灵动版','99800',NULL,'2020-05-02 13:54:58',1,1),(12,3,5,'大众比斯开蓝','5速手动','1.2L','灵动版','99800',NULL,'2020-05-02 13:55:37',1,1),(13,3,24,'大众比斯开蓝','5速手动','EA888-2.0T','STI运动版','329000',NULL,'2020-05-02 13:57:29',1,1),(14,3,23,'无暇白','5速手动','EA888-2.0T','STI运动版','329000',NULL,'2020-05-02 13:59:53',1,1),(15,6,23,'活力橙','9AT','1.6T','时尚版','139000',NULL,'2020-05-02 14:02:21',1,1),(16,6,23,'活力橙','7速双离合','2.0T高功率','运动版','159000',NULL,'2020-05-02 14:03:41',1,1),(17,7,42,'大众比斯开蓝','9AT','1.8T','活力版','149800',NULL,'2020-05-02 14:05:38',1,1),(18,7,23,'大众比斯开蓝','9AT','2.0T','青春版','198000',NULL,'2020-05-02 14:07:36',1,1),(19,8,34,'深空灰','9AT','2.0T','时尚版','209800',NULL,'2020-05-02 14:08:44',1,1),(20,8,23,'荣耀红','7速双离合','2.4T','时尚版','259800',NULL,'2020-05-02 14:09:58',1,1),(21,11,45,'行政黑','9AT','2.0T','端庄版','329800',NULL,'2020-05-02 14:13:17',1,1),(22,11,34,'行政黑','9AT','2.4T','行政版','349800',NULL,'2020-05-02 14:14:10',1,1),(23,12,23,'庄严黑','9AT','2.4T','高级黑色轿车版','349800',NULL,'2020-05-02 14:15:25',1,1),(24,12,35,'庄严黑','9速手自一体','3.0T','大众神车版','394800',NULL,'2020-05-02 14:16:44',1,1),(25,13,53,'The deep dark','7DCT','2.0T','The senior passte','249800',NULL,'2020-05-02 14:19:11',1,1),(26,13,42,'The deep dark','7DCT','EA390-4.0L','The passte Sports STI-Line','629900',NULL,'2020-05-02 14:22:54',1,1);

/*Table structure for table `userlist` */

DROP TABLE IF EXISTS `userlist`;

CREATE TABLE `userlist` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(50) NOT NULL,
  `Pwd` varchar(20) NOT NULL,
  `HeadImage` varchar(200) NOT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Signs` varchar(100) DEFAULT NULL,
  `CreateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `State` int(11) NOT NULL DEFAULT '1',
  `DelState` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `userlist` */

insert  into `userlist`(`Id`,`UserName`,`Pwd`,`HeadImage`,`Email`,`Signs`,`CreateTime`,`State`,`DelState`) values (1,'xidegui','123','img/head/moren.png','957539943@qq.com',NULL,'2020-04-27 22:25:38',1,1),(3,'luxon','123','img/head/moren.png','2431996936@qq.com',NULL,'2020-04-29 22:49:32',1,1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
