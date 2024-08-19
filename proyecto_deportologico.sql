-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-08-2024 a las 23:51:12
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
-- Estructura de tabla para la tabla `actividad_dia`
--

CREATE TABLE `actividad_dia` (
  `ID_act` int(11) NOT NULL,
  `Dni_act` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Objetivos` text NOT NULL,
  `MarcadorCumplido` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `deportivousuario`
--

CREATE TABLE `deportivousuario` (
  `ID_depor` int(11) NOT NULL,
  `DNI_depor` int(11) NOT NULL,
  `ObjetivosDeportivo` varchar(100) NOT NULL,
  `TipoDeporte` enum('Resistencia','Cardiovascular') NOT NULL,
  `Frecuencia` enum('2-3','3-4','4-5','5-6','6-7') NOT NULL,
  `Intensidad` enum('bajo','medio','alto') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `deportivousuario`
--

INSERT INTO `deportivousuario` (`ID_depor`, `DNI_depor`, `ObjetivosDeportivo`, `TipoDeporte`, `Frecuencia`, `Intensidad`) VALUES
(1, 48098789, 'Mejorar la resistencia', 'Resistencia', '', ''),
(2, 42098780, 'Cardiovascular', 'Cardiovascular', '', ''),
(3, 25098785, 'Mejorar la resistencia', 'Resistencia', '', ''),
(4, 47805040, 'Cardiovascular', 'Cardiovascular', '', ''),
(5, 47098980, 'Cardiovascular', 'Cardiovascular', '', ''),
(6, 47098783, 'Mejorar la resistencia', 'Resistencia', '', ''),
(7, 47167192, 'Cardiovascular', 'Cardiovascular', '', ''),
(8, 4709876, 'Mejorar la resistencia', 'Resistencia', '', ''),
(12, 47098780, 'Mejorar la resistencia', 'Resistencia', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `motivacion`
--

CREATE TABLE `motivacion` (
  `ID` int(11) NOT NULL,
  `FraseMotivacional` text NOT NULL,
  `Autor` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nutricionalusuario`
--

CREATE TABLE `nutricionalusuario` (
  `ID_nut` int(11) NOT NULL,
  `DNI_nut` int(11) NOT NULL,
  `ObjetivoNutricion` enum('Pérdida de peso','Mantener peso','Ganar peso') NOT NULL,
  `TipoAlimentacion` enum('Omnívora','Vegetariana','Vegana') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `nutricionalusuario`
--

INSERT INTO `nutricionalusuario` (`ID_nut`, `DNI_nut`, `ObjetivoNutricion`, `TipoAlimentacion`) VALUES
(1, 47098781, 'Ganar peso', 'Omnívora'),
(2, 48098789, 'Pérdida de peso', 'Omnívora'),
(3, 42098780, 'Pérdida de peso', 'Omnívora'),
(4, 25098785, 'Pérdida de peso', 'Omnívora'),
(5, 47805040, 'Ganar peso', 'Omnívora'),
(6, 47098980, 'Pérdida de peso', 'Omnívora'),
(7, 47098783, 'Pérdida de peso', 'Omnívora'),
(8, 47167192, 'Ganar peso', 'Omnívora'),
(9, 4709876, 'Pérdida de peso', 'Omnívora'),
(13, 47098780, 'Ganar peso', 'Omnívora');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesional`
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `progreso`
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
-- Estructura de tabla para la tabla `racha`
--

CREATE TABLE `racha` (
  `ID_racha` int(11) NOT NULL,
  `Dni_racha` int(11) NOT NULL,
  `FechaComienzo` date NOT NULL,
  `ComienzoRacha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `receta`
--

CREATE TABLE `receta` (
  `ID` int(11) NOT NULL,
  `Ingredientes` text NOT NULL,
  `Calorias` decimal(5,2) NOT NULL,
  `Macros` decimal(5,2) NOT NULL,
  `Proteinas` decimal(5,2) NOT NULL,
  `Grasas` decimal(5,2) NOT NULL,
  `Carbohidratos` decimal(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
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
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`DNI`, `Nombre_usuario`, `password`, `Nombre`, `Apellido`, `FechaNacimiento`, `Email`, `Peso`, `Altura`, `Genero`) VALUES
(4709876, 'juliann', 'ss', 'Julian', 'Gripaldi', '2001-02-01', 'julian@gmail.com', 76.00, 176.00, 'M'),
(25098785, 'anabarrio', '1975', 'Ana', 'Barrio', '1975-06-05', 'anabarrio@gmail.com', 55.00, 163.00, 'F'),
(42098780, 'pedroopaez', '123', 'Pedro', 'Paez', '2000-02-01', 'pedropaez@gmail.com', 70.00, 160.00, 'M'),
(47098780, 'dantesucho', '$2b$10$KatY9vJGPucVOfRyhBXLeulxmzqi1VnZDJiVstkbJe24u9WAcB0PG', 'Dante', 'Suchomela', '2005-12-20', 'dantesucho@gmail.com', 62.00, 175.00, 'M'),
(47098781, 'fransucho', 'sucho10', 'Francisco', 'Suchomela', '2005-12-20', 'franciscosuchomela@gmail.com', 65.00, 175.00, 'M'),
(47098783, 'aguscolman', 'hola22', 'agustin', 'colman', '2002-04-23', 'aguscolman@gmail.com', 60.00, 183.00, 'M'),
(47098980, 'Axelderf', '11', 'Axel', 'Derfler', '2005-02-01', 'axelderfler@gmail.com', 70.00, 173.00, 'M'),
(47167192, 'axelgamer10', 'axel1234', 'Axel', 'Derfler', '2006-08-21', 'axelcapo@gmail.com', 64.00, 171.00, 'M'),
(47805040, 'cristobalmaier', 'Exterminio44', 'Cristobal', 'Maier', '2007-03-20', 'cristobalmaier@gmail.com', 64.00, 174.00, 'M'),
(48098789, 'fedeperez10', 'f10', 'Fede', 'Perez', '2004-02-01', 'fedeperez10@gmail.com', 60.00, 190.00, 'M');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actividad_dia`
--
ALTER TABLE `actividad_dia`
  ADD PRIMARY KEY (`ID_act`),
  ADD KEY `Dni_act` (`Dni_act`);

--
-- Indices de la tabla `deportivousuario`
--
ALTER TABLE `deportivousuario`
  ADD PRIMARY KEY (`ID_depor`),
  ADD KEY `DNI_depor` (`DNI_depor`);

--
-- Indices de la tabla `motivacion`
--
ALTER TABLE `motivacion`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `nutricionalusuario`
--
ALTER TABLE `nutricionalusuario`
  ADD PRIMARY KEY (`ID_nut`),
  ADD KEY `DNI_nut` (`DNI_nut`);

--
-- Indices de la tabla `profesional`
--
ALTER TABLE `profesional`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `progreso`
--
ALTER TABLE `progreso`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `DNI_prog` (`DNI_prog`);

--
-- Indices de la tabla `racha`
--
ALTER TABLE `racha`
  ADD PRIMARY KEY (`ID_racha`),
  ADD KEY `Dni_racha` (`Dni_racha`);

--
-- Indices de la tabla `receta`
--
ALTER TABLE `receta`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`DNI`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actividad_dia`
--
ALTER TABLE `actividad_dia`
  MODIFY `ID_act` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `deportivousuario`
--
ALTER TABLE `deportivousuario`
  MODIFY `ID_depor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `motivacion`
--
ALTER TABLE `motivacion`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `nutricionalusuario`
--
ALTER TABLE `nutricionalusuario`
  MODIFY `ID_nut` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `profesional`
--
ALTER TABLE `profesional`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `progreso`
--
ALTER TABLE `progreso`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `racha`
--
ALTER TABLE `racha`
  MODIFY `ID_racha` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `receta`
--
ALTER TABLE `receta`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actividad_dia`
--
ALTER TABLE `actividad_dia`
  ADD CONSTRAINT `actividad_dia_ibfk_1` FOREIGN KEY (`Dni_act`) REFERENCES `usuario` (`DNI`);

--
-- Filtros para la tabla `deportivousuario`
--
ALTER TABLE `deportivousuario`
  ADD CONSTRAINT `deportivousuario_ibfk_1` FOREIGN KEY (`DNI_depor`) REFERENCES `usuario` (`DNI`);

--
-- Filtros para la tabla `nutricionalusuario`
--
ALTER TABLE `nutricionalusuario`
  ADD CONSTRAINT `nutricionalusuario_ibfk_1` FOREIGN KEY (`DNI_nut`) REFERENCES `usuario` (`DNI`);

--
-- Filtros para la tabla `progreso`
--
ALTER TABLE `progreso`
  ADD CONSTRAINT `progreso_ibfk_1` FOREIGN KEY (`DNI_prog`) REFERENCES `usuario` (`DNI`);

--
-- Filtros para la tabla `racha`
--
ALTER TABLE `racha`
  ADD CONSTRAINT `racha_ibfk_1` FOREIGN KEY (`Dni_racha`) REFERENCES `usuario` (`DNI`);
COMMIT;