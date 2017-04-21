# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: localhost (MySQL 5.7.16)
# Database: hyfer
# Generation Time: 2017-04-20 12:08:54 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table group_students
# ------------------------------------------------------------



# Dump of table groups
# ------------------------------------------------------------

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;

INSERT INTO `groups` (`id`, `group_name`, `starting_date`)
VALUES
	(43,'Class 5','2016-07-24 00:00:00'),
	(44,'Class 6','2016-09-25 00:00:00'),
	(45,'Class 7','2016-11-06 00:00:00'),
	(46,'Class 8','2017-01-29 00:00:00'),
	(47,'Class 9','2017-03-12 00:00:00');

/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table modules
# ------------------------------------------------------------

LOCK TABLES `modules` WRITE;
/*!40000 ALTER TABLE `modules` DISABLE KEYS */;

INSERT INTO `modules` (`id`, `module_name`, `description`, `added_on`, `default_duration`, `sort_order`, `git_url`, `git_owner`, `git_repo`, `color`, `optional`)
VALUES
	(1,'Angular JS','Angular JS module description','2017-02-28 18:25:16',3,4,'https://github.com/HackYourFuture/','HackYourFuture','angular','#375e97',0),
	(2,'HTML-CSS','HTML-CSS module description','2017-02-28 18:25:56',3,0,'https://github.com/HackYourFuture/','HackYourFuture','angular','#fb6542',0),
	(3,'JavaScript 1','JavaScript 1 module description','2017-02-28 18:26:27',3,1,'https://github.com/HackYourFuture/','HackYourFuture','JavaScript','#ffbb00',0),
	(4,'JavaScript 2','JavaScript 2 module description','2017-02-28 18:26:41',3,2,'https://github.com/HackYourFuture/','HackYourFuture','JavaScript2','#3f681c',0),
	(5,'JavaScript 3','JavaScript 3 module description','2017-02-28 18:26:49',3,3,'https://github.com/HackYourFuture/','HackYourFuture','JavaScript3','#eb8a44',0),
	(6,'Node.js','Node.js module description','2017-02-28 18:27:21',3,5,'https://github.com/HackYourFuture/','HackYourFuture','Node.js','#f9dc24',0),
	(7,'Databases','Databases module description','2017-02-28 18:27:50',3,6,'https://github.com/HackYourFuture/','HackYourFuture','databases','#4b7447',0),
	(8,'Project','Project module description','2017-02-28 18:28:09',6,7,'https://github.com/HackYourFuture/','HackYourFuture','Project','#8eba43',0),
	(9,'Holiday','Holiday period','2017-03-06 14:35:26',1,1000,NULL,NULL,NULL,'#c05805',1),
	(10,'Hackathon','Hackathon / fun day','2017-03-06 14:36:22',1,1000,NULL,NULL,NULL,'#db9501',1);

