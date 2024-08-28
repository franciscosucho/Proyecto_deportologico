-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-08-2024 a las 18:25:29
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

--
-- Volcado de datos para la tabla `actividad_dia`
--

INSERT INTO `actividad_dia` (`ID_act`, `Dni_act`, `Fecha`, `Objetivos`, `MarcadorCumplido`) VALUES
(1, 47098781, '2024-08-15', 'ir al gimnasio', 1),
(2, 47098781, '2024-08-25', 'caminar 1000metros', 0),
(3, 47098781, '0000-00-00', '2024-12-20', 0),
(4, 47098781, '0000-00-00', '2024-12-20', 0),
(5, 47098781, '2024-08-25', 'que me quiera', 1),
(6, 47098781, '2024-08-25', 'ir al tropi', 1),
(7, 47098781, '2024-08-25', 'tomar unas birras', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `deportivousuario`
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
-- Volcado de datos para la tabla `deportivousuario`
--

INSERT INTO `deportivousuario` (`ID_depor`, `DNI_depor`, `ObjetivosDeportivo`, `TipoDeporte`, `Frecuencia`, `Intensidad`) VALUES
(17, 47098781, 'Mejorar la resistencia', 'Resistencia', '4/7', 'Moderada');

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
  `intolerancia` enum('Ninguna','Dairy','Egg','Gluten','Grain','Peanut','Seafood','Soy','Sulfite','Wheat') NOT NULL,
  `ObjetivoNutricion` enum('Pérdida de peso','Mantener peso','Ganar peso') NOT NULL,
  `TipoAlimentacion` enum('Omnívora','Vegetarian','Ovo-Vegetariano','Vegan','Pescetarian','Gluten Free') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `nutricionalusuario`
--

INSERT INTO `nutricionalusuario` (`ID_nut`, `DNI_nut`, `intolerancia`, `ObjetivoNutricion`, `TipoAlimentacion`) VALUES
(18, 47098781, 'Ninguna', 'Ganar peso', 'Omnívora');

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
  `Fecha_ultimo_Ingreso` date NOT NULL
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
(47098781, 'fransucho', '1975', 'Francisco', 'Suchomela', '2005-12-20', 'franciscosuchomela@gmail.com', 65.00, 175.00, 'M');

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
  MODIFY `ID_act` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `deportivousuario`
--
ALTER TABLE `deportivousuario`
  MODIFY `ID_depor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `motivacion`
--
ALTER TABLE `motivacion`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `nutricionalusuario`
--
ALTER TABLE `nutricionalusuario`
  MODIFY `ID_nut` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

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