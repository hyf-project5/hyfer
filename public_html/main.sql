CREATE TABLE `users` (
 `id` int(8) NOT NULL PRIMARY KEY AUTO_INCREMENT,
 `full_name` varchar(145) NOT NULL,
 `email` varchar(145) NOT NULL,
 `password` BINARY(16) NOT NULL,
 `user_role` varchar(50) NOT NULL,
 `joined_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `avatar` varchar(2083), /* url */
 `bio` varchar(1000)
)

CREATE TABLE `user_roles` (
 `id` int(8) NOT NULL PRIMARY KEY AUTO_INCREMENT,
 `role` varchar(145) NOT NULL,
 `description` varchar(255)
) /* We can assign role directly in `user_role` from `users` table as we decided to have only students or teachers */

CREATE TABLE `groups` (
 `id` int(8) NOT NULL PRIMARY KEY AUTO_INCREMENT,
 `group_name` varchar(145) NOT NULL
) /* We can add here links to trello and slack for each group */

CREATE TABLE `user_group` (
 `id` int(8) NOT NULL PRIMARY KEY AUTO_INCREMENT,
 `user_id` int(8) NOT NULL,
 `group_id` int(8) NOT NULL
) /* You can assign one teacher to multiple groups while you can asign only one group for each student - I think this should be controlled from the front-end */;

CREATE TABLE `modules` (
 `id` int(8) NOT NULL PRIMARY KEY AUTO_INCREMENT,
 `module_name` varchar(145) NOT NULL,
 `description` varchar(255),
 `added_by` int(8) NOT NULL, /* user (teacher) ID */
 `added_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `module_img` varchar(2083), /* url */
 `git_url` varchar(2083) NOT NULL 
)

CREATE TABLE `sessions` (
 `id` int(8) NOT NULL PRIMARY KEY AUTO_INCREMENT,
 `group_id` int(8) NOT NULL,
 `module_id` int(8) NOT NULL,
 `started_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `scheduled_end` datetime NOT NULL, /* For the default value we can automaticelly add 21 days from the front-end by this query
                                     UPDATE sessions SET scheduled_end = DATE_ADD(started_on,INTERVAL 21 DAY) WHERE id = ?; */
 `finished` boolean NOT NULL DEFAULT 0
)

CREATE TABLE `session_mentors` (
 `id` int(8) NOT NULL PRIMARY KEY AUTO_INCREMENT,
 `session_id` int(8) NOT NULL,
 `user_id` int(8) NOT NULL
)









