---
title: "30+ comandi Linux"
description: "30+ comandi Linux essenziali che ogni sviluppatore dovrebbe conoscere"
date: 2026-02-19
author: "Ashif"
tags: ["linux", "terminal", "devops", "cheatsheet"]
---

# comandi Linux che qualunque sviluppatore dovrebbe sapere

Se lavori come sviluppatore, interagire con il terminale è una competenza fondamentale. Ecco una lista di comandi essenziali divisi per categoria.

### 1. Navigazione e gestione file

`pwd` - stampa la directory di lavoro corrente

`ls` - elenca i file nella directory corrente

`ls -la` - elenca tutti i file (inclusi nascosti) con dettagli

`cd <dir>` - cambia directory

`cd ..` - vai alla directory superiore

`cd ~` - vai alla directory home dell'utente

`mkdir <dir>` - crea una nuova directory

`mkdir -p <path/to/dir>` - crea directory annidate

`touch <file>` - crea un file vuoto o aggiorna il timestamp

`cp <source> <dest>` - copia file o directory

`cp -r <source> <dest>` - copia ricorsivamente directory

`mv <source> <dest>` - sposta o rinomina file/directory

`rm <file>` - rimuove un file

`rm -rf <dir>` - rimuove forzatamente una directory e il suo contenuto

### 2. Visualizzazione e manipolazione contenuto

`cat <file>` - mostra il contenuto di un file

`less <file>` - visualizza contenuto file con scorrimento

`head -n 10 <file>` - mostra le prime 10 righe

`tail -n 10 <file>` - mostra le ultime 10 righe

`tail -f <file>` - segue le aggiunte al file in tempo reale (utile per log)

`grep "pattern" <file>` - cerca testo in un file

`grep -r "pattern" .` - cerca testo ricorsivamente nella directory corrente

`find . -name "*.js"` - trova file per nome

### 3. Permessi e proprietà

`chmod +x <file>` - rende un file eseguibile

`chmod 755 <file>` - imposta permessi rwx per user, rx per altri

`chown user:group <file>` - cambia proprietario e gruppo

`sudo <comando>` - esegui comando con privilegi di superutente

### 4. Processi e sistema

`ps aux` - mostra tutti i processi in esecuzione

`top` - monitor dinamico dei processi e risorse

`htop` - versione interattiva e migliorata di top

`kill <pid>` - termina un processo dato il PID

`killall <name>` - termina tutti i processi con un certo nome

`df -h` - mostra spazio disco disponibile

`du -sh <dir>` - mostra dimensione totale di una directory

`free -h` - mostra utilizzo memoria RAM

### 5. Rete

`ping <host>` - verifica raggiungibilità host

`curl <url>` - trasferisce dati da/verso un server

`curl -I <url>` - mostra solo gli header della risposta

`wget <url>` - scarica file dal web

`netstat -tuln` - mostra porte in ascolto

`ssh user@host` - connessione remota sicura

`scp <file> user@host:<path>` - copia file sicura tra host

### 6. Archivi e compressione

`tar -czvf archive.tar.gz <dir>` - crea archivio compresso

`tar -xzvf archive.tar.gz` - estrae archivio compresso

`zip -r archive.zip <dir>` - crea archivio zip

`unzip archive.zip` - estrae archivio zip

### 7. Variabili e ambiente

`env` - mostra variabili d'ambiente

`export VAR=value` - imposta una variabile d'ambiente

`echo $VAR` - stampa valore variabile

`history` - mostra cronologia comandi eseguiti

`alias name='command'` - crea un alias per un comando

### Bonus: Editor da terminale

`nano <file>` - editor di testo semplice

`vim <file>` - editor di testo avanzato (per uscire: `:q!`)

---

Conoscere questi comandi ti renderà molto più produttivo e indipendente nel tuo ambiente di sviluppo!
