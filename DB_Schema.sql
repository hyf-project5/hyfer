-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: dbhyf
-- ------------------------------------------------------
-- Server version	5.7.16-log

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
-- Temporary view structure for view `lessonstudnames`
--

DROP TABLE IF EXISTS `lessonstudnames`;
/*!50001 DROP VIEW IF EXISTS `lessonstudnames`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `lessonstudnames` AS SELECT 
 1 AS `lessonId`,
 1 AS `StudentName`,
 1 AS `lessonAttended`,
 1 AS `lessonAssignment`,
 1 AS `lessonFeedback`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `tableannouncements`
--

DROP TABLE IF EXISTS `tableannouncements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tableannouncements` (
  `announcementId` int(11) NOT NULL AUTO_INCREMENT,
  `announcementDate` date DEFAULT NULL,
  `announcementTitle` varchar(100) DEFAULT NULL,
  `announcementDesc` text,
  PRIMARY KEY (`announcementId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tableannouncements`
--

LOCK TABLES `tableannouncements` WRITE;
/*!40000 ALTER TABLE `tableannouncements` DISABLE KEYS */;
INSERT INTO `tableannouncements` VALUES (1,'2016-12-11','Happy Birthday HYF','We celebrate the first year of HYF in a dinner party in Amsterdam.'),(2,'2016-12-18','New Location','We are having our training in Optimizely on Dec 18, 2016.');
/*!40000 ALTER TABLE `tableannouncements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tableclasses`
--

DROP TABLE IF EXISTS `tableclasses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tableclasses` (
  `classId` smallint(6) NOT NULL AUTO_INCREMENT,
  `className` varchar(30) NOT NULL,
  `classStartDate` date DEFAULT NULL,
  `classEndDate` date DEFAULT NULL,
  PRIMARY KEY (`classId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tableclasses`
--

LOCK TABLES `tableclasses` WRITE;
/*!40000 ALTER TABLE `tableclasses` DISABLE KEYS */;
INSERT INTO `tableclasses` VALUES (1,'HYF',NULL,NULL),(3,'Class 2',NULL,NULL),(4,'Class 4',NULL,NULL),(5,'Class 5',NULL,NULL);
/*!40000 ALTER TABLE `tableclasses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tablelessondetails`
--

DROP TABLE IF EXISTS `tablelessondetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tablelessondetails` (
  `lessonDetailsId` int(11) NOT NULL AUTO_INCREMENT,
  `lessonId` int(11) DEFAULT NULL,
  `lessonStudentId` int(11) DEFAULT NULL,
  `lessonAttended` tinyint(1) DEFAULT NULL,
  `lessonAssignment` varchar(100) DEFAULT NULL,
  `lessonFeedback` text,
  PRIMARY KEY (`lessonDetailsId`),
  KEY `lessonId` (`lessonId`,`lessonStudentId`),
  KEY `lessonStudentId` (`lessonStudentId`),
  CONSTRAINT `tablelessondetails_ibfk_1` FOREIGN KEY (`lessonId`) REFERENCES `tablelessons` (`lessonId`),
  CONSTRAINT `tablelessondetails_ibfk_2` FOREIGN KEY (`lessonStudentId`) REFERENCES `tableusers` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tablelessondetails`
--

LOCK TABLES `tablelessondetails` WRITE;
/*!40000 ALTER TABLE `tablelessondetails` DISABLE KEYS */;
INSERT INTO `tablelessondetails` VALUES (3,5,8,NULL,NULL,NULL),(4,5,9,NULL,NULL,NULL),(5,5,10,NULL,NULL,NULL);
/*!40000 ALTER TABLE `tablelessondetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tablelessons`
--

DROP TABLE IF EXISTS `tablelessons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tablelessons` (
  `lessonId` int(11) NOT NULL AUTO_INCREMENT,
  `lessonDate` date NOT NULL,
  `lessonClass` varchar(30) NOT NULL,
  `lessonLocation` varchar(30) DEFAULT NULL,
  `lessonModule` smallint(6) NOT NULL,
  `lessonMentor1` smallint(6) NOT NULL,
  `lessonMentor2` smallint(6) DEFAULT NULL,
  `lessonMentor3` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`lessonId`),
  KEY `lessonModule` (`lessonModule`),
  CONSTRAINT `tablelessons_ibfk_1` FOREIGN KEY (`lessonModule`) REFERENCES `tablemodules` (`moduleId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tablelessons`
--

LOCK TABLES `tablelessons` WRITE;
/*!40000 ALTER TABLE `tablelessons` DISABLE KEYS */;
INSERT INTO `tablelessons` VALUES (5,'2016-12-18','3','de waag',3,15,16,18);
/*!40000 ALTER TABLE `tablelessons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tablemodules`
--

DROP TABLE IF EXISTS `tablemodules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tablemodules` (
  `moduleId` smallint(6) NOT NULL AUTO_INCREMENT,
  `moduleName` varchar(30) NOT NULL,
  `moduleMentor1` smallint(6) DEFAULT NULL,
  `moduleMentor2` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`moduleId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tablemodules`
--

LOCK TABLES `tablemodules` WRITE;
/*!40000 ALTER TABLE `tablemodules` DISABLE KEYS */;
INSERT INTO `tablemodules` VALUES (1,'HTML',3,NULL),(2,'CSS',5,NULL),(3,'Javascript',NULL,NULL),(4,'Angular JS',NULL,NULL),(5,'NodeJS',NULL,NULL);
/*!40000 ALTER TABLE `tablemodules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tableroles`
--

DROP TABLE IF EXISTS `tableroles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tableroles` (
  `roleId` tinyint(4) NOT NULL,
  `roleName` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tableroles`
--

LOCK TABLES `tableroles` WRITE;
/*!40000 ALTER TABLE `tableroles` DISABLE KEYS */;
/*!40000 ALTER TABLE `tableroles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tableuserroles`
--

DROP TABLE IF EXISTS `tableuserroles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tableuserroles` (
  `roleId` tinyint(4) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`roleId`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `tableuserroles_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `tableroles` (`roleId`),
  CONSTRAINT `tableuserroles_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `tableusers` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tableuserroles`
--

LOCK TABLES `tableuserroles` WRITE;
/*!40000 ALTER TABLE `tableuserroles` DISABLE KEYS */;
/*!40000 ALTER TABLE `tableuserroles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tableusers`
--

DROP TABLE IF EXISTS `tableusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tableusers` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `userFirstName` varchar(30) NOT NULL,
  `userLastName` varchar(30) DEFAULT NULL,
  `userAddress` varchar(30) DEFAULT NULL,
  `userRegisterDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `userEmail` varchar(30) NOT NULL,
  `userMobile` varchar(30) DEFAULT NULL,
  `userStatus` tinyint(1) DEFAULT NULL,
  `userRole` varchar(30) NOT NULL,
  `userClass` smallint(6) DEFAULT NULL,
  `userPhoto` longblob,
  `userPassword` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  KEY `userClass` (`userClass`),
  KEY `userStatus` (`userStatus`),
  CONSTRAINT `tableusers_ibfk_1` FOREIGN KEY (`userClass`) REFERENCES `tableclasses` (`classId`),
  CONSTRAINT `tableusers_ibfk_2` FOREIGN KEY (`userStatus`) REFERENCES `tableuserstatus` (`statusId`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tableusers`
--

LOCK TABLES `tableusers` WRITE;
/*!40000 ALTER TABLE `tableusers` DISABLE KEYS */;
INSERT INTO `tableusers` VALUES (8,'Wael','Alsabbouh','Maastricht','2016-11-26 20:25:47','wael.hakam@outlook.com','0634534534',NULL,'Student',4,'','d78fg6dfgdf'),(9,'Mohammed','Ibrahim','Tilburg','2016-11-26 20:27:30','m.ibrahim@gmail.com','0634534523',NULL,'Student',4,'','8s9d7f98s7d98f'),(10,'Yonas','Berhe','Rotterdam','2016-11-26 20:28:24','y.berhe@outlook.com','0623487623',NULL,'Student',4,'','987df98s7d98fs7df'),(12,'Mohanned','Mjawaz','Amsterdam','2016-11-26 20:30:55','mmjawaaz@outlook.com','0623423412',NULL,'Student',4,'','s6dfs876df'),(13,'Maartije','Kruijt','Amsterdam','2016-11-26 20:38:25','m.kruijt@hotmail.com','0623423423',NULL,'Admin',1,'','98s6d7f98s7d98fs7df'),(14,'Daan','Aerts','Amsterdam','2016-11-26 20:40:26','d.aerts@gmail.com','0623423423',NULL,'Admin',1,'','s9876df8sd8f7s'),(15,'Timir','Karia','Amsterdam','2016-11-26 20:41:22','t.karia@outlook.com','0623423423',NULL,'Mentor',1,'','98dsf79s8d7f98s7f'),(16,'Ahmad','Kabakibi','Amsterdam','2016-11-26 20:42:45','a.kabakbi@gmail.com','0623423423',NULL,'Mentor',1,'','809ds7fs98d7f9s8d'),(17,'Fillip','Llievski','Amsterdam','2016-11-26 20:43:51','f.llievski@gmail.com','0632423423',NULL,'Mentor',1,'','9874983274svdsd'),(18,'Joost','Lubach','Amsterdam','2016-11-26 20:52:47','y.lubach@gmail.com','0623443212',NULL,'Mentor',1,'','s98d7fs98df98s7d98f');
/*!40000 ALTER TABLE `tableusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tableuserstatus`
--

DROP TABLE IF EXISTS `tableuserstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tableuserstatus` (
  `statusId` tinyint(4) NOT NULL,
  `statusName` varchar(30) NOT NULL,
  PRIMARY KEY (`statusId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tableuserstatus`
--

LOCK TABLES `tableuserstatus` WRITE;
/*!40000 ALTER TABLE `tableuserstatus` DISABLE KEYS */;
INSERT INTO `tableuserstatus` VALUES (1,'Active'),(2,'Graduated'),(3,'Internship'),(4,'Working'),(5,'Quit');
/*!40000 ALTER TABLE `tableuserstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `lessonstudnames`
--

/*!50001 DROP VIEW IF EXISTS `lessonstudnames`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `lessonstudnames` AS select `tablelessons`.`lessonId` AS `lessonId`,concat(`tableusers`.`userFirstName`,' ',`tableusers`.`userLastName`) AS `StudentName`,`tablelessondetails`.`lessonAttended` AS `lessonAttended`,`tablelessondetails`.`lessonAssignment` AS `lessonAssignment`,`tablelessondetails`.`lessonFeedback` AS `lessonFeedback` from (`tableusers` join (`tablelessons` join `tablelessondetails` on((`tablelessons`.`lessonId` = `tablelessondetails`.`lessonId`))) on((`tableusers`.`userId` = `tablelessondetails`.`lessonStudentId`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-12-09 11:17:12
