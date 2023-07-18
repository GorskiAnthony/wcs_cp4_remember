CREATE TABLE `USER` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `password` VARCHAR(190) NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

CREATE TABLE `FRIEND` (
  `id_friend` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `birthday` DATE NOT NULL,
  `id_user` INT,
  `be` VARCHAR(50),
  PRIMARY KEY (`id_friend`),
  CONSTRAINT `fk_user_friend` FOREIGN KEY (`id_user`) REFERENCES `USER` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

-- Insertion des utilisateurs dans la table USER
INSERT INTO `USER` (`name`, `email`, `password`)
VALUES
  ('John Doe', 'john.doe@example.com', 'john123'),
  ('Jane Smith', 'jane.smith@example.com', 'jane456'),
  ('Robert Johnson', 'robert.johnson@example.com', 'robert789'),
  ('Alice Johnson', 'alice.johnson@example.com', 'alice567'),
  ('Michael Brown', 'michael.brown@example.com', 'michael321');

-- Insertion des amis dans la table FRIEND avec leurs dates de naissance
INSERT INTO `FRIEND` (`name`, `birthday`, `id_user`, `be`)
VALUES
  ('Friend 1', '1990-05-15', 1, 'Meilleur ami'),
  ('Friend 2', '1988-09-22', 1, 'Ami proche'),
  ('Friend 3', '1995-11-10', 2, 'Ami d\'enfance'),
  ('Friend 4', '1985-12-30', 2, 'Collègue'),
  ('Friend 5', '1992-07-03', 2, 'Ami de fac'),
  ('Friend 6', '1998-04-18', 3, 'Meilleur ami'),
  ('Friend 7', '1987-03-25', 3, 'Ami d\'enfance'),
  ('Friend 8', '1996-09-05', 3, 'Ami proche'),
  ('Friend 9', '1991-11-20', 4, 'Collègue'),
  ('Friend 10', '1994-06-08', 4, 'Ami de fac'),
  ('Friend 11', '1989-08-12', 4, 'Meilleur ami'),
  ('Friend 12', '1997-02-07', 4, 'Ami proche'),
  ('Friend 13', '1986-10-16', 5, 'Collègue'),
  ('Friend 14', '1993-01-28', 5, 'Ami de fac'),
  ('Friend 15', '1999-03-14', 5, 'Meilleur ami');
