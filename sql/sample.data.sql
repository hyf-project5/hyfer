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
INSERT INTO `groups` VALUES (43,'Class 5','2016-07-24 00:00:00'),(44,'Class 6','2016-09-25 00:00:00'),(45,'Class 7','2016-11-06 00:00:00'),(46,'Class 8','2017-01-29 00:00:00'),(47,'Class 9','2017-03-12 00:00:00');
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `modules`
--

LOCK TABLES `modules` WRITE;
/*!40000 ALTER TABLE `modules` DISABLE KEYS */;
INSERT INTO `modules` VALUES (1,'Angular JS','Angular JS module description','2017-02-28 18:25:16',3,5000,'https://github.com/HackYourFuture/','HackYourFuture','angular'),(2,'HTML-CSS','HTML-CSS module description','2017-02-28 18:25:56',3,1000,'https://github.com/HackYourFuture/','HackYourFuture','angular'),(3,'JavaScript 1','JavaScript 1 module description','2017-02-28 18:26:27',3,2000,'https://github.com/HackYourFuture/','HackYourFuture','JavaScript'),(4,'JavaScript 2','JavaScript 2 module description','2017-02-28 18:26:41',3,3000,'https://github.com/HackYourFuture/','HackYourFuture','JavaScript2'),(5,'JavaScript 3','JavaScript 3 module description','2017-02-28 18:26:49',3,4000,'https://github.com/HackYourFuture/','HackYourFuture','JavaScript3'),(6,'Node.js','Node.js module description','2017-02-28 18:27:21',3,6000,'https://github.com/HackYourFuture/','HackYourFuture','Node.js'),(7,'Databases','Databases module description','2017-02-28 18:27:50',3,7000,'https://github.com/HackYourFuture/','HackYourFuture','databases'),(8,'Project','Project module description','2017-02-28 18:28:09',6,8000,'https://github.com/HackYourFuture/','HackYourFuture','Project'),(9,'Holiday','Holiday period','2017-03-06 14:35:26',1,NULL,NULL,NULL,NULL),(10,'Hackaton','Hackaton / fun day','2017-03-06 14:36:22',1,NULL,NULL,NULL,NULL),(11,'Dummy','Dummy test module','2017-03-08 18:31:11',3,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `running_modules`
--

LOCK TABLES `running_modules` WRITE;
/*!40000 ALTER TABLE `running_modules` DISABLE KEYS */;
INSERT INTO `running_modules` VALUES (106,'HTML-CSS module description',2,43,3,0,NULL,NULL),(107,'JavaScript 1 module description',3,43,3,1,NULL,NULL),(108,'JavaScript 2 module description',4,43,3,2,NULL,NULL),(109,'JavaScript 3 module description',5,43,3,3,NULL,NULL),(110,'Angular JS module description',1,43,3,4,NULL,NULL),(111,'Node.js module description',6,43,6,5,NULL,NULL),(112,'Databases module description',7,43,3,8,NULL,NULL),(113,'Project module description',8,43,6,9,NULL,NULL),(114,'HTML-CSS module description',2,44,3,0,NULL,NULL),(115,'JavaScript 1 module description',3,44,3,1,NULL,NULL),(116,'JavaScript 2 module description',4,44,3,2,NULL,NULL),(117,'JavaScript 3 module description',5,44,3,3,NULL,NULL),(118,'Angular JS module description',1,44,3,6,NULL,NULL),(119,'Node.js module description',6,44,3,7,NULL,NULL),(120,'Databases module description',7,44,3,8,NULL,NULL),(121,'Project module description',8,44,6,9,NULL,NULL),(122,'HTML-CSS module description',2,45,3,0,NULL,NULL),(123,'JavaScript 1 module description',3,45,3,1,NULL,NULL),(124,'JavaScript 2 module description',4,45,3,4,NULL,NULL),(125,'JavaScript 3 module description',5,45,3,5,NULL,NULL),(126,'Angular JS module description',1,45,3,6,NULL,NULL),(127,'Node.js module description',6,45,3,7,NULL,NULL),(128,'Databases module description',7,45,3,8,NULL,NULL),(129,'Project module description',8,45,6,9,NULL,NULL),(130,'HTML-CSS module description',2,46,3,0,NULL,NULL),(131,'JavaScript 1 module description',3,46,3,1,NULL,NULL),(132,'JavaScript 2 module description',4,46,3,2,NULL,NULL),(133,'JavaScript 3 module description',5,46,3,3,NULL,NULL),(134,'Angular JS module description',1,46,3,4,NULL,NULL),(135,'Node.js module description',6,46,3,5,NULL,NULL),(136,'Databases module description',7,46,3,6,NULL,NULL),(137,'Project module description',8,46,6,7,NULL,NULL),(138,'HTML-CSS module description',2,47,3,0,NULL,NULL),(139,'JavaScript 1 module description',3,47,3,1,NULL,NULL),(140,'JavaScript 2 module description',4,47,3,2,NULL,NULL),(141,'JavaScript 3 module description',5,47,3,3,NULL,NULL),(142,'Angular JS module description',1,47,3,4,NULL,NULL),(143,'Node.js module description',6,47,3,5,NULL,NULL),(144,'Databases module description',7,47,3,6,NULL,NULL),(145,'Project module description',8,47,6,7,NULL,NULL),(146,'Holiday',9,43,2,7,NULL,NULL),(147,'Holiday',9,44,2,5,NULL,NULL),(148,'Holiday',9,45,2,3,NULL,NULL),(149,'Hackathon',10,43,1,6,NULL,NULL),(150,'Hackathon',10,44,1,4,NULL,NULL),(151,'Hackathon',10,45,1,2,NULL,NULL);
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

-- Dump completed on 2017-03-09  0:25:10
