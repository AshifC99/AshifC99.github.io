---
title: "50+ Git Commands"
description: "50+ Git commands that every developer should know"
date: 2026-02-18
author: "Ashif"
tags: ["git", "commands", "cheatsheet"]
---

# Git commands that every developer should know


### 1. Initial Git Configuration

`git config --global user.name "Your Name"` - set global username

`git config --global user.email "you@email.com"` - set global email

`git config --list` - show all configuration values

`git help <command>` - view manual of a command


### 2. Creation and Cloning 

`git init` - initialize a new git repository

`git clone <url>` - clone a remote repository to your local machine

`git clone --depth 1 <url>`


### 3. Status and Inspection

`git status` - show the status of the working tree

`git log` - show the complete commit history

`git log --oneline` - show the history in a compact format

`git log --graph --decorate --all` - show the history with a branch graph

`git show <commit>` - show the details of a commit

`git diff` - show unstaged differences

`git diff --staged` - show already staged differences


### 4. Add and Commit

`git add <file>` - adds a file to the staging area

`git add .` - adds all changes to the staging area

`git add -p` - interactive block-by-block add

`git commit -m "Message"` - creates a commit with a message

`git commit --amend` - modifies the last commit

`git reset <file>` - removes a file from the staging area

`git reset --soft HEAD~1` - undoes the last commit while keeping the changes

`git reset --hard HEAD~1` - undoes the last commit and discards the changes


### 5. Branching

`git branch` - lists local branches

`git branch <name>` - creates a new branch

`git branch -d <name>` - deletes an already merged branch

`git branch -D <name>` - force deletes a branch

`git branch -m <new_name>` - renames the current branch


### 6. Checkout and Switch

`git checkout <branch>` - switch to a branch (classic command)

`git checkout -b <new_branch>` - create and switch to a new branch

`git switch <branch>` - switch to a branch (modern command)

`git switch -c <new_branch>` - create and switch to a new branch (modern)


### 7. Merge and Rebase

`git merge <branch>` - merges a branch into the current branch

`git merge --no-ff <branch>` - merge with explicit commit

`git rebase <branch>` - linearly realigns commits

`git rebase -i <base>` - interactive rebase

`git rebase --abort` - aborts an ongoing rebase

`git rebase --continue` - continues a rebase after resolving conflicts


### 8. Remote

`git remote -v` - shows configured remote repositories

`git remote add origin <url>` - adds a remote repository

`git remote remove origin` - removes a remote

`git remote rename origin upstream` - renames a remote


### 9. Push and Pull

`git push` - sends commits to the default remote

`git push -u origin <branch>` - sets upstream and sends the branch

`git push --force-with-lease` - safer force push

`git pull` - downloads and integrates changes (fetch + merge)

`git pull --rebase` - downloads and integrates changes with rebase


### 10. Stash

`git stash` - temporarily saves uncommitted changes

`git stash push -m "msg"` - saves a stash with a message

`git stash list` - lists available stashes

`git stash apply [stash@{n}]` - applies a stash without removing it

`git stash pop [stash@{n}]` - applies and removes a stash

`git stash drop [stash@{n}]` - drops a specific stash

`git stash clear` - clears all stashes


### 11. Tags

`git tag` - lists tags

`git tag <name>` - creates a lightweight tag

`git tag -a <name> -m "msg"` - creates an annotated tag

`git push --tags` - sends all tags to the remote

`git tag -d <name>` - deletes a local tag

`git push origin :refs/tags/<name>` - deletes a remote tag


### 12. Cleanup and Maintenance

`git clean -n` - preview of untracked files to be removed

`git clean -fd` - removes untracked files and directories

`git prune` - removes orphaned objects

`git gc` - runs garbage collection on the repository


### 13. Advanced Commands

`git reflog` - shows the history of HEAD movements

`git cherry-pick <commit>` - applies a specific commit to another branch

`git bisect start` - starts binary search for a bug

`git bisect good` - marks a commit as good

`git bisect bad` - marks a commit as problematic

`git blame <file>` - shows author and commit for each line

`git rev-parse HEAD` - shows the hash of the current commit

`git shortlog` - summarizes contributions by author

