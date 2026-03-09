---
title: "Docker per principianti: 15 comandi essenziali + workflow reale"
description: "Una guida pratica a Docker: comandi base, immagini, container, volumi, network e un mini workflow per avviare progetti in pochi minuti."
date: 2026-02-28
author: "Ashif"
tags: ["docker", "devops", "containers", "cheatsheet", "backend"]
---

# Docker per principianti: comandi essenziali per lavorare meglio (senza impazzire)

Docker ti permette di far girare applicazioni in **container**: ambienti isolati e riproducibili, perfetti per evitare la classica frase “sul mio PC funziona”.

Sotto trovi una lista pratica (stile cheatsheet) dei comandi più utili, con un mini workflow reale per iniziare subito.

### 1. Immagini (images)

`docker pull nginx:latest` - scarica un’immagine da Docker Hub

`docker images` - lista immagini presenti in locale

`docker rmi nginx:latest` - rimuove un’immagine

`docker image prune` - cancella immagini inutilizzate (attenzione)

### 2. Container: avviare, fermare, ispezionare

`docker run hello-world` - esegue un container di test

`docker ps` - mostra i container attivi

`docker ps -a` - mostra tutti i container (anche stoppati)

`docker stop <container>` - ferma un container

`docker start <container>` - riavvia un container già creato

`docker rm <container>` - elimina un container

### 3. Run “come si deve”: porte, nome, background

`docker run -d --name web -p 8080:80 nginx:latest` - avvia Nginx in background e mappa porta 8080 → 80

- `-d` = detached (background)
- `--name` = nome più comodo dell’ID
- `-p host:container` = port mapping

### 4. Log e debug rapido

`docker logs web` - mostra i log

`docker logs -f web` - segue i log in tempo reale

`docker exec -it web /bin/sh` - entra nel container (shell)

> Tip: su alcune immagini serve `/bin/bash`, ma spesso in Alpine c’è solo `sh`.

### 5. Copiare file da/verso container

`docker cp web:/etc/nginx/nginx.conf ./nginx.conf` - copia dal container al tuo PC

`docker cp ./index.html web:/usr/share/nginx/html/index.html` - copia dal PC al container

### 6. Volumi: persistenza dei dati (fondamentale)

Senza volumi, i dati nel container sono “temporanei”. Con i volumi li rendi persistenti.

`docker volume ls` - lista volumi

`docker volume create mydata` - crea un volume

`docker run -d --name db -e POSTGRES_PASSWORD=pass -v mydata:/var/lib/postgresql/data postgres:16` - Postgres con dati persistenti

`docker volume rm mydata` - elimina volume (attenzione: perdi i dati)

### 7. Network: far parlare i container tra loro

`docker network ls` - lista network

`docker network create app-net` - crea network

`docker run -d --name db --network app-net -e POSTGRES_PASSWORD=pass postgres:16` - DB nella rete

`docker run -d --name api --network app-net my-api:latest` - API nella stessa rete

Così `api` può raggiungere `db` usando il nome `db` come hostname.

### 8. Pulizia: liberare spazio senza fare danni

`docker system df` - mostra quanto spazio stanno usando immagini/container/volumi

`docker container prune` - elimina container stoppati

`docker image prune` - elimina immagini dangling

`docker system prune` - pulizia più aggressiva (leggi bene cosa rimuove)

### 9. Build: creare la tua immagine

`docker build -t myapp:1.0 .` - build dell’immagine dal Dockerfile nella cartella corrente

`docker run -p 3000:3000 myapp:1.0` - avvia l’immagine appena creata

### 10. Mini workflow reale (copiabile): API + DB con Docker Compose

Esempio `docker-compose.yml` (Postgres + pgAdmin):

```yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: pass
      POSTGRES_USER: user
      POSTGRES_DB: appdb
    ports:
      - "5432:5432"
    volumes:
      - dbdata:/var/lib/postgresql/data

  pgadmin:
    image: dpage/pgadmin4
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@example.com
      PGADMIN_DEFAULT_PASSWORD: pass
    ports:
      - "5050:80"
    depends_on:
      - db

volumes:
  dbdata:
```

Comandi:

`docker compose up -d` - avvia tutto in background

`docker compose ps` - stato dei servizi

`docker compose logs -f` - log in tempo reale

`docker compose down` - ferma e rimuove container (i volumi restano)

### Bonus: 5 concetti che ti chiariscono Docker in 30 secondi

- **Image** = “template” dell’app (immutabile)
- **Container** = istanza in esecuzione di un’immagine
- **Volume** = spazio persistente per i dati
- **Network** = rete virtuale per comunicazione tra container
- **Compose** = modo semplice per gestire più container insieme

---

Impara 2-3 comandi a settimana e vedrai che Docker smetterà di sembrare “magia nera”.