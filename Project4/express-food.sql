-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 06, 2019 at 10:16 PM
-- Server version: 5.7.26-0ubuntu0.18.04.1
-- PHP Version: 7.2.17-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `express-food`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `street` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `apartmentNumber` int(11) NOT NULL,
  `city` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `postalCode` varchar(8) COLLATE utf8_unicode_ci NOT NULL,
  `isDefault` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`id`, `userId`, `street`, `apartmentNumber`, `city`, `postalCode`, `isDefault`) VALUES
(1, 1, 'Kamdhaj Nagar, Nimbahera', 225, 'Nimbahera', '312601', 1),
(2, 2, 'Sector 25, Gurgaon', 764, 'Haryana', '290783', 1),
(3, 7, 'Sector 45, Gurgaon', 859, 'Haryana', '290783', 1),
(4, 4, 'Sector 65, Noida', 74, 'UP', '280783', 1),
(5, 5, 'PDPU Road, Kudasan', 764, 'Gujarat', '382010', 1),
(10, 6, 'Mundra Port, Ahmednagar', 6, 'Gujarat', '389020', 1),
(11, 8, 'Panchvati, Senthi', 87, 'Rajasthan', '312613', 1),
(12, 9, 'Gokuldham, Bombay', 996, 'Maharashtra', '789020', 1),
(13, 10, 'Raj Vihar, Shivnagar', 872, 'Goa', '896520', 1);
(14, 10, 'Parvati Nagar, Shivnagar', 342, 'Goa', '892420', 0);

-- --------------------------------------------------------

--
-- Table structure for table `orderDetail`
--

CREATE TABLE `orderDetail` (
  `orderId` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `deliveryGuyId` int(11) NOT NULL,
  `totalAmount` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `orderDetail`
--

INSERT INTO `orderDetail` (`orderId`, `customerId`, `deliveryGuyId`, `totalAmount`) VALUES
(1, 1, 11, 679),
(2, 2, 11, 1000),
(3, 5, 9, 225),
(4, 2, 12, 420),
(5, 4, 10, 125),
(6, 1, 12, 25),
(7, 2, 11, 129),
(8, 2, 9, 110),
(9, 4, 9, 459),
(10, 5, 12, 99);

-- --------------------------------------------------------

--
-- Table structure for table `orderItem`
--

CREATE TABLE `orderItem` (
  `id` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `itemName` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `itemQuantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `orderItem`
--

INSERT INTO `orderItem` (`id`, `orderId`, `itemName`, `itemQuantity`) VALUES
(1, 1, 'Pizza', 1),
(2, 2, 'Burger', 2),
(3, 2, 'Rasmalai', 2),
(5, 1, 'Burger', 2),
(6, 2, 'Rasmalai', 2),
(7, 5, 'Biryani', 1),
(8, 6, 'Thali', 1),
(9, 2, 'Noodles', 1),
(10, 7, 'Pani Puri', 10),
(11, 8, 'Chana Puri', 2),
(12, 9, 'Paneer Wrap', 3),
(13, 10, 'Cheese Rolls', 4);

-- --------------------------------------------------------

--
-- Table structure for table `orderStatus`
--

CREATE TABLE `orderStatus` (
  `id` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `statusType` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `orderStatus`
--

INSERT INTO `orderStatus` (`id`, `orderId`, `statusType`, `timestamp`) VALUES
(1, 1, 'confirmed', '2019-06-06 16:42:42'),
(2, 2, 'pending', '2019-06-06 16:44:08'),
(3, 3, 'paymentFailed', '2019-06-06 16:44:09'),
(5, 2, 'pending', '2019-06-06 16:44:47'),
(6, 3, 'paymentFailed', '2019-06-06 16:44:47'),
(7, 10, 'paymentDone', '2019-06-06 16:44:47'),
(8, 5, 'inTransit', '2019-06-06 16:44:47'),
(9, 6, 'pending', '2019-06-06 16:44:47'),
(10, 7, 'paymentFailed', '2019-06-06 16:44:48'),
(11, 8, 'paymentDone', '2019-06-06 16:44:48'),
(12, 9, 'inTransit', '2019-06-06 16:44:48'),
(13, 10, 'pending', '2019-06-06 16:44:48');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `firstName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `lastName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `birthDate` date DEFAULT NULL,
  `email` text COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `login` varchar(42) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `userType` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'customer'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `firstName`, `lastName`, `birthDate`, `email`, `phone`, `login`, `password`, `userType`) VALUES
(1, 'Aashtosh', 'Rathi', '1998-05-28', 'aashutoshrathi@gmail.com', '7737253979', 'aashutoshrathi', 'password', 'customer'),
(2, 'Mayank', 'Pathela', '1997-06-04', 'mp_pathela@gmail.com', '9893263874', 'starky', 'varch', 'customer'),
(4, 'Pritha', 'Upadhyay', '1997-07-13', 'pikku@gmail.com', '9893263869', 'pikachu', 'main hoon', 'customer'),
(5, 'Anshuman', 'Verma', '1997-05-05', 'gsocer@gmail.com', '7876569834', 'anshumanv', 'moneymoney', 'customer'),
(6, 'Bheru', 'Lal', '1987-06-13', 'bheru@gmail.com', '9893268765', 'bheru', 'meethai', 'chef'),
(7, 'Pankaj', 'Yadav', '1997-02-23', 'aman@gmail.com', '6969696969', 'bitcoin', 'mera hash', 'chef'),
(8, 'Mohak', 'Khare', '1997-11-09', 'mohak@gmail.com', '7737829309', 'grammarnazi', 'lit food', 'chef'),
(9, 'Radheshyam', 'Kumar', '1997-01-19', 'rd@gmail.com', '9998887771', 'radheDon', 'dhoom machale', 'dBoy'),
(10, 'Baburao', 'Kumar', '1967-01-29', 'bbr@gmail.com', '9668787771', 'babu', '2dinmepaisadouble', 'dBoy'),
(11, 'Kamal', 'Kishor', '1977-03-04', 'kkj@gmail.com', '9968697771', 'kkj', 'ca-co', 'dBoy'),
(12, 'Sarat', 'Kumar', '1967-02-28', 'rd@gmail.com', '6968458303', 'skpatra', 'insti', 'dBoy');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `orderDetail`
--
ALTER TABLE `orderDetail`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `customerId` (`customerId`),
  ADD KEY `deliveryGuyId` (`deliveryGuyId`);

--
-- Indexes for table `orderItem`
--
ALTER TABLE `orderItem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderId` (`orderId`);

--
-- Indexes for table `orderStatus`
--
ALTER TABLE `orderStatus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderId` (`orderId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `orderDetail`
--
ALTER TABLE `orderDetail`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `orderItem`
--
ALTER TABLE `orderItem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `orderStatus`
--
ALTER TABLE `orderStatus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `userId_res` FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

--
-- Constraints for table `orderDetail`
--
ALTER TABLE `orderDetail`
  ADD CONSTRAINT `orderDetail_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `orderDetail_ibfk_2` FOREIGN KEY (`deliveryGuyId`) REFERENCES `user` (`id`);

--
-- Constraints for table `orderItem`
--
ALTER TABLE `orderItem`
  ADD CONSTRAINT `orderItem_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orderDetail` (`orderId`);

--
-- Constraints for table `orderStatus`
--
ALTER TABLE `orderStatus`
  ADD CONSTRAINT `orderStatus_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orderDetail` (`orderId`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
