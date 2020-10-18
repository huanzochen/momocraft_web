CREATE DATABASE  IF NOT EXISTS `web` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `web`;
-- MySQL dump 10.13  Distrib 8.0.12, for Win64 (x86_64)
--
-- Host: localhost    Database: web
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `common`
--

DROP TABLE IF EXISTS `common`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `common` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `text` varchar(1000) DEFAULT NULL,
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `common`
--

LOCK TABLES `common` WRITE;
/*!40000 ALTER TABLE `common` DISABLE KEYS */;
INSERT INTO `common` VALUES (1,'momo','momo','2019-08-20 15:22:12'),(2,'name_en','momocraft','2019-08-20 15:22:12'),(3,'website','momocraft.tw','2019-08-20 15:22:31'),(4,'info','茉茉伺服器ღ 全面更新！ 趣味生存 | 交友 | 經濟','2019-08-20 15:24:27'),(5,'statuson','開放中','2019-08-20 15:24:27'),(6,'statusoff','維修中','2019-08-20 15:24:27'),(7,'discord','https://discord.gg/wg29kWt','2019-08-20 15:25:23'),(8,'name_ch','茉茉伺服器','2019-08-21 04:57:19'),(9,'websitedev','momocraftban.ddns.me','2019-08-21 05:01:24'),(10,'website_https','https://momocraft.tw','2019-08-21 05:03:01'),(11,'websitedev_https','https://momocraftban.ddns.me','2019-08-21 05:03:01');
/*!40000 ALTER TABLE `common` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `member` (
  `act_name` varchar(16) NOT NULL,
  `pwd` varchar(64) NOT NULL,
  `email` varchar(200) NOT NULL,
  `rank` varchar(45) NOT NULL DEFAULT 'member',
  `register_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`act_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES ('chect','1093','cy94295@gmail.com','member','2019-08-21 12:04:45'),('cy942950513','0512f4e595d3e77ba3d11aa45168ea0934595175cc11e5bd07b1a5d41e63ac9f','cy942950513@gmail.com','member','2019-08-23 13:46:05'),('HHH','870a82e0793d4d25e917a353bc4b2e593b1bea1f4cdcc5fe5e29f7ad367aac6c','HHH','member','2020-01-08 13:30:40'),('Hi_Im_Hacker_O','870a82e0793d4d25e917a353bc4b2e593b1bea1f4cdcc5fe5e29f7ad367aac6c','Hi_Im_Hacker_O@gmail.com','member','2019-08-23 15:14:54'),('huangge0513','fbcb360435dcc713ffb95bb7874c790de9b54ba2a3dc4c6f206bcd64a46930f3','cy94295@gmail.com','member','2020-03-15 10:03:39'),('huangge0514','ee1757d1d70315da31f617013e9666f817666dfa60d86a76f0525e22df09e306','cy94295@gmail.com','member','2020-10-18 14:12:33');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `session` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `act_name` varchar(45) NOT NULL,
  `content` varchar(3000) NOT NULL,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
INSERT INTO `session` VALUES (2,'12213','312123213','2019-08-21 17:36:38'),(3,'chect','[object Object]','2019-08-21 18:28:58'),(4,'chect','[object Object]','2019-08-21 18:31:27'),(5,'chect','[object Object]','2019-08-21 18:33:27');
/*!40000 ALTER TABLE `session` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-18 22:43:33
