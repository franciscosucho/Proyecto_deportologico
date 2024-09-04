-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 04, 2024 at 03:48 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `proyecto_deportologico`
--

-- --------------------------------------------------------

--
-- Table structure for table `actividad_dia`
--

CREATE TABLE `actividad_dia` (
  `ID_act` int(11) NOT NULL,
  `Dni_act` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Objetivos` text NOT NULL,
  `MarcadorCumplido` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `actividad_dia`
--

INSERT INTO `actividad_dia` (`ID_act`, `Dni_act`, `Fecha`, `Objetivos`, `MarcadorCumplido`) VALUES
(1, 47098781, '2024-08-28', 'ir al gimnasio', 1),
(2, 47098781, '2024-08-25', 'caminar 1000metros', 0),
(3, 47098781, '0000-00-00', '2024-12-20', 0),
(4, 47098781, '0000-00-00', '2024-12-20', 0),
(5, 47098781, '2024-08-25', 'que me quiera', 1),
(6, 47098781, '2024-08-25', 'ir al tropi', 1),
(7, 47098781, '2024-08-25', 'tomar unas birras', 1),
(8, 47098781, '2024-08-29', 'ir al tropi', 0),
(9, 47098781, '2024-08-29', 'ir al tropi', 0),
(10, 47098781, '2024-08-29', 'ir al tropi', 1),
(11, 47098781, '2024-08-29', 'ir al tropi', 1),
(12, 47098781, '2024-08-29', 'ir al tropi', 1),
(13, 47098781, '2024-08-29', 'ir al tropi', 1),
(14, 47098781, '2024-08-29', 'ir al tropi', 1),
(15, 47098781, '2024-08-29', 'ir al tropi', 1),
(17, 47098781, '2024-08-29', 'salir a bailar', 1),
(18, 47098781, '2024-08-29', 'tomar mates', 1),
(19, 47098781, '2024-08-29', 'ir a new york', 1),
(20, 47098781, '2024-08-29', 'tomar merca', 1),
(21, 47098781, '2024-08-29', 'frutos cerra el orto', 0),
(22, 47098781, '2024-08-29', 'tomar unas birras', 0),
(23, 47098781, '2024-09-10', 'ir al cole', 0),
(24, 47098781, '2024-09-02', 'ir a digitales', 0);

-- --------------------------------------------------------

--
-- Table structure for table `deportivousuario`
--

CREATE TABLE `deportivousuario` (
  `ID_depor` int(11) NOT NULL,
  `DNI_depor` int(11) NOT NULL,
  `ObjetivosDeportivo` varchar(100) NOT NULL,
  `TipoDeporte` enum('Resistencia','Cardiovascular') NOT NULL,
  `Frecuencia` enum('3/7','4/7','5/7','6/7','7/7') NOT NULL,
  `Intensidad` enum('Ligera','Moderada','Alta') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `deportivousuario`
--

INSERT INTO `deportivousuario` (`ID_depor`, `DNI_depor`, `ObjetivosDeportivo`, `TipoDeporte`, `Frecuencia`, `Intensidad`) VALUES
(17, 47098781, 'Mejorar la resistencia', 'Resistencia', '4/7', 'Moderada'),
(18, 2147483647, 'Cardiovascular', 'Cardiovascular', '5/7', 'Moderada'),
(19, 45098780, 'Mejorar la resistencia', 'Resistencia', '3/7', 'Ligera'),
(20, 47098765, 'Mejorar la resistencia', 'Resistencia', '3/7', 'Moderada'),
(21, 29087781, 'Mejorar la resistencia', 'Resistencia', '3/7', 'Ligera'),
(22, 20192780, 'Mejorar la resistencia', 'Resistencia', '3/7', 'Ligera'),
(23, 33098780, 'Mejorar la resistencia', 'Cardiovascular', '4/7', 'Moderada'),
(24, 34098781, 'Cardiovascular', 'Cardiovascular', '5/7', 'Moderada'),
(25, 35098782, 'Mejorar la resistencia', 'Resistencia', '3/7', 'Moderada'),
(26, 43098782, 'Mejorar la resistencia', 'Resistencia', '4/7', 'Moderada'),
(27, 42098782, 'Mejorar la resistencia', 'Resistencia', '3/7', 'Moderada'),
(28, 4309876, 'Mejorar la resistencia', 'Resistencia', '3/7', 'Moderada'),
(29, 223098784, 'Mejorar la resistencia', 'Resistencia', '', ''),
(30, 47805040, 'Mejorar la potencia', 'Cardiovascular', '4/7', 'Alta');

-- --------------------------------------------------------

--
-- Table structure for table `motivacion`
--

CREATE TABLE `motivacion` (
  `ID` int(11) NOT NULL,
  `FraseMotivacional` text NOT NULL,
  `Autor` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nutricionalusuario`
--

CREATE TABLE `nutricionalusuario` (
  `ID_nut` int(11) NOT NULL,
  `DNI_nut` int(11) NOT NULL,
  `intolerancia` enum('Ninguna','Dairy','Egg','Gluten','Grain','Peanut','Seafood','Soy','Sulfite','Wheat') NOT NULL,
  `ObjetivoNutricion` enum('Pérdida de peso','Mantener peso','Ganar peso') NOT NULL,
  `TipoAlimentacion` enum('Omnívora','Vegetarian','Ovo-Vegetariano','Vegan','Pescetarian','Gluten Free') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nutricionalusuario`
--

INSERT INTO `nutricionalusuario` (`ID_nut`, `DNI_nut`, `intolerancia`, `ObjetivoNutricion`, `TipoAlimentacion`) VALUES
(18, 47098781, 'Ninguna', 'Ganar peso', 'Omnívora'),
(19, 2147483647, 'Dairy', 'Mantener peso', 'Ovo-Vegetariano'),
(20, 45098780, 'Egg', 'Mantener peso', ''),
(21, 47098765, 'Dairy', 'Pérdida de peso', 'Vegetarian'),
(22, 29087781, 'Dairy', 'Pérdida de peso', 'Ovo-Vegetariano'),
(23, 20192780, 'Dairy', 'Mantener peso', 'Ovo-Vegetariano'),
(24, 33098780, 'Dairy', 'Pérdida de peso', 'Ovo-Vegetariano'),
(25, 34098781, 'Egg', 'Ganar peso', 'Vegan'),
(26, 35098782, 'Gluten', 'Mantener peso', 'Vegetarian'),
(27, 43098782, 'Egg', 'Mantener peso', 'Vegetarian'),
(28, 42098782, 'Egg', 'Mantener peso', 'Ovo-Vegetariano'),
(29, 4309876, 'Egg', 'Mantener peso', 'Ovo-Vegetariano'),
(30, 2490863, '', 'Pérdida de peso', ''),
(31, 223098784, '', 'Mantener peso', ''),
(32, 47805040, 'Ninguna', 'Ganar peso', '');

-- --------------------------------------------------------

--
-- Table structure for table `profesional`
--

CREATE TABLE `profesional` (
  `ID` int(11) NOT NULL,
  `DNI` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Apellido` varchar(100) NOT NULL,
  `Profesion` varchar(50) NOT NULL,
  `Descripcion` text NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Numero` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profesional`
--

INSERT INTO `profesional` (`ID`, `DNI`, `Nombre`, `Apellido`, `Profesion`, `Descripcion`, `Email`, `Numero`) VALUES
(1, 32897040, 'Miguel', 'Ortiz', 'Deportologo', 'El Mejor deportologo de Vicente Lopez, tiene un consultorio en Villa Adelina.', 'miguelortiz@gmail.com', '1125123959'),
(2, 34876567, 'Fernando', 'Sucre', 'Nutricionista Deportivo', 'El mejor nutricionista deportivo de Mexico, actualmente esta trabajando en Argentina.', 'fernandosucre@gmail.com', '1125124858'),
(3, 32902345, 'Juan', 'Gomez', 'Entrenador Profesional', 'El mejor entrenador profesional de Chile, Esta trabajando en Argentina ya que tiene un consultoria ubicado en Martinez, Buenos Aires.', 'juangomez@gmail.com', '11651276854');

-- --------------------------------------------------------

--
-- Table structure for table `progreso`
--

CREATE TABLE `progreso` (
  `ID` int(11) NOT NULL,
  `DNI_prog` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `TipoRegistro` enum('Ejercicios','Peso') NOT NULL,
  `Valor` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `racha`
--

CREATE TABLE `racha` (
  `ID_racha` int(11) NOT NULL,
  `Dni_racha` int(11) NOT NULL,
  `dias` int(11) NOT NULL,
  `Fecha_ultimo_Ingreso` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `racha`
--

INSERT INTO `racha` (`ID_racha`, `Dni_racha`, `dias`, `Fecha_ultimo_Ingreso`) VALUES
(3, 47098781, 5, '2024-09-02'),
(4, 4309876, 1, '2024-08-30'),
(5, 223098784, 1, '2024-09-02'),
(6, 47805040, 1, '2024-09-03');

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `DNI` int(11) NOT NULL,
  `Nombre_usuario` varchar(100) NOT NULL,
  `password` varchar(300) NOT NULL,
  `Nombre` varchar(40) NOT NULL,
  `Apellido` varchar(40) NOT NULL,
  `FechaNacimiento` date NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Peso` decimal(5,2) NOT NULL,
  `Altura` decimal(6,2) NOT NULL,
  `Genero` char(1) NOT NULL CHECK (`Genero` in ('M','F'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`DNI`, `Nombre_usuario`, `password`, `Nombre`, `Apellido`, `FechaNacimiento`, `Email`, `Peso`, `Altura`, `Genero`) VALUES
(2490863, 'adambarei', 'ss', 'Adam', 'Bareiro', '2003-02-22', 'adambarei@gmai.com', 67.00, 187.00, 'M'),
(4309876, 'morebeltran', '1223', 'Morena', 'Beltran', '2003-12-20', 'morebeltran@gmail.com', 76.00, 167.00, 'F'),
(20192780, 'germanpez', '222', 'german', 'pezella', '2002-08-20', 'germanpez@gmail.com', 85.00, 187.00, 'M'),
(29087781, 'fabribus', '222', 'fabricio', 'bustos', '2003-04-05', 'fabribus@gmail.com', 67.00, 167.00, 'M'),
(33098780, 'francoarmani', '912', 'Franco', 'Armani', '1989-09-09', 'francoarmani@gmail.com', 87.00, 190.00, 'M'),
(34098781, 'paulodiaz', '912', 'Paulo', 'Diaz', '2018-12-09', 'paulodiaz@gmail.com', 87.00, 187.00, 'M'),
(35098782, 'borjahaland', '123', 'Miguel', 'Borja', '2003-04-12', 'borjahaland@gmail.com', 76.00, 189.00, 'M'),
(42098782, 'facucoli', '912', 'Facundo', 'Colidio', '2003-03-07', 'facucoli@gmail.com', 79.00, 179.00, 'M'),
(43098782, 'santibeltran', '123', 'Santiago', 'Beltran', '2003-08-20', 'santibeltran@gmail.com', 76.00, 187.00, 'M'),
(45098780, 'lopezfrutos', '4321', 'santiago', 'frutos', '1987-08-20', 'lopezfrutos@gmail.com', 76.00, 186.00, 'M'),
(47098765, 'damianbetu', '333', 'damian', 'betular', '2003-08-30', 'damianbetu@gmail.com', 79.00, 183.00, 'M'),
(47098781, 'fransucho', '1975', 'Francisco', 'Suchomela', '2005-12-20', 'franciscosuchomela@gmail.com', 65.00, 175.00, 'M'),
(47805040, 'cris', 'cris10', 'Cristobal', 'Maier', '2007-03-20', 'cristobalmaier1@gmail.com', 64.00, 175.00, 'M'),
(223098784, 'equi', 'ss', 'Ezequiel', 'Fernandez', '2001-03-20', 'equi@gmail.com', 87.00, 187.00, 'M'),
(2147483647, 'beto_alonso', '1234', 'beto', 'alonso', '2002-02-12', 'beto@gmail.com', 70.00, 170.00, 'M');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actividad_dia`
--
ALTER TABLE `actividad_dia`
  ADD PRIMARY KEY (`ID_act`),
  ADD KEY `Dni_act` (`Dni_act`);

--
-- Indexes for table `deportivousuario`
--
ALTER TABLE `deportivousuario`
  ADD PRIMARY KEY (`ID_depor`),
  ADD KEY `DNI_depor` (`DNI_depor`);

--
-- Indexes for table `motivacion`
--
ALTER TABLE `motivacion`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `nutricionalusuario`
--
ALTER TABLE `nutricionalusuario`
  ADD PRIMARY KEY (`ID_nut`),
  ADD KEY `DNI_nut` (`DNI_nut`);

--
-- Indexes for table `profesional`
--
ALTER TABLE `profesional`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `progreso`
--
ALTER TABLE `progreso`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `DNI_prog` (`DNI_prog`);

--
-- Indexes for table `racha`
--
ALTER TABLE `racha`
  ADD PRIMARY KEY (`ID_racha`),
  ADD KEY `Dni_racha` (`Dni_racha`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`DNI`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actividad_dia`
--
ALTER TABLE `actividad_dia`
  MODIFY `ID_act` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `deportivousuario`
--
ALTER TABLE `deportivousuario`
  MODIFY `ID_depor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `motivacion`
--
ALTER TABLE `motivacion`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nutricionalusuario`
--
ALTER TABLE `nutricionalusuario`
  MODIFY `ID_nut` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `profesional`
--
ALTER TABLE `profesional`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `progreso`
--
ALTER TABLE `progreso`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `racha`
--
ALTER TABLE `racha`
  MODIFY `ID_racha` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `actividad_dia`
--
ALTER TABLE `actividad_dia`
  ADD CONSTRAINT `actividad_dia_ibfk_1` FOREIGN KEY (`Dni_act`) REFERENCES `usuario` (`DNI`);

--
-- Constraints for table `deportivousuario`
--
ALTER TABLE `deportivousuario`
  ADD CONSTRAINT `deportivousuario_ibfk_1` FOREIGN KEY (`DNI_depor`) REFERENCES `usuario` (`DNI`);

--
-- Constraints for table `nutricionalusuario`
--
ALTER TABLE `nutricionalusuario`
  ADD CONSTRAINT `nutricionalusuario_ibfk_1` FOREIGN KEY (`DNI_nut`) REFERENCES `usuario` (`DNI`);

--
-- Constraints for table `progreso`
--
ALTER TABLE `progreso`
  ADD CONSTRAINT `progreso_ibfk_1` FOREIGN KEY (`DNI_prog`) REFERENCES `usuario` (`DNI`);

--
-- Constraints for table `racha`
--
ALTER TABLE `racha`
  ADD CONSTRAINT `racha_ibfk_1` FOREIGN KEY (`Dni_racha`) REFERENCES `usuario` (`DNI`);
COMMIT;
