-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 18, 2021 at 04:26 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `result-managment`
--

-- --------------------------------------------------------

--
-- Table structure for table `studentresults`
--

CREATE TABLE `studentresults` (
  `rollno` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `dateofbirth` varchar(255) NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `studentresults`
--

INSERT INTO `studentresults` (`rollno`, `name`, `dateofbirth`, `score`) VALUES
(1, 'Radha Kishore Das', '06.12.2001', 99),
(2, 'Akshit Sharma', '01.11.2001', 100),
(3, 'Rishi Sethi', '02.09.2001', 94),
(4, 'Subham Jha', '04.12.2001', 97),
(5, 'Aakash Kumar', '01.01.2001', 99);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `email`, `password`) VALUES
(1, 'Radha Kishore Das', 'radhakishore@gmail.com', 'radha@2021'),
(2, 'Akshit Sharma', 'akshitsharma@gmail.com', 'akshit@2021'),
(3, 'Rishi Sethi', 'rishi@gmail.com', 'rishi@2021'),
(4, 'Subham Jha', 'subham@gmail.com', 'subham@2021'),
(5, 'Aakash Kumar', 'aakash@gmail.com', 'aakash@2021');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `name`, `email`, `password`) VALUES
(1, 'Puja Munjal', 'pujamunjal@gmail.com', 'puja@1990');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `studentresults`
--
ALTER TABLE `studentresults`
  ADD PRIMARY KEY (`rollno`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