/*!40000 ALTER TABLE `modules` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table running_modules
# ------------------------------------------------------------
LOCK TABLES `running_modules` WRITE;
/*!40000 ALTER TABLE `running_modules` DISABLE KEYS */;
INSERT INTO `running_modules` VALUES (106,'HTML-CSS module description',2,43,3,0,NULL,NULL),(107,'JavaScript 1 module description',3,43,3,1,NULL,NULL),(108,'JavaScript 2 module description',4,43,3,2,NULL,NULL),(109,'JavaScript 3 module description',5,43,3,3,NULL,NULL),(110,'Angular JS module description',1,43,3,4,NULL,NULL),(111,'Node.js module description',6,43,6,5,NULL,NULL),(112,'Databases module description',7,43,3,8,NULL,NULL),(113,'Project module description',8,43,6,9,NULL,NULL),(114,'HTML-CSS module description',2,44,3,0,NULL,NULL),(115,'JavaScript 1 module description',3,44,3,1,NULL,NULL),(116,'JavaScript 2 module description',4,44,3,2,NULL,NULL),(117,'JavaScript 3 module description',5,44,3,3,NULL,NULL),(118,'Angular JS module description',1,44,3,6,NULL,NULL),(119,'Node.js module description',6,44,3,7,NULL,NULL),(120,'Databases module description',7,44,3,8,NULL,NULL),(121,'Project module description',8,44,6,9,NULL,NULL),(122,'HTML-CSS module description',2,45,3,0,NULL,NULL),(123,'JavaScript 1 module description',3,45,3,1,NULL,NULL),(124,'JavaScript 2 module description',4,45,3,4,NULL,NULL),(125,'JavaScript 3 module description',5,45,3,5,NULL,NULL),(126,'Angular JS module description',1,45,3,6,NULL,NULL),(127,'Node.js module description',6,45,3,7,NULL,NULL),(128,'Databases module description',7,45,3,8,NULL,NULL),(129,'Project module description',8,45,6,9,NULL,NULL),(130,'HTML-CSS module description',2,46,3,0,NULL,NULL),(131,'JavaScript 1 module description',3,46,3,1,NULL,NULL),(132,'JavaScript 2 module description',4,46,3,2,NULL,NULL),(133,'JavaScript 3 module description',5,46,3,3,NULL,NULL),(134,'Angular JS module description',1,46,3,4,NULL,NULL),(135,'Node.js module description',6,46,3,5,NULL,NULL),(136,'Databases module description',7,46,3,6,NULL,NULL),(137,'Project module description',8,46,6,7,NULL,NULL),(138,'HTML-CSS module description',2,47,3,0,NULL,NULL),(139,'JavaScript 1 module description',3,47,3,1,NULL,NULL),(140,'JavaScript 2 module description',4,47,3,2,NULL,NULL),(141,'JavaScript 3 module description',5,47,3,3,NULL,NULL),(142,'Angular JS module description',1,47,3,4,NULL,NULL),(143,'Node.js module description',6,47,3,5,NULL,NULL),(144,'Databases module description',7,47,3,6,NULL,NULL),(145,'Project module description',8,47,6,7,NULL,NULL),(146,'Holiday',9,43,2,7,NULL,NULL),(147,'Holiday',9,44,2,5,NULL,NULL),(148,'Holiday',9,45,2,3,NULL,NULL),(149,'Hackathon',10,43,1,6,NULL,NULL),(150,'Hackathon',10,44,1,4,NULL,NULL),(151,'Hackathon',10,45,1,2,NULL,NULL);
/*!40000 ALTER TABLE `running_modules` ENABLE KEYS */;
UNLOCK TABLES;

# Dump of table students_history
# ------------------------------------------------------------


