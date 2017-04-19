-- MySQL dump 10.13  Distrib 5.7.17, for Linux (x86_64)
--
-- Host: localhost    Database: hyf5
-- ------------------------------------------------------
-- Server version	5.7.17-0ubuntu0.16.04.2

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
  `running_module_id` int(8) NOT NULL,
  `user_id` int(8) NOT NULL,
  `dates` varchar(145) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id` (`user_id`),
  KEY `fk_group_id` (`group_id`),
  KEY `fk_running_module_id` (`running_module_id`),
  CONSTRAINT `fk_group_id` FOREIGN KEY (`group_id`) REFERENCES `students_history` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_running_module_id` FOREIGN KEY (`running_module_id`) REFERENCES `students_history` (`running_module_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `students_history` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_students`
--

LOCK TABLES `group_students` WRITE;
/*!40000 ALTER TABLE `group_students` DISABLE KEYS */;
/*!40000 ALTER TABLE `group_students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groups` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(50) DEFAULT NULL,
  `starting_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (43,'Class 5','2016-07-24 00:00:00'),(44,'Class 6','2016-09-25 00:00:00'),(45,'Class 7','2016-11-06 00:00:00'),(46,'Class 8','2017-01-29 00:00:00'),(47,'Class 9','2017-03-12 00:00:00');
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modules`
--

DROP TABLE IF EXISTS `modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `modules` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `module_name` varchar(50) NOT NULL DEFAULT '',
  `description` varchar(255) DEFAULT NULL,
  `added_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `default_duration` int(2) NOT NULL DEFAULT '3',
  `sort_order` int(4) DEFAULT NULL,
  `git_url` varchar(2000) DEFAULT NULL,
  `git_owner` varchar(50) DEFAULT NULL,
  `git_repo` varchar(50) DEFAULT NULL,
  `color` varchar(8) DEFAULT NULL,
  `optional` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modules`
--

LOCK TABLES `modules` WRITE;
/*!40000 ALTER TABLE `modules` DISABLE KEYS */;
INSERT INTO `modules` VALUES (1,'Angular JS','Angular JS module description','2017-02-28 18:25:16',3,4,'https://github.com/HackYourFuture/','HackYourFuture','angular','#375e97',0),(2,'HTML-CSS','HTML-CSS module description','2017-02-28 18:25:56',3,0,'https://github.com/HackYourFuture/','HackYourFuture','angular','#fb6542',0),(3,'JavaScript 1','JavaScript 1 module description','2017-02-28 18:26:27',3,1,'https://github.com/HackYourFuture/','HackYourFuture','JavaScript','#ffbb00',0),(4,'JavaScript 2','JavaScript 2 module description','2017-02-28 18:26:41',3,2,'https://github.com/HackYourFuture/','HackYourFuture','JavaScript2','#3f681c',0),(5,'JavaScript 3','JavaScript 3 module description','2017-02-28 18:26:49',3,3,'https://github.com/HackYourFuture/','HackYourFuture','JavaScript3','#eb8a44',0),(6,'Node.js','Node.js module description','2017-02-28 18:27:21',3,5,'https://github.com/HackYourFuture/','HackYourFuture','Node.js','#f9dc24',0),(7,'Databases','Databases module description','2017-02-28 18:27:50',3,6,'https://github.com/HackYourFuture/','HackYourFuture','databases','#4b7447',0),(8,'Project','Project module description','2017-02-28 18:28:09',6,7,'https://github.com/HackYourFuture/','HackYourFuture','Project','#8eba43',0),(9,'Holiday','Holiday period','2017-03-06 14:35:26',1,1000,NULL,NULL,NULL,'#c05805',1),(10,'Hackathon','Hackathon / fun day','2017-03-06 14:36:22',1,1000,NULL,NULL,NULL,'#db9501',1),(11,'Dummy','Dummy test module','2017-03-08 18:31:11',3,NULL,NULL,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `running_modules`
--

DROP TABLE IF EXISTS `running_modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `running_modules` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `module_id` int(8) NOT NULL,
  `group_id` int(8) NOT NULL,
  `duration` int(8) DEFAULT '3',
  `position` int(8) DEFAULT NULL,
  `teacher1_id` int(8) DEFAULT NULL,
  `teacher2_id` int(8) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_module` (`module_id`),
  KEY `fk_group_name` (`group_id`),
  KEY `fk_teacher1` (`teacher1_id`),
  KEY `fk_teacher2` (`teacher2_id`),
  CONSTRAINT `fk_group_name` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_module` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_teacher1` FOREIGN KEY (`teacher1_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_teacher2` FOREIGN KEY (`teacher2_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=414 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `running_modules`
--

LOCK TABLES `running_modules` WRITE;
/*!40000 ALTER TABLE `running_modules` DISABLE KEYS */;
INSERT INTO `running_modules` VALUES (106,'HTML-CSS module description',2,43,3,0,NULL,NULL),(107,'JavaScript 1 module description',3,43,3,1,NULL,NULL),(108,'JavaScript 2 module description',4,43,3,2,NULL,NULL),(109,'JavaScript 3 module description',5,43,3,3,NULL,NULL),(110,'Angular JS module description',1,43,3,4,NULL,NULL),(111,'Node.js module description',6,43,6,5,NULL,NULL),(112,'Databases module description',7,43,3,8,NULL,NULL),(113,'Project module description',8,43,6,9,NULL,NULL),(114,'HTML-CSS module description',2,44,3,0,NULL,NULL),(115,'JavaScript 1 module description',3,44,3,1,NULL,NULL),(116,'JavaScript 2 module description',4,44,3,2,NULL,NULL),(117,'JavaScript 3 module description',5,44,3,3,NULL,NULL),(118,'Angular JS module description',1,44,3,6,NULL,NULL),(119,'Node.js module description',6,44,3,7,NULL,NULL),(120,'Databases module description',7,44,3,8,NULL,NULL),(121,'Project module description',8,44,6,9,NULL,NULL),(122,'HTML-CSS module description',2,45,3,0,NULL,NULL),(123,'JavaScript 1 module description',3,45,3,1,NULL,NULL),(124,'JavaScript 2 module description',4,45,3,4,NULL,NULL),(125,'JavaScript 3 module description',5,45,3,5,NULL,NULL),(126,'Angular JS module description',1,45,3,6,NULL,NULL),(127,'Node.js module description',6,45,3,7,NULL,NULL),(128,'Databases module description',7,45,3,8,NULL,NULL),(129,'Project module description',8,45,6,9,NULL,NULL),(130,'HTML-CSS module description',2,46,3,0,NULL,NULL),(131,'JavaScript 1 module description',3,46,3,1,NULL,NULL),(132,'JavaScript 2 module description',4,46,3,2,NULL,NULL),(133,'JavaScript 3 module description',5,46,3,3,NULL,NULL),(134,'Angular JS module description',1,46,3,4,NULL,NULL),(135,'Node.js module description',6,46,3,5,NULL,NULL),(136,'Databases module description',7,46,3,6,NULL,NULL),(137,'Project module description',8,46,6,7,NULL,NULL),(138,'HTML-CSS module description',2,47,3,0,NULL,NULL),(139,'JavaScript 1 module description',3,47,3,1,NULL,NULL),(140,'JavaScript 2 module description',4,47,3,2,NULL,NULL),(141,'JavaScript 3 module description',5,47,3,3,NULL,NULL),(142,'Angular JS module description',1,47,3,4,NULL,NULL),(143,'Node.js module description',6,47,3,5,NULL,NULL),(144,'Databases module description',7,47,3,6,NULL,NULL),(145,'Project module description',8,47,6,7,NULL,NULL),(146,'Holiday',9,43,2,7,NULL,NULL),(147,'Holiday',9,44,2,5,NULL,NULL),(148,'Holiday',9,45,2,3,NULL,NULL),(149,'Hackathon',10,43,1,6,NULL,NULL),(150,'Hackathon',10,44,1,4,NULL,NULL),(151,'Hackathon',10,45,1,2,NULL,NULL);
/*!40000 ALTER TABLE `running_modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students_history`
--

DROP TABLE IF EXISTS `students_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `students_history` (
  `group_id` int(8) NOT NULL,
  `running_module_id` int(8) NOT NULL,
  `user_id` int(8) NOT NULL,
  `date` date NOT NULL,
  `attendance` tinyint(1) NOT NULL DEFAULT '0',
  `homework` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`,`group_id`,`date`,`running_module_id`),
  KEY `idx_running_module_id` (`running_module_id`),
  KEY `sh_fk_group_id` (`group_id`),
  CONSTRAINT `sh_fk_group_id` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sh_fk_running_module_id` FOREIGN KEY (`running_module_id`) REFERENCES `running_modules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sh_fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students_history`
--

LOCK TABLES `students_history` WRITE;
/*!40000 ALTER TABLE `students_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `students_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `username` varchar(145) NOT NULL DEFAULT '',
  `access_token` varchar(64) DEFAULT NULL,
  `role` varchar(32) DEFAULT NULL,
  `register_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `slack_username` varchar(32) DEFAULT NULL,
  `freecodecamp_username` varchar(32) DEFAULT NULL,
  `github_username` varchar(32) DEFAULT NULL,
  `email` varchar(32) DEFAULT NULL,
  `mobile` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (19,'hasanshahoud','91ce6977c4e69ddc983ec4d9943ef041fad9132b','teacher','2017-04-19 09:38:56',NULL,NULL,NULL,NULL,NULL),(20,'Yaser Shomaf',NULL,'student','2017-04-19 18:02:34','@yasersomaf','fcc07c99b24','','yasershomaf@gmail.com',NULL),(21,'Elie Sacali',NULL,'student','2017-04-19 18:02:34','@elie','eliesakali','','eliesacali@gmail.com',NULL),(22,'Essam Alsaloum',NULL,'student','2017-04-19 18:02:34','@mojlbhr','fcc25d6cb43','','es.alsaloum@gmail.com',NULL),(23,'George Mamar',NULL,'student','2017-04-19 18:02:34','@georgem','gmamar','','gmamar1@gmail.com',NULL),(24,'Ashraf Khaddam',NULL,'student','2017-04-19 18:02:34','@ashrafkh','ashrafkh','','ashrafkh1@gmail.com',NULL),(25,'Aiham Bitar',NULL,'student','2017-04-19 18:02:34','@abitar','','','aiham_bitar@hotmail.com',NULL),(26,'Hameed ah Alhowidi',NULL,'student','2017-04-19 18:02:34','@hameed','ahalhowidi','','ah.alhowidi@gmail.com',NULL),(27,'Nour Saffour',NULL,'student','2017-04-19 18:02:34','@nsaffour','fcc86037877','','nouralnajjar81@gmail.com',NULL),(28,'M.Thabet Qaterji',NULL,'student','2017-04-19 18:02:34','@thabet','mthabetq','','thabetqaterji91@gmail.com',NULL),(29,'Abdulrahman Hussni',NULL,'student','2017-04-19 18:02:34','@abuodh','fcc92252714','abuodh','abuodh@hotmail.com',NULL),(30,'Jalal Alnadeem',NULL,'student','2017-04-19 18:02:34','@jalal','jalal75','jalal75','jalal.alnadeem@gmail.com',NULL),(31,'Muhammad Alo',NULL,'student','2017-04-19 18:02:34','@muhammadalo','fcc63e27c82','','muhammadalo37@gmail.com',NULL),(32,'Khalid Hinawi',NULL,'student','2017-04-19 18:02:34','@khinaowi','khinaowi','khinaowi','khinaowi@hotmail.com',NULL),(33,'Aws Idris',NULL,'student','2017-04-19 18:02:34','@awsidris','awsidris','AwsIdris','awsidris@gmail.com',NULL),(34,'Ali Barakat',NULL,'student','2017-04-19 18:02:34','@alibarakat','ali-barakat','Ali-Barakat','barakat-ali@live.com',NULL),(35,'Mustafa Ezzi',NULL,'student','2017-04-19 18:02:34','@mostafa1996','fccdde22b17','mozi1996','mosrafaazy@gmail.com',NULL),(36,'Anas Mohamad Hlehel',NULL,'student','2017-04-19 18:02:34','@anas_alrz','mhdanasalrz','MhdAnasAlrz','mhd.anas.alrz@hotmail.com',NULL),(37,'Jad Kaddour',NULL,'student','2017-04-19 18:02:34','@jad','borazan-taja','borazan-taja','kaddour.jad@gmail.com',NULL),(38,'Amir Shakiba',NULL,'student','2017-04-19 18:02:34','@massoodbarsa','massoodbarsa','massoodbarsa','amir.shakiba1980@gmail.com',NULL),(39,'Uday Kakhi',NULL,'student','2017-04-19 18:02:34','@odaikakhi','odai-kakhi','Odai-kakhi','odaikakhi@gmail.com',NULL),(40,'Eyad Khamis',NULL,'student','2017-04-19 18:02:34','@ekhamis','','ekhamis','ekhamis@gmail.com',NULL),(41,'Malek Sheikh Al Ard',NULL,'student','2017-04-19 18:02:34','@m.sheikhalard','','msheikhalard','malek.sheikhalard@gmail.com',NULL),(42,'Nabil Hinnawi',NULL,'student','2017-04-19 18:02:34','@nabilhinnawi','','','nabilhinnawi@yahoo.com',NULL),(43,'Somur Ruteeb',NULL,'student','2017-04-19 18:02:34','@s.ruteeb','','ruteeb','s.ruteeb@gmail.com',NULL),(44,'Saad Ronida',NULL,'student','2017-04-19 18:02:34','@s-ali21','','saadali21','saadronida@gmail.com',NULL),(45,'Suhaib Bulbul',NULL,'student','2017-04-19 18:02:34','@suhaib','','suhaib81','suhaib81@gmail.com',NULL),(46,'Adbul Raman',NULL,'student','2017-04-19 18:02:34','@abdulrahmandbes','','AbdulRahmanDbes','abdulrahmandbes@gmail.com',NULL),(47,'Almoatasem Bllah Alahmad Albelikh',NULL,'student','2017-04-19 18:02:34','@al.mo0tasem','','m0o0tasem','mu.albalikh@hotmail.com',NULL),(48,'Moaaz Labsh',NULL,'student','2017-04-19 18:02:34','@m.labash','fccf44cbd5b','MLabash','mo3ath_lbsh@hotmail.com',NULL),(49,'Shadi Alhakimi',NULL,'student','2017-04-19 18:02:34','@shadialhakimi','','shadialhakimi','shadi_15_5@hotmail.com',NULL),(50,'Mohanad Dabool',NULL,'student','2017-04-19 18:02:34','@mohanad.dabool','','','mohanad.dabool1@gmail.com',NULL),(51,'Yousif Alneamy',NULL,'student','2017-04-19 18:02:34','@yousif','','yousifAlneamy','yousif.aladdin@gmail.com',NULL),(52,'Amjad Muhammad ',NULL,'student','2017-04-19 18:02:34','@amjad83m','amjad83m','amjad83m','amjad83m@hotmail.com',NULL),(53,'Mohannad Alobaid',NULL,'student','2017-04-19 18:02:34','@engmohannad','fcc9191bd06','engmohannad','eng_mohalobaid@yahoo.com',NULL),(54,'Anas Alabtah',NULL,'student','2017-04-19 18:02:34','@anas.alabtah','eix007','eix007','anas.alabtah@gmail.com',NULL),(55,'Ehab M Omaro',NULL,'student','2017-04-19 18:02:34','@omaro86','fcc9617682f','','omaro-86@hotmail.com',NULL),(56,'Malek Kanaan',NULL,'student','2017-04-19 18:02:34','@malekkn','malekkn','malekkn','malek.kanaan@outlook.com',NULL),(57,'2017-07-24',NULL,'student','2017-04-19 18:02:34','@rashid_abdo','','rashidabdo','rasheed.abdo@hotmail.com',NULL),(58,'ML Jammeh',NULL,'student','2017-04-19 18:02:34','@mljammeh','','','laminkanilai@gmail.com',NULL),(59,'Jack Sacali ',NULL,'student','2017-04-19 18:02:34','@aboroma','aboroma','aboRoma','jacksacali@gmail.com',NULL),(60,'Saikat Barua',NULL,'student','2017-04-19 18:02:34','@saikat852','','','derozio.bd@gmail.com',NULL),(61,'Hasan Shahoud',NULL,'student','2017-04-19 18:02:34','@hasan_shahoud','hasanshahoud','hasanshahoud','hasansh343@gmail.com',NULL),(62,'Fadi',NULL,'student','2017-04-19 18:02:34','@fadi91','fade0991','fade0991','fedo.dedo91@yahoo.com',NULL),(63,'Majdi ali',NULL,'student','2017-04-19 18:02:34','@majdiali76','','majdiali','majdi107@gmail.com',NULL),(64,'Bahaa Eldereie',NULL,'student','2017-04-19 18:02:34','@beto0o','','beto0o0o','bahaa.aldeiri@gmail.com',NULL),(65,'Mohamad alkhen',NULL,'student','2017-04-19 18:02:34','@md.alkhen','','','m.jabri86@yahoo.com',NULL),(66,'Mahmud Jabri',NULL,'student','2017-04-19 18:02:34','@mahmud','','','m.jabri86@yahoo.com',NULL);
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

-- Dump completed on 2017-04-19 18:07:40