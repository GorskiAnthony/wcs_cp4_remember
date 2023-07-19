CREATE TABLE `USER` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `password` VARCHAR(190) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

CREATE TABLE `FRIEND` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `birthday` DATE NOT NULL,
  `id_user` INT,
  `be` VARCHAR(50),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_friend` FOREIGN KEY (`id_user`) REFERENCES `USER` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

-- Insertion des utilisateurs dans la table USER
INSERT INTO `USER` (`name`, `email`, `password`)
VALUES
  ('admin', 'admin@remember.com', '$argon2id$v=19$m=65536,t=5,p=1$ZUKY3dWwATpCkdTTmwroGA$M7r+inI91qAIumtBQVc+kQych8L9HoiwuN2DfDhe0Tg'),
  ('user', 'user@remember.com', '$argon2id$v=19$m=65536,t=5,p=1$FL1/N1ZyuXWhZchUGe0D0A$h2jDJY7uQLnNJu8v2ftzAGkht52bB2SqcWiAYW/NMgM');

-- Insertion des amis dans la table FRIEND avec leurs dates de naissance
INSERT INTO `FRIEND` (`name`, `birthday`, `id_user`, `be`)
VALUES
  ('Friend 1', '1990-05-15', 1, 'Meilleur ami'),
  ('Friend 2', '1988-09-22', 1, 'Ami proche'),
  ('Friend 3', '1995-11-10', 2, 'Ami d\'enfance'),
  ('Friend 4', '1985-12-30', 2, 'Collègue'),
  ('Friend 5', '1992-07-03', 2, 'Ami de fac'),
  ('Friend 6', '1998-04-18', 1, 'Meilleur ami'),
  ('Friend 7', '1987-03-25', 2, 'Ami d\'enfance'),
  ('Friend 8', '1996-09-05', 1, 'Ami proche'),
  ('Friend 9', '1991-11-20', 2, 'Collègue'),
  ('Friend 10', '1994-06-08', 1, 'Ami de fac'),
  ('Friend 11', '1989-08-12', 2, 'Meilleur ami'),
  ('Friend 12', '1997-02-07', 1, 'Ami proche'),
  ('Friend 13', '1986-10-16', 2, 'Collègue'),
  ('Friend 14', '1993-01-28', 1, 'Ami de fac'),
  ('Friend 15', '1999-03-14', 2, 'Meilleur ami');
