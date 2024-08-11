CREATE TABLE
  `usuario` (
    `DNI` int NOT NULL PRIMARY KEY,
    `Nombre_usuario` varchar(100) NOT NULL,
    `password` varchar(40) NOT NULL,
    `Nombre` varchar(40) NOT NULL,
    `Apellido` varchar(40) NOT NULL,
    `FechaNacimiento` date NOT NULL,
    `Email` varchar(100) NOT NULL,
    `Peso` decimal(5, 2) NOT NULL,
    `Altura` decimal(6, 2) NOT NULL,
    `Genero` char(1) NOT NULL CHECK (`Genero` IN ('M', 'F'))
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

CREATE TABLE
  `actividad_dia` (
    `ID_act` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Dni_act` int NOT NULL,
    `Fecha` date NOT NULL,
    `Objetivos` text NOT NULL,
    `MarcadorCumplido` tinyint (1) NOT NULL,
    FOREIGN KEY (`Dni_act`) REFERENCES `usuario` (`DNI`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

CREATE TABLE
  `racha` (
    `ID_racha` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Dni_racha` int NOT NULL,
    `FechaComienzo` date NOT NULL,
    `ComienzoRacha` date NOT NULL,
    FOREIGN KEY (`Dni_racha`) REFERENCES `usuario` (`DNI`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

CREATE TABLE
  `deportivousuario` (
    `ID_depor` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `DNI_depor` int NOT NULL,
    `ObjetivosDeportivo` varchar(100) NOT NULL,
    `TipoDeporte` enum ('Resistencia', 'Cardiovascular') NOT NULL,
    `Frecuencia` enum ('2-3', '3-4', '4-5', '5-6', '6-7') NOT NULL,
    `Intensidad` enum ('bajo', 'medio', 'alto') NOT NULL,
    FOREIGN KEY (`DNI_depor`) REFERENCES `usuario` (`DNI`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

CREATE TABLE
  `motivacion` (
    `ID` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `FraseMotivacional` text NOT NULL,
    `Autor` varchar(100) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

CREATE TABLE
  `nutricionalusuario` (
    `ID_nut` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `DNI_nut` int NOT NULL,
    `ObjetivoNutricion` enum ('Pérdida de peso', 'Mantener peso', 'Ganar peso') NOT NULL,
    `TipoAlimentacion` enum ('Omnívora', 'Vegetariana', 'Vegana') NOT NULL,
    FOREIGN KEY (`DNI_nut`) REFERENCES `usuario` (`DNI`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

CREATE TABLE
  `profesional` (
    `ID` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `DNI` int NOT NULL,
    `Nombre` varchar(100) NOT NULL,
    `Apellido` varchar(100) NOT NULL,
    `Profesion` varchar(50) NOT NULL,
    `Descripcion` text NOT NULL,
    `Email` varchar(100) NOT NULL,
    `Numero` varchar(15) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

CREATE TABLE
  `progreso` (
    `ID` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `DNI_prog` int NOT NULL,
    `Fecha` date NOT NULL,
    `TipoRegistro` enum ('Ejercicios', 'Peso') NOT NULL,
    `Valor` decimal(10, 2) NOT NULL,
    FOREIGN KEY (`DNI_prog`) REFERENCES `usuario` (`DNI`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

CREATE TABLE
  `receta` (
    `ID` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Ingredientes` text NOT NULL,
    `Calorias` decimal(5, 2) NOT NULL,
    `Macros` decimal(5, 2) NOT NULL,
    `Proteinas` decimal(5, 2) NOT NULL,
    `Grasas` decimal(5, 2) NOT NULL,
    `Carbohidratos` decimal(5, 2) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;