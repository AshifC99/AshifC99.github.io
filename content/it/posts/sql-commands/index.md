---
title: "I comandi SQL essenziali"
description: "Una guida completa ai comandi SQL che ogni sviluppatore dovrebbe conoscere"
date: 2026-03-04
author: "Ashif"
tags: ["sql", "database", "cheatsheet", "backend"]
---

# Comandi SQL fondamentali per ogni sviluppatore

Se lavori con i database relazionali, conoscere l'SQL (Structured Query Language) è indispensabile. Ecco una lista dei comandi SQL più importanti, divisi per categoria.

### 1. DDL (Data Definition Language)

`CREATE DATABASE <nome>` - crea un nuovo database

`DROP DATABASE <nome>` - elimina un database esistente

`CREATE TABLE <tabella> (...)` - crea una nuova tabella

`DROP TABLE <tabella>` - elimina una tabella e i suoi dati

`ALTER TABLE <tabella> ADD <colonna> <tipo>` - aggiunge una colonna a una tabella

`TRUNCATE TABLE <tabella>` - svuota una tabella mantenendone la struttura

### 2. DML (Data Manipulation Language)

`SELECT * FROM <tabella>` - seleziona tutti i dati da una tabella

`INSERT INTO <tabella> (col1, col2) VALUES (val1, val2)` - inserisce un nuovo record

`UPDATE <tabella> SET col1 = val1 WHERE condizione` - aggiorna i record esistenti

`DELETE FROM <tabella> WHERE condizione` - elimina record da una tabella

### 3. DQL (Data Query Language)

`SELECT col1, col2 FROM <tabella>` - seleziona colonne specifiche

`SELECT DISTINCT colonna FROM <tabella>` - seleziona valori univoci

`SELECT * FROM <tabella> WHERE condizione` - filtra i risultati (es. `id = 1`)

`SELECT * FROM <tabella> ORDER BY colonna ASC|DESC` - ordina i risultati

`SELECT * FROM <tabella> LIMIT 10` - limita il numero di risultati

### 4. DCL (Data Control Language)

`GRANT <permessi> ON <tabella> TO <utente>` - assegna privilegi a un utente

`REVOKE <permessi> ON <tabella> FROM <utente>` - rimuove i privilegi da un utente

### 5. TCL (Transaction Control Language)

`BEGIN` (o `START TRANSACTION`) - inizia una nuova transazione

`COMMIT` - salva definitivamente i cambiamenti della transazione corrente

`ROLLBACK` - annulla i cambiamenti della transazione corrente

`SAVEPOINT <nome>` - imposta un punto di salvataggio all'interno di una transazione

### 6. Join (Unioni tra tabelle)

`INNER JOIN` - record che hanno valori corrispondenti in entrambe le tabelle

`LEFT JOIN` - tutti i record della tabella di sinistra e i corrispondenti della tabella di destra

`RIGHT JOIN` - tutti i record della tabella di destra e i corrispondenti della tabella di sinistra

`FULL JOIN` - tutti i record quando c'è una corrispondenza a sinistra o a destra

### 7. Funzioni di aggregazione e raggruppamento

`COUNT(colonna)` - conta il numero di righe

`SUM(colonna)` - calcola la somma dei valori

`AVG(colonna)` - calcola la media dei valori

`MIN(colonna)` / `MAX(colonna)` - trova il valore minimo / massimo

`GROUP BY colonna` - raggruppa le righe con lo stesso valore

`HAVING condizione` - filtra i gruppi creati (simile a WHERE, ma dopo il GROUP BY)

### 8. Operatori logici e di confronto

`=`, `<>`, `!=`, `<`, `>`, `<=`, `>=` - operatori di confronto standard

`AND`, `OR`, `NOT` - operatori logici per combinare condizioni

`BETWEEN val1 AND val2` - verifica se un valore è compreso in un intervallo

`LIKE 'pattern'` - cerca un pattern specifico (es. `%test%`)

`IN (val1, val2, ...)` - verifica se un valore è in una lista

`IS NULL` / `IS NOT NULL` - verifica se un valore è o non è NULL

---

Saper padroneggiare questi comandi ti permetterà di interrogare e gestire in modo efficace qualsiasi database relazionale!
