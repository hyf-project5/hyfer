-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: hyf3
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `group_students`
--

DROP TABLE IF EXISTS `group_students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `group_students` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `group_id` int(8) NOT NULL,
  `user_id` int(8) NOT NULL,
  `current_status` varchar(145) NOT NULL DEFAULT 'Active',
  `hired` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_user_id` (`user_id`),
  KEY `fk_group_id` (`group_id`),
  CONSTRAINT `fk_group_id` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groups` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(145) DEFAULT NULL,
  `starting_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `modules`
--

DROP TABLE IF EXISTS `modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `modules` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `module_name` varchar(145) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `added_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `module_img` varchar(2083) DEFAULT NULL,
  `default_duration` int(2) NOT NULL DEFAULT '3',
  `seq_number` int(4) DEFAULT NULL,
  `git_url` varchar(2083) DEFAULT NULL,
  `git_owner` varchar(145) DEFAULT NULL,
  `git_repo` varchar(145) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `running_module_teachers`
--

DROP TABLE IF EXISTS `running_module_teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `running_module_teachers` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `running_module_id` int(8) NOT NULL,
  `user_id` int(8) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_running_module_teacher` (`running_module_id`),
  KEY `fk_user` (`user_id`),
  CONSTRAINT `fk_running_module_teacher` FOREIGN KEY (`running_module_id`) REFERENCES `running_modules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `running_modules`
--

DROP TABLE IF EXISTS `running_modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `running_modules` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `starting_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `scheduled_end` datetime DEFAULT NULL,
  `description` varchar(145) DEFAULT NULL,
  `module_id` int(8) NOT NULL,
  `group_id` int(8) NOT NULL,
  `finished` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_module` (`module_id`),
  KEY `fk_group_name` (`group_id`),
  CONSTRAINT `fk_group_name` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_module` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `username` varchar(145) DEFAULT NULL,
  `oauth_provider` varchar(32) DEFAULT NULL,
  `access_token` varchar(64) DEFAULT NULL,
  `hashed_password` varchar(256) DEFAULT NULL,
  `salt` varchar(65) DEFAULT NULL,
  `role` varchar(145) DEFAULT NULL,
  `register_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-02-28 19:22:40
