DROP DATABASE IF EXISTS greatBay_db;

CREATE DATABASE greatBay_db;

USE greatBay_db;

CREATE TABLE items(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255),
  current_bid INTEGER,
  PRIMARY KEY (id)
);

SELECT * FROM items;

INSERT INTO items (name, current_bid)
VALUES ("Monet", 10000);

INSERT INTO items (name, current_bid)
VALUES ("Medival Sword", 5000);

INSERT INTO items (name, current_bid)
VALUES ("William Shatner Toupee", 25);
