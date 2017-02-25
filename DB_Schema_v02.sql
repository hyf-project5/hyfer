-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: hyf5
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
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(145) NOT NULL,
  `email` varchar(145) NOT NULL,
  `password` binary(16) NOT NULL,
  `register_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `avatar` varchar(2083) DEFAULT NULL,
  `bio` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'Zarmina Abbas','zarabbas7@gmail.com','3031323334353637','2017-02-22 15:43:11',NULL,NULL),(2,'Mohamad Alkhen','md.alkhen@gmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 15:49:28',NULL,NULL),(3,'Mahmud Jabri','m.jabri86@yahoo.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:33:16',NULL,NULL),(4,'Bahaa Eldereie','bahaa.aldeiri@gmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:33:54',NULL,NULL),(5,'Majdi Ali','majdi107@gmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:34:05',NULL,NULL),(6,'Fadi Debo','fedo.dedo91@yahoo.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:34:11',NULL,NULL),(7,'Hasan Shahoud','hasansh343@gmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:34:18',NULL,NULL),(8,'Saikat Barua','derozio.bd@gmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:34:26',NULL,NULL),(9,'Jack Sacali','jacksacali@gmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:34:31',NULL,NULL),(10,'ML Jammeh','laminkanilai@gmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:34:38',NULL,NULL),(11,'Malek Kanaan','malek.kanaan@outlook.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:35:30',NULL,NULL),(12,'Rashid Abdo','rasheed.abdo@hotmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:35:30',NULL,NULL),(13,'Abdulrahman Hussni','abuodh@hotmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:37:30',NULL,NULL),(14,'Jalal Alnadeem','jalal.alnadeem@gmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:37:30',NULL,NULL),(15,'Muhammad Alo','muhammadalo37@gmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:37:30',NULL,NULL),(16,'Khalid Hinawi','khinaowi@hotmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:37:30',NULL,NULL),(17,'Aws Idris','awsidris@gmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:37:30',NULL,NULL),(18,'Ali Barakat','barakat-ali@live.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:37:30',NULL,NULL),(19,'Mostafa Azy','mosrafaazy@gmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:37:30',NULL,NULL),(20,'Anas Alrz','mhd.anas.alrz@hotmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:37:30',NULL,NULL),(21,'Jad Kaddour','kaddour.jad@gmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:37:30',NULL,NULL),(22,'Amir Shakiba','amir.shakiba1980@gmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:37:30',NULL,NULL),(23,'Uday Kakhi','odaikakhi@gmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:37:30',NULL,NULL),(24,'Eyad Khamis','ekhamis@gmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:37:30',NULL,NULL),(25,'Malek Sheikh Al Ard','malek.sheikhalard@gmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:37:30',NULL,NULL),(26,'Nabil Hinnawi','nabilhinnawi@yahoo.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:37:30',NULL,NULL),(27,'Somur Ruteeb','s.ruteeb@gmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:37:30',NULL,NULL),(28,'Saad Ronida','saadronida@gmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:37:30',NULL,NULL),(29,'Suhaib Bulbul','suhaib81@gmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:37:30',NULL,NULL),(30,'Adbulrahman Dbes','abdulrahmandbes@gmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:37:30',NULL,NULL),(31,'Shadi Alhakimi','shadi_15_5@hotmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:37:30',NULL,NULL),(32,'Mohanad Dabool','mohanad.dabool1@gmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:37:30',NULL,NULL),(33,'Amjad Muhammad','amjad83m@hotmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:37:30',NULL,NULL),(34,'Almoatasem Bllah Alahmad Albelikh','mu.albalikh@hotmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:37:30',NULL,NULL),(35,'Yousif Alneamy','yousif.aladdin@gmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:37:30',NULL,NULL),(36,'Mohannad Alobaid','eng_mohalobaid@yahoo.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:37:30',NULL,NULL),(37,'Anas Alabtah','anas.alabtah@gmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:37:30',NULL,NULL),(38,'Moaaz Labsh','mo3ath_lbsh@hotmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:37:30',NULL,NULL),(39,'mahmoud Boukary','aboakar888@yahoo.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:37:30',NULL,NULL),(40,'Ehab M Omaro','omaro-86@hotmail.com','1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','2017-02-22 16:37:30',NULL,NULL);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `current_status`
--

DROP TABLE IF EXISTS `current_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `current_status` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `current_status` varchar(145) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `current_status`
--

