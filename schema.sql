/*  Execute this file from the command line by typing:
 *    mysql -u student -p items.db < schema.sql
 *  to create the database and the tables.*/

CREATE DATABASE groceries;

USE groceries;

CREATE TABLE groceries (
  id INT NOT NULL AUTO_INCREMENT,
  item VARCHAR(255),
  quantity INT,
  PRIMARY KEY (id)
);