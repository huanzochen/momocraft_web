-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: web
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `common` (
  `id` int NOT NULL AUTO_INCREMENT,
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
-- Table structure for table `forgetlog`
--

DROP TABLE IF EXISTS `forgetlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forgetlog` (
  `pid` int NOT NULL AUTO_INCREMENT,
  `email` varchar(300) NOT NULL,
  `success` tinyint NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `token_used` tinyint NOT NULL,
  `updated_time` datetime NOT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forgetlog`
--

LOCK TABLES `forgetlog` WRITE;
/*!40000 ALTER TABLE `forgetlog` DISABLE KEYS */;
INSERT INTO `forgetlog` VALUES (1,'momoservertwd@gmail.com',1,'',0,'2020-11-29 23:41:57'),(2,'momoservertw@gmail.com',1,'',0,'2020-11-29 23:42:04'),(3,'momoservertw@gmail.com',1,'',0,'2020-11-29 23:42:08'),(4,'momoservertw@gmail.com',1,'',0,'2020-11-29 23:42:12'),(5,'momoservertw@gmail.com',1,'',0,'2020-11-29 23:42:17'),(6,'momoservertw@gmail.com',1,'',0,'2020-11-29 23:42:25'),(7,'momoservertw@gmail.com',1,'',0,'2020-11-29 23:42:36'),(8,'momoservertw@gmail.com',1,'',0,'2020-11-29 23:47:36'),(9,'momoservertw@gmail.com',1,'',0,'2020-11-29 23:47:59'),(10,'momoservertw@gmail.com',1,'',0,'2020-11-29 23:48:04'),(11,'momoservertw@gmail.com',1,'',0,'2020-11-29 23:48:37'),(12,'cy94295@gmail.com',1,'',0,'2020-11-29 23:51:23'),(13,'cy94295@gmail.com',1,'',0,'2020-11-30 00:08:02'),(14,'cy94295@gmail.com',1,'',0,'2020-11-30 00:08:03'),(15,'cy94295@gmail.com',1,'',0,'2020-11-30 17:01:36'),(16,'cy94295@gmail.com',1,'',0,'2020-11-30 17:02:25'),(17,'cy94295@gmail.com',1,'',0,'2020-11-30 17:02:32'),(18,'cy94295@gmail.com',1,'',0,'2020-11-30 17:05:57'),(19,'edward110162@gmail.com',1,'',0,'2020-11-30 17:18:59'),(20,'cy94295@gmail.com',1,'31b9e316513dc1aecbdcf9aa101f476d52433351329af05473',0,'2020-11-30 21:23:11'),(21,'cy94295@gmail.com',1,'72d954b6bf873d079dbeed81cb259bf5a49801d68efca52ab6',0,'2020-11-30 21:37:44'),(22,'cy94295@gmail.com',1,'e6e399b4e5c4d777b920a2f0cc98894b097527b5db94305736',0,'2020-11-30 21:41:04'),(23,'cy94295@gmail.com',1,'5f33aee76e081b64c887a3eaba8f3aee4b19cf7eac14260fb8',0,'2020-11-30 21:42:35'),(24,'cy94295@gmail.com',1,'68ab7cf7fb5953ed88225ed02725075a8ac60927cd4fe43b90',0,'2020-11-30 21:44:30'),(25,'cy94295@gmail.com',1,'a8871949ddf00d3ebd11c0e491618546c9a11cf87dc223a065',0,'2020-11-30 21:50:35'),(26,'cy94295@gmail.com',1,'36476adbcdaa53c1fdf6c1e15d18b1519355f4f04a6b30a030',0,'2020-11-30 21:52:40'),(27,'cy94295@gmail.com',1,'7f50b2544f539df9ed9ee1c621b4764ff568e1c9015383e319',0,'2020-11-30 22:04:37'),(28,'cy94295@gmail.com',1,'48d82c299d0d2e551d3ee78eb070be1b96b1687144c42e79c5',0,'2020-11-30 22:14:15'),(29,'cy94295@gmail.com',1,'f0c6bb9df435aefdbe34719c908dea7664c094c6fe1c351ff8',0,'2020-11-30 22:21:20'),(30,'cy94295@gmail.com',1,'5143e6816bf48f3f854d1f9818dbe44ce6d7f00176c602923b',0,'2020-11-30 22:23:18'),(31,'cy94295@gmail.com',1,'0923834f26514147c52ac73f0f9f05834ed3df1e8d2bf29496',0,'2020-11-30 22:24:17'),(32,'cy94295@gmail.com',1,'85d58a2cab7dc080aa8e4935c659c1f0cf15ef2ba30a84220b',0,'2020-11-30 22:28:03'),(33,'cy94295@gmail.com',1,'84763c1f44461743ef2689d0c9cddd42613aa2cf4032b8436b',1,'2020-11-30 22:39:15'),(34,'cy94295@gmail.com',1,'1f5fc95efd245894e51eb78705133c542b1f44395e4fae7c9b',1,'2020-12-01 10:59:22'),(35,'cy94295@gmail.com',1,'84c411203c105ea4611844da4105d2e5e04afd19ffb2b62ca0',0,'2020-12-01 11:00:37'),(36,'cy94295@gmail.com',1,'f3760e84d4280d3f475cbd5a19eee35c42cd24ead46a57cd25',1,'2020-12-01 11:02:14'),(37,'cy94295@gmail.com',1,'de51467d2503cd1d84a023211f7677150157b27e9ba4a9bd5a',0,'2020-12-01 11:47:27'),(38,'cy94295@gmail.com',1,'20e4d095c5c474344de00a14fe07c65cc5de6251ae43e2889b',1,'2020-12-01 11:50:12'),(39,'cy94295@gmail.com',1,'c068df272f2095510fe017b4c0cb50821eb33d868cf204b15a',1,'2020-12-01 12:11:32'),(40,'cy94295@gmail.com',1,'9e08e984c97f8893e70ad4efe0cb9fdd495ea0321d69a5a634',1,'2020-12-01 12:14:41'),(41,'cy94295@gmail.com',1,'fd641b571c675af4e622defc38c354af9aa3c559bfe10a2bc9',1,'2020-12-01 12:16:51');
/*!40000 ALTER TABLE `forgetlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loginlog`
--

DROP TABLE IF EXISTS `loginlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loginlog` (
  `pid` int NOT NULL AUTO_INCREMENT,
  `account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `success` tinyint NOT NULL,
  `updated_time` datetime NOT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loginlog`
--

LOCK TABLES `loginlog` WRITE;
/*!40000 ALTER TABLE `loginlog` DISABLE KEYS */;
INSERT INTO `loginlog` VALUES (26,'chect',0,'2020-11-30 16:58:09'),(27,'chect',0,'2020-11-30 16:58:46'),(28,'chect',0,'2020-11-30 16:59:00'),(29,'huangge0513',1,'2020-11-30 16:59:17'),(30,'huangge0513',0,'2020-11-30 16:59:52'),(31,'huangge0513',0,'2020-11-30 16:59:54'),(32,'huangge0513',1,'2020-11-30 16:59:55'),(33,'huangge0513',0,'2020-11-30 17:00:04'),(34,'huangge0513',0,'2020-11-30 17:00:05'),(35,'huangge0513',0,'2020-11-30 17:00:06'),(36,'huangge0513',0,'2020-11-30 17:00:07'),(37,'huangge0513',1,'2020-11-30 18:00:35'),(38,'huangge0513',1,'2020-11-30 18:00:51'),(39,'huangge0513',1,'2020-11-30 18:01:00'),(40,'huangge0513',1,'2020-11-30 18:02:09'),(41,'huangge0513',1,'2020-11-30 21:10:25'),(42,'huangge0513',1,'2020-11-30 21:10:30'),(43,'huangge0513',1,'2020-12-01 11:47:43'),(50,'huangge0513',0,'2020-12-01 11:55:29'),(51,'huangge0513',0,'2020-12-01 11:55:36'),(52,'huangge0513',1,'2020-12-01 12:11:23'),(53,'huangge0513',0,'2020-12-01 12:13:25'),(54,'huangge0513',1,'2020-12-01 12:14:29'),(55,'huangge0513',1,'2020-12-01 12:15:41'),(56,'huangge0513',1,'2020-12-01 12:15:41'),(57,'huangge0513',0,'2020-12-01 12:15:50'),(58,'huangge0513',1,'2020-12-01 12:24:25');
/*!40000 ALTER TABLE `loginlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `uuid` varchar(36) NOT NULL,
  `act_name` varchar(16) NOT NULL,
  `pwd` varchar(64) NOT NULL,
  `email` varchar(200) NOT NULL,
  `rank` varchar(45) NOT NULL DEFAULT 'member',
  `register_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES ('12','huangge0513','fbcb360435dcc713ffb95bb7874c790de9b54ba2a3dc4c6f206bcd64a46930f3','cy94295@gmail.com','member','2020-03-15 10:03:39'),('123','chect','1093','cy94295@gmail.com','member','2019-08-21 12:04:45'),('223','cy942950513','0512f4e595d3e77ba3d11aa45168ea0934595175cc11e5bd07b1a5d41e63ac9f','cy942950513@gmail.com','member','2019-08-23 13:46:05'),('234','Hi_Im_Hacker_O','870a82e0793d4d25e917a353bc4b2e593b1bea1f4cdcc5fe5e29f7ad367aac6c','Hi_Im_Hacker_O@gmail.com','member','2019-08-23 15:14:54'),('321','huangge0514','ee1757d1d70315da31f617013e9666f817666dfa60d86a76f0525e22df09e306','cy94295@gmail.com','member','2020-10-18 14:12:33'),('34','HHH','870a82e0793d4d25e917a353bc4b2e593b1bea1f4cdcc5fe5e29f7ad367aac6c','HHH','member','2020-01-08 13:30:40'),('3437e69a-b9fa-3326-82c0-87c2ce45a838','chectt','ee1757d1d70315da31f617013e9666f817666dfa60d86a76f0525e22df09e306','huangge0513','member','2020-11-29 09:18:56');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session` (
  `id` int NOT NULL AUTO_INCREMENT,
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

-- Dump completed on 2020-12-01 16:50:50
