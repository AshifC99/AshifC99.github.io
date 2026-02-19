---
title: "50+ comandi Git"
description: "50+ comandi Git che qualunque sviluppatore dovrebbe sapere"
date: 2026-02-18
author: "Ashif C."
tags: ["welcome", "new", "about", "first"]
---

# comandi Git che qualunque sviluppatore dovrebbe sapere


### 1. Configurazione iniziale di Git

`git config --global user.name "Tuo Nome"` - impostare username globale

`git config --global user.email "tu@email.com"` - impostare email globale

`git config --list` - mostrare tutti i valori di configuazione

`git help <comando>` - vedere manuale di un comando


### 2. Creazione e clonazione 

`git init` - inizializzare una nuova repository git

`git clone <url>` - clonare una repository remota sulla macchina locale

`git clone --depth 1 <url>`

### 3. Stato e ispezione

`git status` - mostra lo stato della working tree

`git log` - mostra la cronologia completa dei commit

`git log --oneline` - mostra la cronologia in formato compatto

`git log --graph --decorate --all` - mostra la cronologia con grafo dei branch

`git show <commit>` - mostra i dettagli di un commit

`git diff` - mostra differenze non ancora in stage

`git diff --staged` - mostra differenze già in stage


### 4. Aggiunta e commit

`git add <file>` - aggiunge un file all'area di stage

`git add .` - aggiunge tutte le modifiche all'area di stage

`git add -p` - aggiunta interattiva a blocchi

`git commit -m "Messaggio"` - crea un commit con messaggio

`git commit --amend` - modifica l'ultimo commit

`git reset <file>` - rimuove un file dallo stage

`git reset --soft HEAD~1` - annulla l'ultimo commit mantenendo le modifiche

`git reset --hard HEAD~1` - annulla l'ultimo commit eliminando le modifiche


### 5. Branching

`git branch` - elenca i branch locali

`git branch <nome>` - crea un nuovo branch

`git branch -d <nome>` - elimina un branch già mergiato

`git branch -D <nome>` - elimina forzatamente un branch

`git branch -m <nuovo_nome>` - rinomina il branch corrente


### 6. Checkout e switch

`git checkout <branch>` - passa a un branch (comando classico)

`git checkout -b <nuovo_branch>` - crea e passa a un nuovo branch

`git switch <branch>` - passa a un branch (comando moderno)

`git switch -c <nuovo_branch>` - crea e passa a un nuovo branch (moderno)


### 7. Merge e rebase

`git merge <branch>` - unisce un branch nel branch corrente

`git merge --no-ff <branch>` - merge con commit esplicito

`git rebase <branch>` - riallinea i commit in modo lineare

`git rebase -i <base>` - rebase interattivo

`git rebase --abort` - annulla un rebase in corso

`git rebase --continue` - continua un rebase dopo la risoluzione conflitti


### 8. Remote

`git remote -v` - mostra i repository remoti configurati

`git remote add origin <url>` - aggiunge un repository remoto

`git remote remove origin` - rimuove un remoto

`git remote rename origin upstream` - rinomina un remoto


### 9. Push e pull

`git push` - invia i commit al remoto predefinito

`git push -u origin <branch>` - imposta upstream e invia il branch

`git push --force-with-lease` - force push più sicuro

`git pull` - scarica e integra modifiche (fetch + merge)

`git pull --rebase` - scarica e integra modifiche con rebase


### 10. Stash

`git stash` - salva temporaneamente le modifiche non committate

`git stash push -m "msg"` - salva uno stash con messaggio

`git stash list` - elenca gli stash disponibili

`git stash apply [stash@{n}]` - applica uno stash senza rimuoverlo

`git stash pop [stash@{n}]` - applica e rimuove uno stash

`git stash drop [stash@{n}]` - elimina uno stash specifico

`git stash clear` - elimina tutti gli stash


### 11. Tag

`git tag` - elenca i tag

`git tag <nome>` - crea un tag leggero

`git tag -a <nome> -m "msg"` - crea un tag annotato

`git push --tags` - invia tutti i tag al remoto

`git tag -d <nome>` - elimina un tag locale

`git push origin :refs/tags/<nome>` - elimina un tag remoto


### 12. Pulizia e manutenzione

`git clean -n` - anteprima dei file non tracciati da rimuovere

`git clean -fd` - rimuove file e cartelle non tracciati

`git prune` - rimuove oggetti orfani

`git gc` - esegue garbage collection del repository


### 13. Comandi avanzati

`git reflog` - mostra la cronologia dei movimenti di HEAD

`git cherry-pick <commit>` - applica un commit specifico su un altro branch

`git bisect start` - avvia la ricerca binaria di un bug

`git bisect good` - marca un commit come buono

`git bisect bad` - marca un commit come problematico

