-- phpMyadmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2013 年 09 月 25 日 20:32
-- 服务器版本: 5.5.22
-- PHP 版本: 5.3.10-1ubuntu3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `ygxt`
--

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `account` varchar(50) NOT NULL,
  `departmentID` int(11) NOT NULL,
  `password` varchar(200) DEFAULT NULL,
  `lastLoginTime` datetime DEFAULT NULL,
  `lastLoginIP` varchar(50) DEFAULT NULL,
  `loginCount` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`account`),
  KEY `FK_Reference_2` (`departmentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`account`, `departmentID`, `password`, `lastLoginTime`, `lastLoginIP`, `loginCount`) VALUES
('admin', 0, 'admin', '0000-00-00 00:00:00', '', 1);

-- --------------------------------------------------------

--
-- 表的结构 `department`
--

CREATE TABLE IF NOT EXISTS `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `department`
--

INSERT INTO `department` (`id`, `name`) VALUES
(0, '党委研究生工作部'),
(1, '研究生创新园'),
(2, '信息科学与工程学院'),
(3, '软件学院'),
(4, '护理学院'),
(5, '地信院');

-- --------------------------------------------------------

--
-- 表的结构 `salary`
--

CREATE TABLE IF NOT EXISTS `salary` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `stuno` varchar(50) NOT NULL,
  `departmentID` int(11) NOT NULL,
  `year` int(11) DEFAULT NULL,
  `month` int(11) DEFAULT NULL,
  `salary` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  `remark` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Reference_3` (`stuno`),
  KEY `FK_Reference_5` (`departmentID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- 转存表中的数据 `salary`
--

INSERT INTO `salary` (`id`, `stuno`, `departmentID`, `year`, `month`, `salary`, `status`, `remark`) VALUES
(1, '124611158', 1, 2013, 9, 1500, 1, '好家伙'),
(2, '124612272', 1, 2013, 9, 3500, 1, '大傻逼'),
(3, '124611140', 1, 2013, 9, 985, 1, ''),
(4, '124611159', 1, 2013, 9, 15, 1, '');

-- --------------------------------------------------------

--
-- 表的结构 `salaryhistory`
--

CREATE TABLE IF NOT EXISTS `salaryhistory` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `stuno` varchar(50) NOT NULL,
  `departmentID` int(11) NOT NULL,
  `year` int(11) DEFAULT NULL,
  `month` int(11) DEFAULT NULL,
  `salary` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `remark` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Reference_4` (`stuno`),
  KEY `FK_Reference_6` (`departmentID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=19 ;

--
-- 转存表中的数据 `salaryhistory`
--

INSERT INTO `salaryhistory` (`id`, `stuno`, `departmentID`, `year`, `month`, `salary`, `status`, `remark`) VALUES
(1, '124611158', 1, 2013, 9, 2000, 4, NULL),
(2, '124612272', 0, 2013, 9, 3500, 4, '大傻逼'),
(3, '124611158', 2, 2013, 9, 2000, 4, NULL),
(4, '124611158', 1, 2013, 9, 2000, 4, NULL),
(5, '124611158', 1, 2013, 9, 2000, 4, NULL),
(6, '124611158', 1, 2013, 9, 2000, 4, NULL),
(7, '124611158', 1, 2013, 9, 2000, 4, NULL),
(8, '124611158', 1, 2013, 9, 2000, 4, NULL),
(9, '124611158', 1, 2013, 9, 2000, 4, NULL),
(10, '124611158', 1, 2013, 9, 2000, 4, NULL),
(11, '124612272', 1, 2013, 9, 2000, 4, NULL),
(12, '124612272', 1, 2013, 9, 2000, 4, NULL),
(13, '124612272', 1, 2013, 9, 2000, 4, NULL),
(14, '124612272', 1, 2013, 9, 2000, 4, NULL),
(15, '124612272', 1, 2013, 9, 2000, 4, NULL),
(16, '124612272', 1, 2013, 9, 2000, 4, NULL),
(17, '124612272', 1, 2013, 9, 2000, 4, NULL),
(18, '124612272', 3, 2013, 9, 2000, 4, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `student`
--

CREATE TABLE IF NOT EXISTS `student` (
  `stuno` varchar(50) NOT NULL,
  `departmentID` int(11) NOT NULL,
  `stuCard` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `sex` varchar(10) DEFAULT NULL,
  `degree` varchar(10) DEFAULT NULL,
  `college` varchar(50) DEFAULT NULL,
  `grade` int(11) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `isWork` int(11) DEFAULT '1',
  `remark` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`stuno`),
  KEY `FK_Reference_1` (`departmentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `student`
--

INSERT INTO `student` (`stuno`, `departmentID`, `stuCard`, `name`, `sex`, `degree`, `college`, `grade`, `phone`, `isWork`, `remark`) VALUES
('124611140', 1, '108875', '周鹏', '男', '硕士生', '信息科学与工程学院', 2012, '15367992322', 1, 'O(∩_∩)O~'),
('124611158', 1, '108830', '邓彪', '男', '硕士生', '信息科学与工程学院', 2012, '15367992500', 1, '好家伙'),
('124611159', 1, '108845', '吴尚', '男', '硕士生', '信息科学与工程学院', 2012, '13354215845', 1, '二师兄'),
('124612272', 1, '108452', '王昭阳', '女', '硕士生', '信息科学与工程学院', 2012, '15367987503', 1, '大傻逼');

--
-- 限制导出的表
--

--
-- 限制表 `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `FK_Reference_2` FOREIGN KEY (`departmentID`) REFERENCES `department` (`id`);

--
-- 限制表 `salary`
--
ALTER TABLE `salary`
  ADD CONSTRAINT `FK_Reference_3` FOREIGN KEY (`stuno`) REFERENCES `student` (`stuno`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Reference_5` FOREIGN KEY (`departmentID`) REFERENCES `department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `salaryhistory`
--
ALTER TABLE `salaryhistory`
  ADD CONSTRAINT `FK_Reference_4` FOREIGN KEY (`stuno`) REFERENCES `student` (`stuno`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Reference_6` FOREIGN KEY (`departmentID`) REFERENCES `department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `FK_Reference_1` FOREIGN KEY (`departmentID`) REFERENCES `department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
