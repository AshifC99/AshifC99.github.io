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

>```
>```

### 2. Creazione e clonazione 

`git init` - inizializzare una nuova repository git

`git clone <url>` - clonare una repository remota sulla macchina locale

`git clone --depth 1 <url>`

### 3.

### 4.

### 5. 

### 6.

### 7.

Indice
------
1) Configurazione iniziale
2) Creazione e clonazione
3) Stato e ispezione
4) Aggiunta e commit
5) Branching
6) Checkout & Switch
7) Merge & Rebase
8) Remote
9) Push & Pull
10) Stash
11) Tag
12) Pulizia e manutenzione
13) Comandi avanzati
14) Troubleshooting e recovery
15) Workflow e best practice
16) Comandi e pattern avanzati per DevOps / CI/CD
17) Ganci (Git hooks) per automazioni locali

-------------------------------------------------
1) Configurazione iniziale
-------------------------------------------------
# Imposta identità globale
`git config --global user.name "Tuo Nome"`
`git config --global user.email "tu@email.com"`

# Editor e opzioni qualità della vita
`git config --global core.editor "code --wait"`          # VS Code
`git config --global init.defaultBranch main`             # ramo predefinito

# Alias utili
`git config --global alias.st "status -sb"`
`git config --global alias.lg "log --oneline --graph --decorate --all"`

# Verifica configurazione
`git config --list`

-------------------------------------------------
2) Creazione e clonazione
-------------------------------------------------
`git init`                                            # Inizializza repository
`git clone <url>`                                     # Clona completo
`git clone --depth 1 <url>`                           # Clona superficiale (shallow)
`git clone --single-branch -b <branch> <url>`         # Solo un ramo specifico

-------------------------------------------------
3) Stato e ispezione
-------------------------------------------------
`git status`                                          # Stato working tree
`git log`                                             # Cronologia completa
`git log --oneline`                                   # Compatta
`git log --graph --decorate --all`                    # Vista grafo
`git show <commit>`                                   # Dettaglio commit
`git diff`                                            # Differenze non indicizzate
`git diff --staged`                                   # Differenze staged

-------------------------------------------------
4) Aggiunta e commit
-------------------------------------------------
git add <file>                                      # Aggiunge un file
git add .                                           # Aggiunge tutto
git add -p                                          # Add interattivo (patch)
git commit -m "Messaggio"                           # Commit semplice
git commit --amend                                  # Modifica ultimo commit
git reset <file>                                    # Toglie file dallo stage
git reset --soft HEAD~1                             # Torna indietro mantenendo changes
git reset --hard HEAD~1                             # Torna indietro perdendo changes

-------------------------------------------------
5) Branching
-------------------------------------------------
git branch                                          # Elenco rami locali
git branch <nome>                                   # Crea ramo
git branch -d <nome>                                # Elimina ramo se mergiato
git branch -D <nome>                                # Forza eliminazione
git branch -m <nuovo_nome>                          # Rinomina ramo

-------------------------------------------------
6) Checkout & Switch
-------------------------------------------------
git checkout <branch>                               # Cambia ramo (storico)
git checkout -b <nuovo_branch>                      # Crea e cambia
git switch <branch>                                 # Cambia ramo (moderno)
git switch -c <nuovo_branch>                        # Crea e cambia (moderno)

-------------------------------------------------
7) Merge & Rebase
-------------------------------------------------
git merge <branch>                                  # Merge
git merge --no-ff <branch>                          # Merge con commit esplicito
git rebase <branch>                                 # Rebase lineare
git rebase -i <base>                                # Rebase interattivo
git rebase --abort                                  # Annulla rebase
git rebase --continue                               # Continua rebase

-------------------------------------------------
8) Remote
-------------------------------------------------
git remote -v                                       # Lista remoti
git remote add origin <url>                         # Aggiungi remoto
git remote remove origin                            # Rimuovi remoto
git remote rename origin upstream                   # Rinomina remoto

