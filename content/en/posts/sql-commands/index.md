---
title: "Essential SQL Commands"
description: "A comprehensive guide to SQL commands every developer should know"
date: 2026-03-04
author: "Ashif"
tags: ["sql", "database", "cheatsheet", "backend"]
---

# Fundamental SQL Commands for Every Developer

If you work with relational databases, knowing SQL (Structured Query Language) is indispensable. Here is a list of the most important SQL commands, divided by category.

### 1. DDL (Data Definition Language)

`CREATE DATABASE <name>` - creates a new database

`DROP DATABASE <name>` - drops an existing database

`CREATE TABLE <table_name> (...)` - creates a new table

`DROP TABLE <table_name>` - deletes a table and its data

`ALTER TABLE <table_name> ADD <column> <type>` - adds a column to a table

`TRUNCATE TABLE <table_name>` - empties a table keeping its structure

### 2. DML (Data Manipulation Language)

`SELECT * FROM <table_name>` - selects all data from a table

`INSERT INTO <table_name> (col1, col2) VALUES (val1, val2)` - inserts a new record

`UPDATE <table_name> SET col1 = val1 WHERE condition` - updates existing records

`DELETE FROM <table_name> WHERE condition` - deletes records from a table

### 3. DQL (Data Query Language)

`SELECT col1, col2 FROM <table_name>` - selects specific columns

`SELECT DISTINCT column FROM <table_name>` - selects unique values

`SELECT * FROM <table_name> WHERE condition` - filters the results (e.g. `id = 1`)

`SELECT * FROM <table_name> ORDER BY column ASC|DESC` - sorts the results

`SELECT * FROM <table_name> LIMIT 10` - limits the number of results

### 4. DCL (Data Control Language)

`GRANT <permissions> ON <table_name> TO <user>` - assigns privileges to a user

`REVOKE <permissions> ON <table_name> FROM <user>` - removes privileges from a user

### 5. TCL (Transaction Control Language)

`BEGIN` (or `START TRANSACTION`) - starts a new transaction

`COMMIT` - permanently saves the changes of the current transaction

`ROLLBACK` - undoes the changes of the current transaction

`SAVEPOINT <name>` - sets a savepoint within a transaction

### 6. Joins (Unions Between Tables)

`INNER JOIN` - records that have matching values in both tables

`LEFT JOIN` - all records from the left table and the matched ones from the right table

`RIGHT JOIN` - all records from the right table and the matched ones from the left table

`FULL JOIN` - all records when there is a match in either the left or the right table

### 7. Aggregation and Grouping Functions

`COUNT(column)` - counts the number of rows

`SUM(column)` - calculates the sum of values

`AVG(column)` - calculates the average of values

`MIN(column)` / `MAX(column)` - finds the minimum / maximum value

`GROUP BY column` - groups rows with the same value

`HAVING condition` - filters the created groups (similar to WHERE, but after GROUP BY)

### 8. Logical and Comparison Operators

`=`, `<>`, `!=`, `<`, `>`, `<=`, `>=` - standard comparison operators

`AND`, `OR`, `NOT` - logical operators to combine conditions

`BETWEEN val1 AND val2` - checks if a value is within a range

`LIKE 'pattern'` - searches for a specific pattern (e.g. `%test%`)

`IN (val1, val2, ...)` - checks if a value is in a list

`IS NULL` / `IS NOT NULL` - checks if a value is or is not NULL

---

Mastering these commands will allow you to effectively query and manage any relational database!