LOCK TABLES `students_history` WRITE;
/*!40000 ALTER TABLE `students_history` DISABLE KEYS */;
INSERT INTO `students_history` VALUES (47,139,20,'2017-03-12',0,0),(47,139,21,'2017-03-12',0,1),(47,139,22,'2017-03-12',0,1),(47,139,23,'2017-03-12',0,1),(47,139,24,'2017-03-12',0,1),(47,139,25,'2017-03-12',1,0),(47,139,26,'2017-03-12',1,1),(47,139,27,'2017-03-12',1,0),(47,139,28,'2017-03-12',0,1),(46,133,30,'2017-03-12',1,1),(46,133,31,'2017-03-12',0,1),(46,133,32,'2017-03-12',0,1),(46,133,33,'2017-03-12',0,1),(46,133,34,'2017-03-12',0,1),(46,133,35,'2017-03-12',0,1),(46,133,36,'2017-03-12',0,1),(46,133,37,'2017-03-12',0,1),(46,133,38,'2017-03-12',0,1),(46,133,39,'2017-03-12',0,1),(45,112,40,'2016-11-06',0,0),(45,112,41,'2016-11-06',0,0),(45,112,42,'2016-11-06',0,0),(45,112,43,'2016-11-06',0,0),(45,112,44,'2016-11-06',0,0),(45,112,45,'2016-11-06',0,0),(45,112,46,'2016-11-06',0,0),(44,112,47,'2016-11-06',0,0),(44,113,48,'2016-08-25',0,0),(44,113,49,'2016-08-25',0,0),(44,113,50,'2016-08-25',0,0),(44,113,51,'2016-08-25',0,0),(44,113,52,'2016-08-25',0,0),(44,113,53,'2016-08-25',0,0),(44,113,54,'2016-08-25',0,0),(44,113,55,'2016-08-25',0,0),(44,112,56,'2016-08-25',0,0);
/*!40000 ALTER TABLE `students_history` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `username`, `full_name`, `access_token`, `role`, `register_date`, `slack_username`, `freecodecamp_username`, `email`, `mobile`)
VALUES
	(20,'','Yaser Shomaf',NULL,'student','2017-04-19 18:02:34','@yasersomaf','fcc07c99b24','yasershomaf@gmail.com',NULL),
	(21,'','Elie Sacali',NULL,'student','2017-04-19 18:02:34','@elie','eliesakali','eliesacali@gmail.com',NULL),
	(22,'','Essam Alsaloum',NULL,'student','2017-04-19 18:02:34','@mojlbhr','fcc25d6cb43','es.alsaloum@gmail.com',NULL),
	(23,'','George Mamar',NULL,'student','2017-04-19 18:02:34','@georgem','gmamar','gmamar1@gmail.com',NULL),
	(24,'','Ashraf Khaddam',NULL,'student','2017-04-19 18:02:34','@ashrafkh','ashrafkh','ashrafkh1@gmail.com',NULL),
	(25,'','Aiham Bitar',NULL,'student','2017-04-19 18:02:34','@abitar','','aiham_bitar@hotmail.com',NULL),
	(26,'','Hameed ah Alhowidi',NULL,'student','2017-04-19 18:02:34','@hameed','ahalhowidi','ah.alhowidi@gmail.com',NULL),
	(27,'','Nour Saffour',NULL,'student','2017-04-19 18:02:34','@nsaffour','fcc86037877','nouralnajjar81@gmail.com',NULL),
	(28,'','M.Thabet Qaterji',NULL,'student','2017-04-19 18:02:34','@thabet','mthabetq','thabetqaterji91@gmail.com',NULL),
	(29,'abuodh','Abdulrahman Hussni',NULL,'student','2017-04-19 18:02:34','@abuodh','fcc92252714','abuodh@hotmail.com',NULL),
	(30,'jalal75','Jalal Alnadeem',NULL,'student','2017-04-19 18:02:34','@jalal','jalal75','jalal.alnadeem@gmail.com',NULL),
	(31,'','Muhammad Alo',NULL,'student','2017-04-19 18:02:34','@muhammadalo','fcc63e27c82','muhammadalo37@gmail.com',NULL),
	(32,'khinaowi','Khalid Hinawi',NULL,'student','2017-04-19 18:02:34','@khinaowi','khinaowi','khinaowi@hotmail.com',NULL),
	(33,'AwsIdris','Aws Idris',NULL,'student','2017-04-19 18:02:34','@awsidris','awsidris','awsidris@gmail.com',NULL),
	(34,'Ali-Barakat','Ali Barakat',NULL,'student','2017-04-19 18:02:34','@alibarakat','ali-barakat','barakat-ali@live.com',NULL),
	(35,'mozi1996','Mustafa Ezzi',NULL,'student','2017-04-19 18:02:34','@mostafa1996','fccdde22b17','mosrafaazy@gmail.com',NULL),
	(36,'MhdAnasAlrz','Anas Mohamad Hlehel',NULL,'student','2017-04-19 18:02:34','@anas_alrz','mhdanasalrz','mhd.anas.alrz@hotmail.com',NULL),
	(37,'borazan-taja','Jad Kaddour',NULL,'student','2017-04-19 18:02:34','@jad','borazan-taja','kaddour.jad@gmail.com',NULL),
	(38,'massoodbarsa','Amir Shakiba',NULL,'student','2017-04-19 18:02:34','@massoodbarsa','massoodbarsa','amir.shakiba1980@gmail.com',NULL),
	(39,'Odai-kakhi','Uday Kakhi',NULL,'student','2017-04-19 18:02:34','@odaikakhi','odai-kakhi','odaikakhi@gmail.com',NULL),
	(40,'ekhamis','Eyad Khamis',NULL,'student','2017-04-19 18:02:34','@ekhamis','','ekhamis@gmail.com',NULL),
	(41,'msheikhalard','Malek Sheikh Al Ard',NULL,'student','2017-04-19 18:02:34','@m.sheikhalard','','malek.sheikhalard@gmail.com',NULL),
	(42,'','Nabil Hinnawi',NULL,'student','2017-04-19 18:02:34','@nabilhinnawi','','nabilhinnawi@yahoo.com',NULL),
	(43,'ruteeb','Somur Ruteeb',NULL,'student','2017-04-19 18:02:34','@s.ruteeb','','s.ruteeb@gmail.com',NULL),
	(44,'saadali21','Saad Ronida',NULL,'student','2017-04-19 18:02:34','@s-ali21','','saadronida@gmail.com',NULL),
	(45,'suhaib81','Suhaib Bulbul',NULL,'student','2017-04-19 18:02:34','@suhaib','','suhaib81@gmail.com',NULL),
	(46,'AbdulRahmanDbes','Adbul Raman',NULL,'student','2017-04-19 18:02:34','@abdulrahmandbes','','abdulrahmandbes@gmail.com',NULL),
	(47,'m0o0tasem','Almoatasem Bllah Alahmad Albelikh',NULL,'student','2017-04-19 18:02:34','@al.mo0tasem','','mu.albalikh@hotmail.com',NULL),
	(48,'MLabash','Moaaz Labsh',NULL,'student','2017-04-19 18:02:34','@m.labash','fccf44cbd5b','mo3ath_lbsh@hotmail.com',NULL),
	(49,'shadialhakimi','Shadi Alhakimi',NULL,'student','2017-04-19 18:02:34','@shadialhakimi','','shadi_15_5@hotmail.com',NULL),
	(50,'','Mohanad Dabool',NULL,'student','2017-04-19 18:02:34','@mohanad.dabool','','mohanad.dabool1@gmail.com',NULL),
	(51,'yousifAlneamy','Yousif Alneamy',NULL,'student','2017-04-19 18:02:34','@yousif','','yousif.aladdin@gmail.com',NULL),
	(52,'amjad83m','Amjad Muhammad ',NULL,'student','2017-04-19 18:02:34','@amjad83m','amjad83m','amjad83m@hotmail.com',NULL),
	(53,'engmohannad','Mohannad Alobaid',NULL,'student','2017-04-19 18:02:34','@engmohannad','fcc9191bd06','eng_mohalobaid@yahoo.com',NULL),
	(54,'eix007','Anas Alabtah',NULL,'student','2017-04-19 18:02:34','@anas.alabtah','eix007','anas.alabtah@gmail.com',NULL),
	(55,'','Ehab M Omaro',NULL,'student','2017-04-19 18:02:34','@omaro86','fcc9617682f','omaro-86@hotmail.com',NULL),
	(56,'malekkn','Malek Kanaan',NULL,'student','2017-04-19 18:02:34','@malekkn','malekkn','malek.kanaan@outlook.com',NULL),
	(57,'rashidabdo','2017-07-24',NULL,'student','2017-04-19 18:02:34','@rashid_abdo','','rasheed.abdo@hotmail.com',NULL),
	(58,'','ML Jammeh',NULL,'student','2017-04-19 18:02:34','@mljammeh','','laminkanilai@gmail.com',NULL),
	(59,'aboRoma','Jack Sacali ',NULL,'student','2017-04-19 18:02:34','@aboroma','aboroma','jacksacali@gmail.com',NULL),
	(60,'','Saikat Barua',NULL,'student','2017-04-19 18:02:34','@saikat852','','derozio.bd@gmail.com',NULL),
	(61,'hasanshahoud','Hasan Shahoud',NULL,'student','2017-04-19 18:02:34','@hasan_shahoud','hasanshahoud','hasansh343@gmail.com',NULL),
	(62,'fade0991','Fadi',NULL,'student','2017-04-19 18:02:34','@fadi91','fade0991','fedo.dedo91@yahoo.com',NULL),
	(63,'majdiali','Majdi ali',NULL,'student','2017-04-19 18:02:34','@majdiali76','','majdi107@gmail.com',NULL),
	(64,'beto0o0o','Bahaa Eldereie',NULL,'student','2017-04-19 18:02:34','@beto0o','','bahaa.aldeiri@gmail.com',NULL),
	(65,'','Mohamad alkhen',NULL,'student','2017-04-19 18:02:34','@md.alkhen','','m.jabri86@yahoo.com',NULL),
	(66,'','Mahmud Jabri',NULL,'student','2017-04-19 18:02:34','@mahmud','','m.jabri86@yahoo.com',NULL);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
