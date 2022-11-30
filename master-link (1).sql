-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 30, 2022 at 01:19 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `master-link`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `linkView` (IN `userType` VARCHAR(200))   BEGIN
	IF userType = "f9d4049dd6a4dc35d40e5265954b2a46" THEN
	SELECT * FROM `links`;
    ELSEIF userType = "b0533f6b23ac1923681bc620eb1caf7c" THEN 
    SELECT * FROM `links` where tipo = "b0533f6b23ac1923681bc620eb1caf7c" OR tipo = "8ee6a9c17d367a41e87865a23134673f" OR tipo = "21bf72926eb2d9f1a233c4c679c1eb0f";
    ELSEIF userType ="8ee6a9c17d367a41e87865a23134673f" THEN
    SELECT * FROM `links` where tipo = "8ee6a9c17d367a41e87865a23134673f" OR tipo = "21bf72926eb2d9f1a233c4c679c1eb0f";
    ELSEIF userType ="21bf72926eb2d9f1a233c4c679c1eb0f" THEN
    SELECT * FROM `links` where tipo = "21bf72926eb2d9f1a233c4c679c1eb0f";
    END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `links`
--

CREATE TABLE `links` (
  `id` int(11) NOT NULL,
  `link` longtext NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `tipo` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `links`
--

INSERT INTO `links` (`id`, `link`, `descripcion`, `tipo`) VALUES
(5, 'https://www.youtube.com', 'Youtube', 'f9d4049dd6a4dc35d40e5265954b2a46'),
(6, 'www.google.com', 'Google', 'b0533f6b23ac1923681bc620eb1caf7c'),
(7, 'www.amazon.com', 'Amazon', '21bf72926eb2d9f1a233c4c679c1eb0f'),
(8, 'www.jefatura.com', 'Jefatura', '8ee6a9c17d367a41e87865a23134673f');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `apellido` varchar(150) NOT NULL,
  `usuario` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL DEFAULT 'usuario123',
  `tipo` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nombre`, `apellido`, `usuario`, `password`, `tipo`) VALUES
(10, 'admin', 'admin', 'admin', 'hola', 'f9d4049dd6a4dc35d40e5265954b2a46'),
(14, 'admin2', 'admin2', 'ad', 'nueva', 'f9d4049dd6a4dc35d40e5265954b2a46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `links`
--
ALTER TABLE `links`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user` (`usuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `links`
--
ALTER TABLE `links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
