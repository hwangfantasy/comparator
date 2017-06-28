
DROP TABLE IF EXISTS `online_compare`;
CREATE TABLE `online_compare` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for scheduled_task
-- ----------------------------
DROP TABLE IF EXISTS `scheduled_task`;
CREATE TABLE `scheduled_task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_name` varchar(50) DEFAULT NULL COMMENT '任务名',
  `cron` varchar(50) DEFAULT NULL COMMENT '表达式',
  `has_started` tinyint(1) DEFAULT '1' COMMENT '是否已经执行',
  `available` tinyint(1) DEFAULT '1' COMMENT '是否可用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
