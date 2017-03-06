-- MySQL dump 10.13  Distrib 5.7.16, for osx10.11 (x86_64)
--
-- Host: localhost    Database: hyfer
-- ------------------------------------------------------
-- Server version	5.7.16

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
-- Dumping data for table `group_students`
--

LOCK TABLES `group_students` WRITE;
/*!40000 ALTER TABLE `group_students` DISABLE KEYS */;
/*!40000 ALTER TABLE `group_students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (24,'Class 5','2016-07-17 00:00:00'),(25,'Class 5','2016-07-17 00:00:00'),(26,'Class 5','2016-07-17 00:00:00'),(27,'Class 5','2016-07-17 00:00:00'),(28,'Class 5','2016-07-17 00:00:00'),(29,'Class 5','2016-07-17 00:00:00'),(30,'Class 5','2016-07-17 00:00:00'),(31,'Class 5','2016-07-17 00:00:00'),(32,'Class 6','2016-09-24 00:00:00'),(33,'Class 7','2016-11-05 00:00:00'),(34,'Class 8','2017-01-21 00:00:00');
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `modules`
--

LOCK TABLES `modules` WRITE;
/*!40000 ALTER TABLE `modules` DISABLE KEYS */;
INSERT INTO `modules` VALUES (1,'Angular JS','Angular JS module description','2017-02-28 18:25:16',3,5000,'https://github.com/HackYourFuture/','HackYourFuture','angular'),(2,'HTML-CSS','HTML-CSS module description','2017-02-28 18:25:56',3,1000,'https://github.com/HackYourFuture/','HackYourFuture','HTML-CSS'),(3,'JavaScript 1','JavaScript 1 module description','2017-02-28 18:26:27',3,2000,'https://github.com/HackYourFuture/','HackYourFuture','JavaScript'),(4,'JavaScript 2','JavaScript 2 module description','2017-02-28 18:26:41',3,3000,'https://github.com/HackYourFuture/','HackYourFuture','JavaScript2'),(5,'JavaScript 3','JavaScript 3 module description','2017-02-28 18:26:49',3,4000,'https://github.com/HackYourFuture/','HackYourFuture','JavaScript3'),(6,'Node.js','Node.js module description','2017-02-28 18:27:21',3,6000,'https://github.com/HackYourFuture/','HackYourFuture','Node.js'),(7,'Databases','Databases module description','2017-02-28 18:27:50',3,7000,'https://github.com/HackYourFuture/','HackYourFuture','databases'),(8,'Project','Project module description','2017-02-28 18:28:09',3,8000,'https://github.com/HackYourFuture/','HackYourFuture','Project');
/*!40000 ALTER TABLE `modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `running_modules`
--

LOCK TABLES `running_modules` WRITE;
/*!40000 ALTER TABLE `running_modules` DISABLE KEYS */;
INSERT INTO `running_modules` VALUES (26,'HTML-CSS module description',2,31,3,0,NULL,NULL),(27,'JavaScript 1 module description',3,31,3,1,NULL,NULL),(28,'JavaScript 2 module description',4,31,3,2,NULL,NULL),(29,'JavaScript 3 module description',5,31,3,3,NULL,NULL),(30,'Angular JS module description',1,31,3,4,NULL,NULL),(31,'Node.js module description',6,31,3,5,NULL,NULL),(32,'Databases module description',7,31,3,6,NULL,NULL),(33,'Project module description',8,31,3,7,NULL,NULL),(34,'HTML-CSS module description',2,32,3,0,NULL,NULL),(35,'JavaScript 1 module description',3,32,3,1,NULL,NULL),(36,'JavaScript 2 module description',4,32,3,2,NULL,NULL),(37,'JavaScript 3 module description',5,32,3,3,NULL,NULL),(38,'Angular JS module description',1,32,3,4,NULL,NULL),(39,'Node.js module description',6,32,3,5,NULL,NULL),(40,'Databases module description',7,32,3,6,NULL,NULL),(41,'Project module description',8,32,3,7,NULL,NULL),(42,'HTML-CSS module description',2,33,3,0,NULL,NULL),(43,'JavaScript 1 module description',3,33,3,1,NULL,NULL),(44,'JavaScript 2 module description',4,33,3,2,NULL,NULL),(45,'JavaScript 3 module description',5,33,3,3,NULL,NULL),(46,'Angular JS module description',1,33,3,4,NULL,NULL),(47,'Node.js module description',6,33,3,5,NULL,NULL),(48,'Databases module description',7,33,3,6,NULL,NULL),(49,'Project module description',8,33,3,7,NULL,NULL),(50,'HTML-CSS module description',2,34,3,0,NULL,NULL),(51,'JavaScript 1 module description',3,34,3,1,NULL,NULL),(52,'JavaScript 2 module description',4,34,3,2,NULL,NULL),(53,'JavaScript 3 module description',5,34,3,3,NULL,NULL),(54,'Angular JS module description',1,34,3,4,NULL,NULL),(55,'Node.js module description',6,34,3,5,NULL,NULL),(56,'Databases module description',7,34,3,6,NULL,NULL),(57,'Project module description',8,34,3,7,NULL,NULL);
/*!40000 ALTER TABLE `running_modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Jack Sacali',NULL,NULL,'2017-02-28 17:51:17'),(2,'Hasan Shahoud',NULL,NULL,'2017-02-28 17:51:27'),(3,'Majdi Ali',NULL,NULL,'2017-02-28 17:51:31'),(4,'Bahaa Eldirie',NULL,NULL,'2017-02-28 17:51:43'),(5,'Malek Kanaan',NULL,NULL,'2017-02-28 18:02:11'),(6,'Moaaz Labsh',NULL,NULL,'2017-02-28 18:02:24'),(7,'Anas Alabtah',NULL,NULL,'2017-02-28 18:02:31'),(8,'Yousif Alneamy',NULL,NULL,'2017-02-28 18:02:37'),(9,'Amjad Muhammad',NULL,NULL,'2017-02-28 18:02:46'),(10,'Mohanad Dabool',NULL,NULL,'2017-02-28 18:02:53'),(11,'Shadi Alhakimi',NULL,NULL,'2017-02-28 18:02:58'),(12,'Jim Cramer',NULL,NULL,'2017-02-28 18:13:44'),(13,'Jim Cramer',NULL,'teacher','2017-02-28 18:16:38'),(14,'Michael Trouw',NULL,'teacher','2017-02-28 18:16:56'),(15,'Unmesh Joshi',NULL,'teacher','2017-02-28 18:17:30'),(16,'Pablo Celentano',NULL,'teacher','2017-02-28 18:17:48');
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

-- Dump completed on 2017-03-06 13:27:19
