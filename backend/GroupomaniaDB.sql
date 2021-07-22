-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomaniadb
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` int unsigned NOT NULL,
  `title` varchar(100) NOT NULL,
  `text` text,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_postsuserid_id` (`userId`),
  CONSTRAINT `fk_userId_posts` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (41,9,'Une publication ','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in ipsum feugiat, semper metus pulvinar, sollicitudin leo. Nulla nunc dolor, vulputate a faucibus aliquet, venenatis vel sem. Sed purus odio, luctus ut orci at, placerat auctor ex. Vestibulum accumsan, velit a euismod tincidunt, nisl dui finibus arcu, a ultrices nunc.','2021-07-23 00:34:51'),(42,9,'Une autre publication','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in ipsum feugiat, semper metus pulvinar, sollicitudin leo. Nulla nunc dolor, vulputate a faucibus aliquet, venenatis vel sem. Sed purus odio, luctus ut orci at, placerat auctor ex. Vestibulum accumsan, velit a euismod tincidunt, nisl dui finibus arcu, a ultrices nunc.','2021-07-23 00:35:09'),(43,10,'Ma publication','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in ipsum feugiat, semper metus pulvinar, sollicitudin leo. Nulla nunc dolor, vulputate a faucibus aliquet, venenatis vel sem. Sed purus odio, luctus ut orci at, placerat auctor ex. Vestibulum accumsan, velit a euismod tincidunt, nisl dui finibus arcu, a ultrices nunc.','2021-07-23 00:37:51'),(44,10,'Mon autre publication','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in ipsum feugiat, semper metus pulvinar, sollicitudin leo. Nulla nunc dolor, vulputate a faucibus aliquet, venenatis vel sem. Sed purus odio, luctus ut orci at, placerat auctor ex. Vestibulum accumsan, velit a euismod tincidunt, nisl dui finibus arcu, a ultrices nunc.','2021-07-23 00:38:14');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(320) NOT NULL,
  `name` varchar(80) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'alb********@*******om','Albert Camus','$2b$10$DPwQUnoUATeE93LcdaeSheY3tDVhGz57RoPln.sGb8qeWK8BpXV0W',0),(2,'use*****@******om','usertest','$2b$10$O4EM5KUDssdCBBnIjZOBlePgahYojF4071p1M72RcVbfG3ZNtemra',0),(4,'alb********@*******om','Albert Camus','$2b$10$bZClSWIDHsj.Qjcvx0g5nuf5W31QXsN.ayqS8ycWzY1ITGjjsGSC.',0),(5,'exa****@********fr','example','$2b$10$.9VqN0wp06QvedT9G7IB0edvnZxee3Ozlmf8NBK2lNeadgAsol8Be',0),(9,'mi.********@*******om','Michel Berthier','$2b$10$vD82RrmOMeYLnxRTC4XFB.uCcp0XsYW2Sm177TTd57SR8td8g6hVq',0),(10,'j.m******@************fr','John McClain','$2b$10$O7Kn3NcHGtv6KJTN58Rnie73T.rwOlrIuAfiDhXimNjH9U5qTpJCe',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-23  1:18:45