-------------------------------------------------
9) Push & Pull
-------------------------------------------------
git push                                            # Push default
git push -u origin <branch>                         # Imposta upstream
git push --force-with-lease                         # Force push sicuro
git pull                                            # Fetch + merge
git pull --rebase                                   # Fetch + rebase

-------------------------------------------------
10) Stash
-------------------------------------------------
git stash                                           # Stash rapido
git stash push -m "msg"                             # Stash con messaggio
git stash list                                      # Elenca stashes
git stash apply [stash@{n}]                         # Applica senza rimuovere
git stash pop [stash@{n}]                           # Applica e rimuove
git stash drop [stash@{n}]                          # Rimuove uno stash
git stash clear                                     # Pulisce tutti gli stash

-------------------------------------------------
11) Tag
-------------------------------------------------
git tag                                             # Elenco tag
git tag <nome>                                      # Tag leggero
git tag -a <nome> -m "msg"                          # Tag annotato
git push --tags                                     # Push di tutti i tag
git tag -d <nome>                                   # Elimina tag locale
git push origin :refs/tags/<nome>                   # Elimina tag remoto

-------------------------------------------------
12) Pulizia e manutenzione
-------------------------------------------------
git clean -n                                        # Dry-run dei file non tracciati
git clean -fd                                       # Rimuove file/dir untracked
git prune                                           # Rimuove oggetti orfani
git gc                                              # Garbage collection

-------------------------------------------------
13) Comandi avanzati
-------------------------------------------------
git reflog                                          # Cronologia movimenti HEAD
git cherry-pick <commit>                            # Porta commit altrove
git bisect start                                    # Binary search dei bug
git bisect good                                     # Marca commit buono
git bisect bad                                      # Marca commit cattivo
git blame <file>                                    # Autori per riga
git rev-parse HEAD                                  # Hash HEAD
git shortlog                                        # Riassunto per autore
git archive -o out.zip HEAD                         # Esporta snapshot

-------------------------------------------------
14) Troubleshooting e recovery
-------------------------------------------------
# Recupero
git reflog                                          # Trova hash persi
git reset --hard <hash>                             # Torna ad uno stato noto

# Conflitti
git merge --abort                                   # Annulla un merge in corso
git rebase --abort                                  # Annulla un rebase in corso

# Rami divergenti
git pull --rebase --autostash                       # Allinea in modo pulito

-------------------------------------------------
15) Workflow e best practice
-------------------------------------------------
# Commit atomici e messaggi significativi
# Convenzioni: tipo(scope)!: descrizione (es. Conventional Commits)

# Branching
feature/<nome>, fix/<ticket>, hotfix/<ticket>, release/<versione>

# Proteggi main/default
# - Abilita branch protection rules sul remoto
# - Richiedi PR + review + build CI verde

-------------------------------------------------
16) Comandi e pattern avanzati per DevOps / CI/CD
-------------------------------------------------
# 16.1 Clonazioni efficienti per pipeline
git clone --depth 1 <url>                           # riduce tempo e banda
git fetch --depth=1 origin <branch>                 # fetch superficiale
git fetch --prune --tags                            # allinea tag e rimuove rami remoti eliminati

# 16.2 Checkout deterministico
git checkout --force <hash>                         # build riproducibili per commit

# 16.3 Selezione diff per job condizionali
# (utile in pipeline per eseguire solo test affetti)
git diff --name-only origin/main...HEAD             # lista file cambiati nel PR

# 16.4 Calcolo versione semantica da tag
last_tag=$(git describe --tags --abbrev=0)          # ultimo tag
count_since=$(git rev-list --count ${last_tag}..HEAD)
echo "${last_tag}+build.${count_since}"             # esempio di versione build

# 16.5 Annotare build metadata
git describe --tags --always --dirty                # stringa versione human-friendly

# 16.6 Gestione submodules (monorepo / componenti)
git submodule add <url> path                        # aggiungi submodule
git submodule update --init --recursive             # inizializza/aggiorna
git submodule sync --recursive                      # sincronizza url remoti