`git archive -o out.zip HEAD` - exports a snapshot of the repository


### 14. Troubleshooting and Recovery

`git reflog` - recovers recent hashes even after a reset or rebase

`git reset --hard <hash>` - reverts to a known state of the repository

`git merge --abort` - aborts an ongoing merge

`git rebase --abort` - aborts an ongoing rebase

`git pull --rebase --autostash` - realigns divergent branches keeping local changes


### 15. Workflow and Best Practices

`Conventional Commits (e.g. feat:, fix:, docs:)` - use consistent and readable commit messages

`feature/<name>, fix/<ticket>, hotfix/<ticket>, release/<version>` - adopt a naming convention for branches

`Branch protection on main/default` - require pull requests, reviews, and green CI


### 16. Advanced Commands for DevOps and CI/CD

`git clone --depth 1 <url>` - fast clone for pipelines

`git fetch --depth=1 origin <branch>` - shallow fetch of the branch

`git fetch --prune --tags` - updates tags and cleans obsolete remote references

`git checkout --force <hash>` - deterministic checkout for reproducible builds

`git diff --name-only origin/main...HEAD` - lists changed files for conditional jobs

`last_tag=$(git describe --tags --abbrev=0)` - gets the last tag

`count_since=$(git rev-list --count ${last_tag}..HEAD)` - counts commits since the tag

`echo "${last_tag}+build.${count_since}"` - generates a build version

`git describe --tags --always --dirty` - generates human-friendly version metadata

`git submodule add <url> path` - adds a submodule

`git submodule update --init --recursive` - initializes and updates submodules

`git submodule sync --recursive` - syncs submodule URLs

`git sparse-checkout init --cone` - enables sparse checkout

`git sparse-checkout set path/only-needed` - downloads only necessary paths

`git worktree add ../build-wt <branch>` - creates a separate working tree

`git worktree remove ../build-wt` - removes the separate working tree

`git config --global commit.gpgsign true` - enables automatic commit signing

`git tag -s v1.2.3 -m "signed release"` - creates a signed tag

`GIT_TRACE=1 GIT_CURL_VERBOSE=1 git fetch` - enables network trace and debug

`git clean -fdx` - full cleanup of untracked files (careful)

`git merge --ff-only` - prevents unexpected merge commits

`git fetch origin "+refs/heads/release/*:refs/remotes/origin/release/*"` - selective fetch with refspec

`git checkout <tag|hash>` - retrieves state from a tag or specific commit

`git bisect run ./test.sh` - automates bisect with a test script

`git lfs install` - initializes Git LFS

`git lfs track "*.bin"` - tracks large files with LFS

`git add .gitattributes` - adds LFS rules

`git clone --mirror <url>` - creates bare mirror of the repository

`git remote add --mirror=push backup <url-backup>` - configures push mirror to backup

`git remote prune origin` - removes remote references that no longer exist

`git rev-parse HEAD > .git/ci-build-hash` - saves commit hash for cache keys

`git fetch origin main && git merge-base --is-ancestor origin/main HEAD || exit 1` - verifies updated branch in CI

`git log --pretty=format:"* %h %s (%an)" <from>..<to>` - generates changelog between two refs

`git log --oneline -- <path/>` - filters commits by folder

`git verify-commit <hash>` - validates signature of a commit

`git verify-tag <tag>` - validates signature of a tag


### 17. Git Hooks for Local Automation

`pre-commit` - runs fast lint or tests before commit

`commit-msg` - validates the commit message format

`pre-push` - runs tests or quick build before push

`#!/usr/bin/env bash` - typical shebang for hook scripts

`msg_file="$1"` - reads the commit message file

`msg=$(head -n1 "$msg_file")` - extracts the first line of the message

`if ! echo "$msg" | grep -Eq '^(feat|fix|docs|style|refactor|perf|test|chore)(\(.+\))?!?: .+'; then ... fi` - validates Conventional Commits


### Security Notes

`git push --force-with-lease` - prefer it to `git push --force` on shared branches

`git clean -fdx` - always check first what will be deleted

`branch protection` - protect primary branches and require green CI


### Useful References

`https://git-scm.com/docs` - official Git documentation

`https://git-scm.com/book` - Pro Git book (free)