`git blame <file>` - mostra autore e commit per ogni riga

`git rev-parse HEAD` - mostra l'hash del commit corrente

`git shortlog` - riepiloga i contributi per autore

`git archive -o out.zip HEAD` - esporta uno snapshot del repository


### 14. Troubleshooting e recovery

`git reflog` - recupera hash recenti anche dopo reset o rebase

`git reset --hard <hash>` - torna a uno stato noto del repository

`git merge --abort` - annulla un merge in corso

`git rebase --abort` - annulla un rebase in corso

`git pull --rebase --autostash` - riallinea branch divergenti mantenendo modifiche locali


### 15. Workflow e best practice

`Conventional Commits (es. feat:, fix:, docs:)` - usa messaggi di commit coerenti e leggibili

`feature/<nome>, fix/<ticket>, hotfix/<ticket>, release/<versione>` - adotta una convenzione di naming per i branch

`Branch protection su main/default` - richiedi pull request, review e CI verde


### 16. Comandi avanzati per DevOps e CI/CD

`git clone --depth 1 <url>` - clonazione veloce per pipeline

`git fetch --depth=1 origin <branch>` - fetch superficiale del branch

`git fetch --prune --tags` - aggiorna tag e pulisce riferimenti remoti obsoleti

`git checkout --force <hash>` - checkout deterministico per build riproducibili

`git diff --name-only origin/main...HEAD` - elenca file cambiati per job condizionali

`last_tag=$(git describe --tags --abbrev=0)` - recupera l'ultimo tag

`count_since=$(git rev-list --count ${last_tag}..HEAD)` - conta i commit dal tag

`echo "${last_tag}+build.${count_since}"` - genera una versione build

`git describe --tags --always --dirty` - genera metadati versione human-friendly

`git submodule add <url> path` - aggiunge un submodule

`git submodule update --init --recursive` - inizializza e aggiorna submodule

`git submodule sync --recursive` - sincronizza URL dei submodule

`git sparse-checkout init --cone` - abilita sparse checkout

`git sparse-checkout set path/solo-necessario` - scarica solo i percorsi necessari

`git worktree add ../build-wt <branch>` - crea una working tree separata

`git worktree remove ../build-wt` - rimuove la working tree separata

`git config --global commit.gpgsign true` - abilita firma automatica dei commit

`git tag -s v1.2.3 -m "release firmata"` - crea un tag firmato

`GIT_TRACE=1 GIT_CURL_VERBOSE=1 git fetch` - abilita trace e debug rete

`git clean -fdx` - pulizia completa di file non tracciati (attenzione)

`git merge --ff-only` - evita merge commit non previsti

`git fetch origin "+refs/heads/release/*:refs/remotes/origin/release/*"` - fetch selettivo con refspec

`git checkout <tag|hash>` - recupera stato da tag o commit specifico

`git bisect run ./test.sh` - automatizza il bisect con script di test

`git lfs install` - inizializza Git LFS

`git lfs track "*.bin"` - traccia file grandi con LFS

`git add .gitattributes` - aggiunge le regole LFS

`git clone --mirror <url>` - crea mirror bare del repository

`git remote add --mirror=push backup <url-backup>` - configura push mirror verso backup

`git remote prune origin` - rimuove riferimenti remoti non più esistenti

`git rev-parse HEAD > .git/ci-build-hash` - salva hash commit per chiavi cache

`git fetch origin main && git merge-base --is-ancestor origin/main HEAD || exit 1` - verifica branch aggiornato in CI

`git log --pretty=format:"* %h %s (%an)" <from>..<to>` - genera changelog tra due ref

`git log --oneline -- <path/>` - filtra i commit per cartella

`git verify-commit <hash>` - valida firma di un commit

`git verify-tag <tag>` - valida firma di un tag


### 17. Git hooks per automazioni locali

`pre-commit` - esegue lint o test veloci prima del commit

`commit-msg` - valida il formato del messaggio di commit

`pre-push` - esegue test o build rapida prima del push

`#!/usr/bin/env bash` - shebang tipico per script hook

`msg_file="$1"` - legge il file del messaggio commit

`msg=$(head -n1 "$msg_file")` - estrae la prima riga del messaggio

`if ! echo "$msg" | grep -Eq '^(feat|fix|docs|style|refactor|perf|test|chore)(\(.+\))?!?: .+'; then ... fi` - valida Conventional Commits


### Note di sicurezza

`git push --force-with-lease` - preferiscilo a `git push --force` su branch condivisi

`git clean -fdx` - verifica sempre prima cosa verrà eliminato

`branch protection` - proteggi i branch principali e richiedi CI verde


### Riferimenti utili

`https://git-scm.com/docs` - documentazione ufficiale Git

`https://git-scm.com/book` - libro Pro Git (gratuito)
