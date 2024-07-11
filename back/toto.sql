-- MySQL dump 10.13 Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1 Database: guessGame
-- ------------------------------------------------------
-- Server version 8.0.37
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
-- Table structure for table `friendship`
--
DROP TABLE IF EXISTS `friendship`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friendship` (
`user_id` bigint NOT NULL,
`user_id_friend` bigint NOT NULL,
PRIMARY KEY (`user_id_friend`,`user_id`),
KEY `FKb9biiilqk4uo9g72qbaopolea` (`user_id`),
CONSTRAINT `FKb9biiilqk4uo9g72qbaopolea` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
CONSTRAINT `FKcfs3voyj7e017nau5flvpemsk` FOREIGN KEY (`user_id_friend`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `friendship`
--
LOCK TABLES `friendship` WRITE;
/*!40000 ALTER TABLE `friendship` DISABLE KEYS */;
INSERT INTO `friendship` VALUES (1,2),(1,3),(1,4),(1,5),(2,1);
/*!40000 ALTER TABLE `friendship` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `game`
--
DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game` (
`id` bigint NOT NULL AUTO_INCREMENT,
`is_remote_compatible` bit(1) DEFAULT NULL,
`name` varchar(255) DEFAULT NULL,
`nb_player_max` int DEFAULT NULL,
`nb_player_min` int DEFAULT NULL,
`rules` varchar(255) DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `game`
--
LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (1,_binary '','engage',5,2,'Dolorem aut voluptatem fugiat.'),(2,_binary '\0','streamline',5,2,'Totam iste enim aut ex iusto alias.'),(3,_binary '','exploit',5,2,'Temporibus iure ea sit officia ut non.'),(4,_binary '','leverage',5,2,'Iure sequi omnis est non dolorum impedit veritatis asperiores iusto.'),(5,_binary '\0','cultivate',5,2,'Dolore et corporis ut tempore dolores.');
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `games_parties`
--
DROP TABLE IF EXISTS `games_parties`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `games_parties` (
`game_id` bigint NOT NULL,
`party_id` bigint NOT NULL,
KEY `FKaxkwloqo2ohtfk6lqkp916cpa` (`party_id`),
KEY `FK9w12d207etl03rr9c3f90dyw3` (`game_id`),
CONSTRAINT `FK9w12d207etl03rr9c3f90dyw3` FOREIGN KEY (`game_id`) REFERENCES `party` (`id`),
CONSTRAINT `FKaxkwloqo2ohtfk6lqkp916cpa` FOREIGN KEY (`party_id`) REFERENCES `game` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `games_parties`
--
LOCK TABLES `games_parties` WRITE;
/*!40000 ALTER TABLE `games_parties` DISABLE KEYS */;
INSERT INTO `games_parties` VALUES (18,1),(18,2),(18,4),(19,1),(19,2),(19,4),(20,1),(20,2),(20,4),(21,1),(21,2),(21,4);
/*!40000 ALTER TABLE `games_parties` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `inventory`
--
DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
`id` bigint NOT NULL,
`acquired_date` datetime(6) DEFAULT NULL,
`user_id` bigint NOT NULL,
`item_id` bigint NOT NULL,
PRIMARY KEY (`id`,`item_id`,`user_id`),
KEY `FK86u2qtuaxn5uph2u9olsxk2ic` (`user_id`),
KEY `FKrflym5lxj6xhmu4ok3ohmun5a` (`item_id`),
CONSTRAINT `FK86u2qtuaxn5uph2u9olsxk2ic` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
CONSTRAINT `FKrflym5lxj6xhmu4ok3ohmun5a` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `inventory`
--
LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `item`
--
DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
`id` bigint NOT NULL AUTO_INCREMENT,
`description` varchar(255) DEFAULT NULL,
`name` varchar(255) DEFAULT NULL,
`picture` varchar(255) DEFAULT NULL,
`price` int DEFAULT NULL,
`rarity` float DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `item`
--
LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `party`
--
DROP TABLE IF EXISTS `party`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `party` (
`id` bigint NOT NULL AUTO_INCREMENT,
`leader_rank` int DEFAULT NULL,
`nb_points` int DEFAULT NULL,
`party_code` bigint DEFAULT NULL,
`user_id` bigint DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `FKtcag4fsdqkmo7owjkk1p25h41` (`user_id`),
CONSTRAINT `FKtcag4fsdqkmo7owjkk1p25h41` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `party`
--
LOCK TABLES `party` WRITE;
/*!40000 ALTER TABLE `party` DISABLE KEYS */;
INSERT INTO `party` VALUES (1,1,100,123,1),(2,2,95,123,2),(3,3,90,123,3),(4,4,76,123,4),(5,5,75,123,5),(15,1,100,123,1),(18,NULL,NULL,1000,1),(19,NULL,NULL,1000,2),(20,NULL,NULL,1000,1),(21,NULL,NULL,1000,2);
/*!40000 ALTER TABLE `party` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `user`
--
DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
`id` bigint NOT NULL AUTO_INCREMENT,
`is_vip` bit(1) DEFAULT NULL,
`login` varchar(255) NOT NULL,
`mail` varchar(255) NOT NULL,
`nb_coin` int DEFAULT NULL,
`password` varchar(255) NOT NULL,
`picture` varchar(255) DEFAULT NULL,
`xp_point` int DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `user`
--
LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,'arthur','arthur@epitech.eu',NULL,'$2a$10$Tt9sfqCq0.ZUdBEGGhwF9.CxWBMDbXx83zSASEkM1CHgjdf5EtD3y',NULL,0),(2,_binary '','yuuuuugs','yugsDev@gmail.com',0,'$2a$10$GcoThaLqiUljE0fgFsxugepP3oenlJGbXT24cBrtHeu3nVuqhuERO','https://www.francetvinfo.fr/pictures/KI83JKIWxYVA8ng-cUtYxM6l-z8/1200x1200/2016/08/23/shrek-5.jpg',20),(3,NULL,'manon','manon@epitech.eu',NULL,'$2a$10$NWZDzBKYg8O.YOMXlXj3buFg8b06O/GInIpi2AddUMCcHViU/eEGi',NULL,30),(4,NULL,'andy','andy@epitech.eu',NULL,'$2a$10$Iln9/MVMokDguoNPD7YP..3Uc9DZiVBAMkHr4Al3Els/ApW7K.r7y','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0aNq_SDnVonVRBph9zBgU-Ep-5nnaBWZakw&s',40),(5,NULL,'ugo','ugo@epitech.eu',NULL,'$2a$10$D79./V4tzgHmtWxgXm9tc.Wruwqlh64iFcvRH5JoKvLoAdcBZkMo.',NULL,50);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `user_parties`
--
DROP TABLE IF EXISTS `user_parties`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_parties` (
`user_id` bigint NOT NULL,
`parties_id` bigint NOT NULL,
PRIMARY KEY (`user_id`,`parties_id`),
UNIQUE KEY `UK1a4q73yy141fikvl0d8mnd2bo` (`parties_id`),
CONSTRAINT `FKjn5yo153nxx669hxkkt04vegn` FOREIGN KEY (`parties_id`) REFERENCES `party` (`id`),
CONSTRAINT `FKl5yuwc6wwwefn8nguysb69omu` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `user_parties`
--
LOCK TABLES `user_parties` WRITE;
/*!40000 ALTER TABLE `user_parties` DISABLE KEYS */;
INSERT INTO `user_parties` VALUES (1,1),(2,2),(3,3),(4,4),(5,5);
/*!40000 ALTER TABLE `user_parties` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
-- Dump completed on 2024-07-09 11:39:14