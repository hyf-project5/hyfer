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
-- Dumping data for table `group_students`
--

LOCK TABLES `group_students` WRITE;
/*!40000 ALTER TABLE `group_students` DISABLE KEYS */;
INSERT INTO `group_students` VALUES (1,1,1,'Active',0),(3,1,2,'Active',0),(4,1,3,'Active',0),(5,1,4,'Active',0),(7,1,5,'Active',0),(8,2,6,'Active',0),(9,2,7,'Active',0),(10,2,8,'Active',0),(11,2,9,'Active',0),(12,2,10,'Active',0),(13,2,11,'Active',0);
/*!40000 ALTER TABLE `group_students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (1,'Class #5','2017-02-28 17:57:17'),(2,'Class #6','2017-02-28 17:57:22'),(3,'Class #7','2017-02-28 17:57:24'),(4,'Class #8','2017-02-28 17:57:26'),(5,'Class #9','2017-02-28 18:43:44');
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `modules`
--

LOCK TABLES `modules` WRITE;
/*!40000 ALTER TABLE `modules` DISABLE KEYS */;
INSERT INTO `modules` VALUES (1,'Angular JS','Some description','2017-02-28 18:25:16','http://lorempixel.com/600/600/technics/',3,5000,'https://github.com/HackYourFuture/','HackYourFuture','angular'),(2,'HTML-CSS','Some description','2017-02-28 18:25:56','http://lorempixel.com/600/600/technics/',3,1000,'https://github.com/HackYourFuture/','HackYourFuture','HTML-CSS'),(3,'JavaScript 1','Some description','2017-02-28 18:26:27','http://lorempixel.com/600/600/technics/',3,2000,'https://github.com/HackYourFuture/','HackYourFuture','JavaScript'),(4,'JavaScript 2','Some description','2017-02-28 18:26:41','http://lorempixel.com/600/600/technics/',3,3000,'https://github.com/HackYourFuture/','HackYourFuture','JavaScript2'),(5,'JavaScript 3','Some description','2017-02-28 18:26:49','http://lorempixel.com/600/600/technics/',3,4000,'https://github.com/HackYourFuture/','HackYourFuture','JavaScript3'),(6,'Node.js','Some description','2017-02-28 18:27:21','http://lorempixel.com/600/600/technics/',3,6000,'https://github.com/HackYourFuture/','HackYourFuture','Node.js'),(7,'Databases','Some description','2017-02-28 18:27:50','http://lorempixel.com/600/600/technics/',3,7000,'https://github.com/HackYourFuture/','HackYourFuture','databases'),(8,'Project','Some description','2017-02-28 18:28:09','http://lorempixel.com/600/600/technics/',3,8000,'https://github.com/HackYourFuture/','HackYourFuture','Project');
/*!40000 ALTER TABLE `modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `running_module_teachers`
--

LOCK TABLES `running_module_teachers` WRITE;
/*!40000 ALTER TABLE `running_module_teachers` DISABLE KEYS */;
INSERT INTO `running_module_teachers` VALUES (1,1,13),(2,2,14),(3,3,15),(4,4,16),(7,6,13),(8,7,14),(9,8,15),(10,9,16),(12,1,14),(13,1,15),(14,1,16);
/*!40000 ALTER TABLE `running_module_teachers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `running_modules`
--

LOCK TABLES `running_modules` WRITE;
/*!40000 ALTER TABLE `running_modules` DISABLE KEYS */;
INSERT INTO `running_modules` VALUES (1,'2017-02-28 18:35:54','2017-03-12 12:00:00','Some description',8,1,0),(2,'2017-02-28 18:36:36','2017-03-12 12:00:00','Some description',7,2,0),(3,'2017-02-28 18:36:40','2017-03-12 12:00:00','Some description',6,3,0),(4,'2017-02-28 18:36:47','2017-03-12 12:00:00','Some description',5,4,0),(6,'2017-03-12 12:00:00','2017-04-02 11:59:59','Some description',8,2,0),(7,'2017-03-12 12:00:00','2017-04-02 11:59:59','Some description',6,3,0),(8,'2017-03-12 12:00:00','2017-04-02 11:59:59','Some description',4,4,0),(9,'2017-03-12 12:00:00','2017-04-02 11:59:59','Some description',2,5,0);
/*!40000 ALTER TABLE `running_modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Jack Sacali',NULL,NULL,NULL,NULL,NULL,'2017-02-28 17:51:17'),(2,'Hasan Shahoud',NULL,NULL,NULL,NULL,NULL,'2017-02-28 17:51:27'),(3,'Majdi Ali',NULL,NULL,NULL,NULL,NULL,'2017-02-28 17:51:31'),(4,'Bahaa Eldirie',NULL,NULL,NULL,NULL,NULL,'2017-02-28 17:51:43'),(5,'Malek Kanaan',NULL,NULL,NULL,NULL,NULL,'2017-02-28 18:02:11'),(6,'Moaaz Labsh',NULL,NULL,NULL,NULL,NULL,'2017-02-28 18:02:24'),(7,'Anas Alabtah',NULL,NULL,NULL,NULL,NULL,'2017-02-28 18:02:31'),(8,'Yousif Alneamy',NULL,NULL,NULL,NULL,NULL,'2017-02-28 18:02:37'),(9,'Amjad Muhammad',NULL,NULL,NULL,NULL,NULL,'2017-02-28 18:02:46'),(10,'Mohanad Dabool',NULL,NULL,NULL,NULL,NULL,'2017-02-28 18:02:53'),(11,'Shadi Alhakimi',NULL,NULL,NULL,NULL,NULL,'2017-02-28 18:02:58'),(12,'Jim Cramer',NULL,NULL,NULL,NULL,NULL,'2017-02-28 18:13:44'),(13,'Jim Cramer',NULL,NULL,NULL,NULL,'teacher','2017-02-28 18:16:38'),(14,'Michael Trouw',NULL,NULL,NULL,NULL,'teacher','2017-02-28 18:16:56'),(15,'Unmesh Joshi',NULL,NULL,NULL,NULL,'teacher','2017-02-28 18:17:30'),(16,'Pablo Celentano',NULL,NULL,NULL,NULL,'teacher','2017-02-28 18:17:48');
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

-- Dump completed on 2017-02-28 19:29:24
