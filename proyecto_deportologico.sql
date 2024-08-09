-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 04, 2024 at 10:24 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `proyecto_deportologico`
--

-- --------------------------------------------------------

--
-- Table structure for table `actividaddia`
--

CREATE TABLE `actividaddia` (
  `ID` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Objetivos` text DEFAULT NULL,
  `MarcadorCumplido` tinyint(1) NOT NULL,
  `DNI` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `actividaddia`
--

INSERT INTO `actividaddia` (`ID`, `Fecha`, `Objetivos`, `MarcadorCumplido`, `DNI`) VALUES
(1, '2024-07-25', 'Hacer 30 minutos de ejercicio', 1, '12345678A'),
(2, '2024-07-26', 'Beber 2 litros de agua', 0, '87654321B');

-- --------------------------------------------------------

--
-- Table structure for table `calendario`
--

CREATE TABLE `calendario` (
  `ID` int(11) NOT NULL,
  `FechaActividad` datetime NOT NULL,
  `NombreActividad` varchar(100) NOT NULL,
  `DNI` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `calendario`
--

INSERT INTO `calendario` (`ID`, `FechaActividad`, `NombreActividad`, `DNI`) VALUES
(1, '2024-07-25 08:00:00', 'Correr 5km', '12345678A'),
(2, '2024-07-26 18:00:00', 'Clase de yoga', '87654321B');

-- --------------------------------------------------------

--
-- Table structure for table `deportivousuario`
--

CREATE TABLE `deportivousuario` (
  `DNI` varchar(20) NOT NULL,
  `ObjetivosDeportivo` varchar(100) DEFAULT NULL,
  `TipoDeporte` varchar(50) DEFAULT NULL,
  `Frecuencia` enum('2-3','3-4','4-5','5-6','6-7') NOT NULL,
  `Intensidad` enum('bajo','medio','alto') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `deportivousuario`
--

INSERT INTO `deportivousuario` (`DNI`, `ObjetivosDeportivo`, `TipoDeporte`, `Frecuencia`, `Intensidad`) VALUES
('12345678A', 'Aumentar resistencia', 'Ciclismo', '2-3', 'medio'),
('87654321B', 'Tonificar músculos', 'Pesas', '5-6', 'alto');

-- --------------------------------------------------------

--
-- Table structure for table `motivacion`
--

CREATE TABLE `motivacion` (
  `ID` int(11) NOT NULL,
  `FraseMotivacional` text NOT NULL,
  `Autor` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `motivacion`
--

INSERT INTO `motivacion` (`ID`, `FraseMotivacional`, `Autor`) VALUES
(1, 'El único lugar donde el éxito viene antes que el trabajo es en el diccionario.', 'Vidal Sassoon'),
(2, 'El futuro pertenece a aquellos que creen en la belleza de sus sueños.', 'Eleanor Roosevelt');

-- --------------------------------------------------------

--
-- Table structure for table `nutricionalusuario`
--

CREATE TABLE `nutricionalusuario` (
  `DNI` varchar(20) NOT NULL,
  `ObjetivoNutricion` varchar(100) DEFAULT NULL,
  `TipoAlimentacion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nutricionalusuario`
--

INSERT INTO `nutricionalusuario` (`DNI`, `ObjetivoNutricion`, `TipoAlimentacion`) VALUES
('12345678A', 'Pérdida de peso', 'Dieta baja en carbohidratos'),
('87654321B', 'Mantenimiento', 'Dieta equilibrada');

-- --------------------------------------------------------

--
-- Table structure for table `profesional`
--

CREATE TABLE `profesional` (
  `ID` int(11) NOT NULL,
  `DNI` varchar(20) NOT NULL,
  `NombreApellido` varchar(100) NOT NULL,
  `Profesion` varchar(50) NOT NULL,
  `Descripcion` text DEFAULT NULL,
  `Email` varchar(100) NOT NULL,
  `Numero` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profesional`
--

INSERT INTO `profesional` (`ID`, `DNI`, `NombreApellido`, `Profesion`, `Descripcion`, `Email`, `Numero`) VALUES
(1, '12345678C', 'Carlos Martínez', 'Nutricionista', 'Especialista en dietas balanceadas', 'carlos.martinez@example.com', '555-1234'),
(2, '87654321D', 'María López', 'Entrenador Personal', 'Experta en entrenamiento funcional', 'maria.lopez@example.com', '555-5678');

-- --------------------------------------------------------

--
-- Table structure for table `progreso`
--

CREATE TABLE `progreso` (
  `ID` int(11) NOT NULL,
  `DNI` varchar(20) DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  `TipoRegistro` enum('Ejercicios','Peso') DEFAULT NULL,
  `Valor` decimal(10,2) DEFAULT NULL,
  `NombreEjercicio` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `progreso`
--

INSERT INTO `progreso` (`ID`, `DNI`, `Fecha`, `TipoRegistro`, `Valor`, `NombreEjercicio`) VALUES
(1, '12345678A', '2024-07-25', 'Ejercicios', 30.00, 'Correr'),
(2, '12345678A', '2024-07-25', 'Peso', 75.00, NULL),
(3, '87654321B', '2024-07-25', 'Ejercicios', 45.00, 'Pesas'),
(4, '87654321B', '2024-07-25', 'Peso', 60.00, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `racha`
--

CREATE TABLE `racha` (
  `ID` int(11) NOT NULL,
  `DNI` varchar(20) DEFAULT NULL,
  `DiasConsecutivos` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `racha`
--

INSERT INTO `racha` (`ID`, `DNI`, `DiasConsecutivos`) VALUES
(1, '12345678A', 10),
(2, '87654321B', 5);

-- --------------------------------------------------------

--
-- Table structure for table `receta`
--

CREATE TABLE `receta` (
  `ID` int(11) NOT NULL,
  `Ingredientes` text NOT NULL,
  `Calorias` decimal(5,2) DEFAULT NULL,
  `Macros` decimal(5,2) DEFAULT NULL,
  `Proteinas` decimal(5,2) DEFAULT NULL,
  `Grasas` decimal(5,2) DEFAULT NULL,
  `Carbohidratos` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `receta`
--

INSERT INTO `receta` (`ID`, `Ingredientes`, `Calorias`, `Macros`, `Proteinas`, `Grasas`, `Carbohidratos`) VALUES
(1, 'Pollo, arroz, brócoli', 500.00, 50.00, 30.00, 10.00, 45.00),
(2, 'Ensalada de atún', 300.00, 25.00, 15.00, 5.00, 30.00);

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `DNI` varchar(20) NOT NULL,
  `Nombre_usuario` varchar(100) DEFAULT NULL,
  `Contraseña` varchar(100) DEFAULT NULL,
  `NombreApellido` varchar(100) NOT NULL,
  `FechaNacimiento` date NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Peso` decimal(5,2) DEFAULT NULL,
  `Altura` decimal(4,2) DEFAULT NULL,
  `Genero` char(1) DEFAULT NULL CHECK (`Genero` in ('M','F'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`DNI`, `Nombre_usuario`, `Contraseña`, `NombreApellido`, `FechaNacimiento`, `Email`, `Peso`, `Altura`, `Genero`) VALUES
('12345678A', 'jperez', 'password123', 'Juan Pérez', '1985-06-15', 'juan.perez@example.com', 75.50, 1.80, 'M'),
('87654321B', 'agomez', 'password456', 'Ana Gómez', '1990-03-22', 'ana.gomez@example.com', 60.00, 1.65, 'F');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actividaddia`
--
ALTER TABLE `actividaddia`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `DNI` (`DNI`);

--
-- Indexes for table `calendario`
--
ALTER TABLE `calendario`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `DNI` (`DNI`);

--
-- Indexes for table `deportivousuario`
--
ALTER TABLE `deportivousuario`
  ADD PRIMARY KEY (`DNI`);

--
-- Indexes for table `motivacion`
--
ALTER TABLE `motivacion`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `nutricionalusuario`
--
ALTER TABLE `nutricionalusuario`
  ADD PRIMARY KEY (`DNI`);

--
-- Indexes for table `profesional`
--
ALTER TABLE `profesional`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `DNI` (`DNI`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `progreso`
--
ALTER TABLE `progreso`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `DNI` (`DNI`);

--
-- Indexes for table `racha`
--
ALTER TABLE `racha`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `DNI` (`DNI`);

--
-- Indexes for table `receta`
--
ALTER TABLE `receta`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`DNI`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actividaddia`
--
ALTER TABLE `actividaddia`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `calendario`
--
ALTER TABLE `calendario`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `motivacion`
--
ALTER TABLE `motivacion`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `profesional`
--
ALTER TABLE `profesional`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `progreso`
--
ALTER TABLE `progreso`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `racha`
--
ALTER TABLE `racha`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `receta`
--
ALTER TABLE `receta`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `actividaddia`
--
ALTER TABLE `actividaddia`
  ADD CONSTRAINT `actividaddia_ibfk_1` FOREIGN KEY (`DNI`) REFERENCES `usuario` (`DNI`);

--
-- Constraints for table `calendario`
--
ALTER TABLE `calendario`
  ADD CONSTRAINT `calendario_ibfk_1` FOREIGN KEY (`DNI`) REFERENCES `usuario` (`DNI`);

--
-- Constraints for table `deportivousuario`
--
ALTER TABLE `deportivousuario`
  ADD CONSTRAINT `deportivousuario_ibfk_1` FOREIGN KEY (`DNI`) REFERENCES `usuario` (`DNI`);

--
-- Constraints for table `nutricionalusuario`
--
ALTER TABLE `nutricionalusuario`
  ADD CONSTRAINT `nutricionalusuario_ibfk_1` FOREIGN KEY (`DNI`) REFERENCES `usuario` (`DNI`);

--
-- Constraints for table `progreso`
--
ALTER TABLE `progreso`
  ADD CONSTRAINT `progreso_ibfk_1` FOREIGN KEY (`DNI`) REFERENCES `usuario` (`DNI`);

--
-- Constraints for table `racha`
--
ALTER TABLE `racha`
  ADD CONSTRAINT `racha_ibfk_1` FOREIGN KEY (`DNI`) REFERENCES `usuario` (`DNI`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
