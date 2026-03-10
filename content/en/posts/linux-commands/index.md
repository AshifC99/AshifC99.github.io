---
title: "30+ Linux Commands"
description: "30+ essential Linux commands that every developer should know"
date: 2026-02-19
author: "Ashif"
tags: ["linux", "terminal", "devops", "cheatsheet"]
---

# Linux commands that every developer should know

If you work as a developer, interacting with the terminal is a fundamental skill. Here is a list of essential commands divided by category.

### 1. Navigation and File Management

`pwd` - prints the current working directory

`ls` - lists files in the current directory

`ls -la` - lists all files (including hidden ones) with details

`cd <dir>` - changes directory

`cd ..` - goes to the parent directory

`cd ~` - goes to the user's home directory

`mkdir <dir>` - creates a new directory

`mkdir -p <path/to/dir>` - creates nested directories

`touch <file>` - creates an empty file or updates the timestamp

`cp <source> <dest>` - copies a file or directory

`cp -r <source> <dest>` - recursively copies a directory

`mv <source> <dest>` - moves or renames a file/directory

`rm <file>` - removes a file

`rm -rf <dir>` - forcefully removes a directory and its contents

### 2. Viewing and Manipulating Content

`cat <file>` - shows the content of a file

`less <file>` - views file content with scrolling

`head -n 10 <file>` - shows the first 10 lines

`tail -n 10 <file>` - shows the last 10 lines

`tail -f <file>` - follows additions to a file in real-time (useful for logs)

`grep "pattern" <file>` - searches for text in a file

`grep -r "pattern" .` - recursively searches for text in the current directory

`find . -name "*.js"` - finds files by name

### 3. Permissions and Ownership

`chmod +x <file>` - makes a file executable

`chmod 755 <file>` - sets rwx permissions for user, rx for others

`chown user:group <file>` - changes owner and group

`sudo <command>` - executes a command with superuser privileges

### 4. Processes and System

`ps aux` - shows all running processes

`top` - dynamic monitor of processes and resources

`htop` - interactive and improved version of top

`kill <pid>` - terminates a process given its PID

`killall <name>` - terminates all processes with a certain name

`df -h` - shows available disk space

`du -sh <dir>` - shows total size of a directory

`free -h` - shows RAM memory usage

### 5. Network

`ping <host>` - checks host reachability

`curl <url>` - transfers data from/to a server

`curl -I <url>` - shows only the response headers

`wget <url>` - downloads a file from the web

`netstat -tuln` - shows listening ports

`ssh user@host` - secure remote connection

`scp <file> user@host:<path>` - secure file copy between hosts

### 6. Archives and Compression

`tar -czvf archive.tar.gz <dir>` - creates a compressed archive

`tar -xzvf archive.tar.gz` - extracts a compressed archive

`zip -r archive.zip <dir>` - creates a zip archive

`unzip archive.zip` - extracts a zip archive

### 7. Variables and Environment

`env` - shows environment variables

`export VAR=value` - sets an environment variable

`echo $VAR` - prints the value of a variable

`history` - shows the history of executed commands

`alias name='command'` - creates an alias for a command

### Bonus: Terminal Editors

`nano <file>` - simple text editor

`vim <file>` - advanced text editor (to exit: `:q!`)

---

Knowing these commands will make you much more productive and independent in your development environment!