# 16.7 Sparse checkout per repo grandi
git sparse-checkout init --cone
git sparse-checkout set path/solo-necessario        # checkout parziale

# 16.8 Git Worktree per build parallele
git worktree add ../build-wt <branch>               # crea working tree separato
git worktree remove ../build-wt                     # rimuove worktree

# 16.9 Firmare commit/tag (supply chain)
git config --global commit.gpgsign true             # firma commit
git tag -s v1.2.3 -m "release firmata"              # tag firmato

# 16.10 Trace e debug di performance in CI
GIT_TRACE=1 GIT_CURL_VERBOSE=1 git fetch            # diagnostica rete

# 16.11 Pulizia cache CI tra job
git clean -fdx                                      # rimuove TUTTO non tracciato (attenzione)

# 16.12 Strategie di merge protette
git merge --ff-only                                 # evita merge commit inattesi

# 16.13 Refspec per fetch selettivi
git fetch origin "+refs/heads/release/*:refs/remotes/origin/release/*"

# 16.14 Recupero artefatti su commit specifici
git checkout <tag|hash>                             # ricostruzione da tag/commit

# 16.15 Bisect automatizzato in CI
# Esempio: script che ritorna 0/1 per buono/cattivo
# git bisect start; git bisect bad; git bisect good <hash_buono>; git bisect run ./test.sh

# 16.16 Strategie per versioning automatico
# - Conventional Commits + changelog generato
# - git rev-list --count <tag>..HEAD per build number
# - git describe per pre-release

# 16.17 Gestione LFS (Large File Storage)
git lfs install
git lfs track "*.bin"                               # traccia file grandi
git add .gitattributes

# 16.18 Mirror repository (backup/DR)
git clone --mirror <url>                            # mirror bare
git remote add --mirror=push backup <url-backup>    # push speculare

# 16.19 Pulizia riferimenti obsoleti in runner
git remote prune origin                             # rimuove rami remoti rimossi

# 16.20 Cache di dipendenze guidata da hash
git rev-parse HEAD > .git/ci-build-hash            # salva hash per cache key

# 16.21 Rebase/merge policy in CI
# - fallire il job se il branch non è aggiornato con la base
#   git fetch origin main && git merge-base --is-ancestor origin/main HEAD || exit 1

# 16.22 Generare changelog tra due ref
git log --pretty=format:"* %h %s (%an)" <from>..<to>

# 16.23 Filtrare commit per cartella (monorepo)
git log --oneline -- <path/>

# 16.24 Validare firme in CI (SLSA/SSDF)
git verify-commit <hash>
git verify-tag <tag>

# 16.25 Evitare file secrets nel repo
# - usa .gitignore e secret scan (git secrets / trufflehog)

-------------------------------------------------
17) Ganci (Git hooks) per automazioni locali
-------------------------------------------------
# I ganci si trovano in .git/hooks/. Esempi:
# - pre-commit: lint/test veloci prima del commit
# - commit-msg: valida formato dei messaggi
# - pre-push: esegue test o build rapida

# Esempio commit-msg (Conventional Commits):
# .git/hooks/commit-msg (ricorda chmod +x)
#
# #!/usr/bin/env bash
# msg_file="$1"
# msg=$(head -n1 "$msg_file")
# if ! echo "$msg" | grep -Eq '^(feat|fix|docs|style|refactor|perf|test|chore)(\(.+\))?!?: .+'; then
#   echo "Messaggio commit non conforme a Conventional Commits" >&2
#   exit 1
# fi

Note di sicurezza
-----------------
- Evita "git push --force" su rami condivisi; preferisci "--force-with-lease".
- Verifica sempre cosa verrà eliminato prima di usare "git clean -fdx".
- Proteggi i rami principali con regole sul remoto e richiedi CI verde.

Riferimenti utili
-----------------
- Documentazione ufficiale Git: https://git-scm.com/docs
- Pro Git (libro gratuito): https://git-scm.com/book
