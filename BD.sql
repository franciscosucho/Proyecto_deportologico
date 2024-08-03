-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-08-2024 a las 23:03:53
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Base de datos: `proyecto_deportologico`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `DNI` varchar(20) NOT NULL,
  `Nombre_usuario` varchar(100) DEFAULT NULL,
  `password` varchar(40) DEFAULT NULL,
  `NombreApellido` varchar(100) NOT NULL,
  `FechaNacimiento` date NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Peso` decimal(5,2) DEFAULT NULL,
  `Altura` decimal(4,2) DEFAULT NULL,
  `Genero` char(1) DEFAULT NULL CHECK (`Genero` in ('M','F'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`DNI`, `Nombre_usuario`, `password`, `NombreApellido`, `FechaNacimiento`, `Email`, `Peso`, `Altura`, `Genero`) VALUES
('12345678A', NULL, NULL, 'Juan Pérez', '1985-06-15', 'juan.perez@example.com', 75.50, 1.80, 'M'),
('47098781', NULL, NULL, 'francisco suchomela', '1990-01-01', 'franciscosuchomela@gmail.com', 75.00, 99.99, 'M'),
('87654321B', NULL, NULL, 'Ana Gómez', '1990-03-22', 'ana.gomez@example.com', 60.00, 1.65, 'F');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`DNI`),
  ADD UNIQUE KEY `Email` (`Email`);
COMMIT;