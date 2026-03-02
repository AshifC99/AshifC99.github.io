---
title: "JavaScript per principianti: guida pratica al linguaggio del web"
description: "Dalle basi della manipolazione del DOM a ES6+, Promise e Fetch API. Un cheatsheet essenziale per padroneggiare JavaScript moderno."
date: 2026-03-02
author: "Ashif"
tags: ["javascript", "js", "webdev", "frontend", "cheatsheet", "es6"]
---

# JavaScript moderno: concetti essenziali per il Web

JavaScript (JS) è il linguaggio di programmazione che rende interattivi i siti web. Con l'avvento di Node.js, è diventato fondamentale anche per lo sviluppo backend.

Ecco una guida rapida ai concetti base e alle funzionalità moderne (da ES6 in poi) che devi assolutamente conoscere.

### 1. Variabili e Scope (`let` e `const`)

Dimentica `var` (è obsoleto e causa bug di scoping). In JS moderno si usano solo `let` e `const`.

```javascript
const nome = "Ashif";     // Costante: non può essere riassegnata
let eta = 25;             // Variabile mutabile (scoping a blocchi locale)

// Interpolazione di stringhe (Template Literals) usando i backtick ``
console.log(`Ciao, mi chiamo ${nome} e ho ${eta} anni.`);

// Tipi di dato base
const isAttivo = true;          // Boolean
const prezzo = 19.99;           // Number (nessuna distinzione tra int e float)
let indirizzo;                  // Undefined (dichiarata ma non inizializzata)
const valoreVuoto = null;       // Null (assenza intenzionale di valore)
```

### 2. Funzioni (tradizionali e Arrow Functions)

Le funzioni freccia (Arrow Functions) sono più concise e non creano un proprio contesto per la keyword `this` (molto utile in frontend/React).

```javascript
// Funzione classica
function salutaClassico(nome) {
    return `Ciao ${nome}`;
}

// Arrow Function (concisa)
const salutaArrow = (nome) => {
    return `Ciao ${nome}`;
};

// Arrow Function ultra-concisa (ritorno implicito se c'è una sola espressione)
const raddoppia = n => n * 2;

console.log(raddoppia(5)); // 10
```

### 3. Oggetti e Destrutturazione (Destructuring)

Gli oggetti in JS sono insiemi di coppie chiave-valore. La destrutturazione permette di estrarre comodamente queste proprietà.

```javascript
const utente = {
    username: "ashif_dev",
    ruolo: "Admin",
    saluta() {
        console.log(`Ciao da ${this.username}`);
    }
};

// Accesso alle proprietà
console.log(utente.username); // "ashif_dev"
utente.saluta();

// Destrutturazione (estrazione rapida in variabili)
const { username, ruolo } = utente;
console.log(ruolo); // "Admin"

// Parametri destrutturati nelle funzioni (molto comune in React)
const mostraProfilo = ({ username, ruolo }) => {
    console.log(`Profilo: ${username} (${ruolo})`);
}
```

### 4. Array e Metodi Funzionali

JS offre metodi potentissimi per manipolare gli array senza usare il vecchio ciclo `for`.

```javascript
const numeri = [1, 2, 3, 4, 5];

// Aggiungere/rimuovere
numeri.push(6);     // Aggiunge alla fine
numeri.pop();       // Rimuove dall'ultimo

// 1. Array.map(): Trasforma ogni elemento e ritorna un NUOVO array
const raddoppiati = numeri.map(num => num * 2);
// [2, 4, 6, 8, 10]

// 2. Array.filter(): Filtra gli elementi che rispettano la condizione
const pari = numeri.filter(num => num % 2 === 0);
// [2, 4]

// 3. Array.find(): Trova il PRIMO elemento che rispetta la condizione
const primoMaggioreDiTre = numeri.find(num => num > 3);
// 4
```

### 5. Spread e Rest Operator (`...`)

I tre puntini (`...`) in JS sono "magici". Possono *espandere* (spread) un array/oggetto o *raccogliere* (rest) argomenti.

```javascript
// Spread per unire array
const gruppoA = ["Mario", "Luigi"];
const gruppoB = ["Peach", "Toad"];
const tutti = [...gruppoA, ...gruppoB, "Bowser"];

// Spread per clonare e modificare oggetti (senza mutare l'originale)
const configurazione = { tema: "dark", lang: "it" };
const nuovaConfig = { ...configurazione, lang: "en" }; // Sovrascrive lang

// Rest operator per accettare N argomenti
const sommaTutti = (...numeri) => {
    return numeri.reduce((totale, num) => totale + num, 0);
};
console.log(sommaTutti(10, 20, 30)); // 60
```

### 6. Asincronia: Promises e async/await

Le operazioni come fetch di dati, IO su file o timer richiedono tempo. JS non si blocca (non è bloccante) e usa Promise e `async/await` per gestirle.

```javascript
// Esempio finto di chiamata API
const getUtenteDalDatabase = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id === 1) resolve({ id: 1, nome: "Ashif" });
            else reject("Utente non trovato!");
        }, 1000);
    });
};

// Sintassi moderna e pulita (async/await)
const caricaUtente = async () => {
    try {
        console.log("Caricamento in corso...");
        
        // await "mette in pausa" questa funzione finché la Promise non si risolve
        const dati = await getUtenteDalDatabase(1);
        console.log("Dati ricevuti:", dati.nome);
        
    } catch (errore) {
        console.error("Errore:", errore); // Cattura eventuali 'reject'
    }
};

caricaUtente();
```

### 7. Fetch API (Ottenere dati dal web)

Invece del vecchio `XMLHttpRequest` o di importare `axios` (per casi semplici), usa `fetch()`, nativo nei browser e in Node.js recente.

```javascript
const scaricaPost = async () => {
    try {
        const risposta = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        
        // Verifica se lo status code è 2xx
        if (!risposta.ok) throw new Error("Errore di rete");
        
        // Parsing dal formato JSON nativo
        const post = await risposta.json();
        console.log(post.title);
    } catch (err) {
        console.error(err);
    }
}
```

### 8. Il DOM: Manipolare la pagina web (solo base/vanilla JS)

Se lavori su una pagina HTML nuda e cruda (senza React o simili), JS seleziona e modifica gli elementi così:

```javascript
// Seleziona un elemento tramite ID o selettore CSS
const titolo = document.getElementById("main-title");
const bottone = document.querySelector(".btn-submit");

// Cambia testo e stile
titolo.textContent = "Testo aggiornato!";
titolo.style.color = "blue";

// Aggiungi un evento (click, hover, ecc)
bottone.addEventListener("click", (evento) => {
    // evento.preventDefault(); // Utile per bloccare l'invio form di default
    console.log("Bottone cliccato!");
});
```

---

JavaScript è un linguaggio vastissimo con un ecosistema gigantesco (NPM, React, Vue, Node.js). Padroneggiare queste funzionalità moderne ti renderà molto più veloce nell'apprendere qualsiasi suo framework derivato!