LOCK TABLES `current_status` WRITE;
/*!40000 ALTER TABLE `current_status` DISABLE KEYS */;
INSERT INTO `current_status` VALUES (1,'Active'),(2,'Dropped out'),(3,'Graduated'),(4,'Hired before graduation');
/*!40000 ALTER TABLE `current_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modules`
--

DROP TABLE IF EXISTS `modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `modules` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) DEFAULT NULL,
  `module_name` varchar(145) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `added_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `module_img` varchar(2083) DEFAULT NULL,
  `git_url` varchar(2083) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `running_module_students`
--

DROP TABLE IF EXISTS `running_module_students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `running_module_students` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `running_module_id` int(8) NOT NULL,
  `student_id` int(8) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_running_module_student` (`running_module_id`),
  KEY `fk_student` (`student_id`),
  CONSTRAINT `fk_running_module_student` FOREIGN KEY (`running_module_id`) REFERENCES `running_modules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `running_module_students`
--

LOCK TABLES `running_module_students` WRITE;
/*!40000 ALTER TABLE `running_module_students` DISABLE KEYS */;
/*!40000 ALTER TABLE `running_module_students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `running_module_teachers`
--

DROP TABLE IF EXISTS `running_module_teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `running_module_teachers` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `running_module_id` int(8) NOT NULL,
  `teacher_id` int(8) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_running_module_teacher` (`running_module_id`),
  KEY `fk_teacher` (`teacher_id`),
  CONSTRAINT `fk_running_module_teacher` FOREIGN KEY (`running_module_id`) REFERENCES `running_modules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `running_module_teachers`
--

LOCK TABLES `running_module_teachers` WRITE;
/*!40000 ALTER TABLE `running_module_teachers` DISABLE KEYS */;
/*!40000 ALTER TABLE `running_module_teachers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `running_modules`
--

DROP TABLE IF EXISTS `running_modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `running_modules` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) DEFAULT NULL,
  `starting_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `scheduled_end` datetime NOT NULL,
  `description` varchar(145) DEFAULT NULL,
  `module_id` int(8) NOT NULL,
  `finished` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_module` (`module_id`),
  CONSTRAINT `fk_module` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `running_modules`
--

LOCK TABLES `running_modules` WRITE;
/*!40000 ALTER TABLE `running_modules` DISABLE KEYS */;
/*!40000 ALTER TABLE `running_modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `students` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) DEFAULT NULL,
  `account_id` int(8) NOT NULL,
  `starting_group` varchar(145) NOT NULL,
  `current_status_id` int(8) NOT NULL,
  `hired` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_account_student` (`account_id`),
  KEY `fk_current_status` (`current_status_id`),
  CONSTRAINT `fk_account_student` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_current_status` FOREIGN KEY (`current_status_id`) REFERENCES `current_status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'e1e1f3eb-f915-11e6-9946-0a0027000012',1,'Class #5',2,0),(2,'5642a85b-f916-11e6-9946-0a0027000012',2,'Class5',2,0),(3,'5faf7ef3-f916-11e6-9946-0a0027000012',6,'Class5',2,0),(4,'6779bbac-f916-11e6-9946-0a0027000012',8,'Class5',2,0),(5,'6936bd39-f916-11e6-9946-0a0027000012',10,'Class5',2,0),(6,'6d7b30d2-f916-11e6-9946-0a0027000012',40,'Class5',2,0),(9,'d05f9e32-f916-11e6-9946-0a0027000012',3,'Class5',4,1),(10,'e2e212a0-f916-11e6-9946-0a0027000012',12,'Class5',4,1),(11,'f8fbc78b-f916-11e6-9946-0a0027000012',4,'Class5',1,0),(12,'01ee3e72-f917-11e6-9946-0a0027000012',5,'Class5',1,0),(13,'031eaa75-f917-11e6-9946-0a0027000012',7,'Class5',1,0),(14,'04441083-f917-11e6-9946-0a0027000012',9,'Class5',1,0),(15,'2e4a632e-f917-11e6-9946-0a0027000012',11,'Class6',1,0),(16,'4d3e4657-f917-11e6-9946-0a0027000012',38,'Class6',1,0),(17,'5366b898-f917-11e6-9946-0a0027000012',37,'Class6',1,0),(18,'593e13af-f917-11e6-9946-0a0027000012',35,'Class6',1,0),(19,'62c4e279-f917-11e6-9946-0a0027000012',33,'Class6',1,0),(20,'6960b6a9-f917-11e6-9946-0a0027000012',32,'Class6',1,0),(21,'6fc858a9-f917-11e6-9946-0a0027000012',31,'Class6',1,0),(22,'81e6e161-f917-11e6-9946-0a0027000012',39,'Class6',2,0),(23,'89b313d8-f917-11e6-9946-0a0027000012',36,'Class6',2,0),(24,'aed45309-f917-11e6-9946-0a0027000012',26,'Class7',4,1),(25,'c19776ff-f917-11e6-9946-0a0027000012',30,'Class7',1,0),(26,'c7ae3ccf-f917-11e6-9946-0a0027000012',29,'Class7',1,0),(27,'cf040ead-f917-11e6-9946-0a0027000012',28,'Class7',1,0),(28,'d52a12d0-f917-11e6-9946-0a0027000012',27,'Class7',1,0),(29,'dcccc210-f917-11e6-9946-0a0027000012',25,'Class7',1,0),(30,'de51b2b8-f917-11e6-9946-0a0027000012',24,'Class7',1,0),(31,'ecc3ae99-f917-11e6-9946-0a0027000012',23,'Class8',1,0),(32,'f30888ab-f917-11e6-9946-0a0027000012',22,'Class8',1,0),(33,'f3d28a30-f917-11e6-9946-0a0027000012',21,'Class8',1,0),(34,'f4a82099-f917-11e6-9946-0a0027000012',20,'Class8',1,0),(35,'ff003d6c-f917-11e6-9946-0a0027000012',19,'Class8',1,0),(36,'fff5442f-f917-11e6-9946-0a0027000012',18,'Class8',1,0),(37,'00f4a289-f918-11e6-9946-0a0027000012',17,'Class8',1,0),(38,'0e02d8dd-f918-11e6-9946-0a0027000012',16,'Class8',1,0),(39,'0f32cac8-f918-11e6-9946-0a0027000012',15,'Class8',1,0),(40,'1017d92a-f918-11e6-9946-0a0027000012',14,'Class8',1,0),(41,'1102833a-f918-11e6-9946-0a0027000012',13,'Class8',1,0),(42,'6e402be2-f918-11e6-9946-0a0027000012',34,'Class6',4,1);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teachers`
--

DROP TABLE IF EXISTS `teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teachers` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) DEFAULT NULL,
  `account_id` int(8) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_account_teacher` (`account_id`),
  CONSTRAINT `fk_account_teacher` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teachers`
--

LOCK TABLES `teachers` WRITE;
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-02-23 19:49:36
