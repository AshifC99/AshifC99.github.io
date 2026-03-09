---
title: "C# per principianti: sintassi essenziale e concetti moderni"
description: "Una guida pratica al C# e a .NET: dalla struttura base alle property, passando per LINQ e la programmazione asincrona (async/await)."
date: 2026-03-02
author: "Ashif"
tags: ["csharp", "dotnet", "c#", "programming", "cheatsheet", "developer"]
---

# C# per principianti: concetti essenziali per iniziare

C# (C-Sharp) è un linguaggio moderno, orientato agli oggetti e type-safe, sviluppato da Microsoft. Insieme alla piattaforma .NET, è ampiamente utilizzato per sviluppare applicazioni web (ASP.NET), desktop, mobile e videogiochi (tramite Unity).

Ecco un cheatsheet pratico per orientarsi tra i concetti base e le funzionalità moderne di C#.

### 1. Struttura base (Top-Level Statements)

In C# moderno (dal 9 in poi), non è più necessario scrivere tutto il noioso codice di base (`class Program`, `static void Main`) per i programmi semplici. Il compilatore lo genera per te.

```csharp
using System;

Console.WriteLine("Ciao, Mondo!");
```

- `using System;` = include i tipi di base, come `Console`.
- `Console.WriteLine` = stampa una riga di testo sulla console e va a capo.

### 2. Variabili, Tipi e Inferenza

C# è fortemente tipizzato, ma permette di usare `var` per far dedurre il tipo al compilatore quando è ovvio dal contesto.

```csharp
int eta = 25;                  // Intero
double prezzo = 19.99;         // Virgola mobile a 64 bit
decimal saldo = 100.50m;       // Ottimo per dati finanziari (m sta per money/decimal)
bool isAttivo = true;          // Booleano
string nome = "Ashif";         // Stringa
char iniziale = 'A';           // Singolo carattere

// Inferenza del tipo: il compilatore sa che 'saluto' è una stringa
var saluto = "Buongiorno!"; 

// Interpolazione di stringhe (metti il simbolo $ prima delle virgolette)
Console.WriteLine($"Il mio nome è {nome} e ho {eta} anni.");
```

### 3. Input e Array / Liste

Le `List<T>` sono l'equivalente dei `vector` in C++ o delle liste di Python: array dinamici che possono crescere in dimensione.

```csharp
using System;
using System.Collections.Generic;

Console.Write("Inserisci il tuo nome: ");
string input = Console.ReadLine(); // Legge dalla tastiera

// Lista dinamica di stringhe
List<string> linguaggi = new List<string> { "C#", "C++", "JavaScript" };
linguaggi.Add("Python");

foreach (var lang in linguaggi)
{
    Console.WriteLine(lang);
}
```

### 4. Strutture di Controllo e Pattern Matching

Oltre al classico `if/else`, C# offre un potente `switch` che, nelle versioni moderne, supporta il pattern matching avanzato.

```csharp
int codice = 404;

// Switch statement classico:
switch (codice)
{
    case 200:
        Console.WriteLine("OK");
        break;
    case 404:
        Console.WriteLine("Not Found");
        break;
    default:
        Console.WriteLine("Errore sconosciuto");
        break;
}

// Switch Expression (più conciso, C# 8+):
string messaggio = codice switch
{
    200 => "Tutto ok",
    400 or 401 or 404 => "Errore client", // Logical pattern matching (C# 9+)
    >= 500 => "Errore server",            // Relational pattern matching (C# 9+)
    _ => "Codice non gestito"             // Default (discard)
};
```

### 5. Classi e OOP (Properties)

C# rende la programmazione ad oggetti molto elegante grazie alle **Properties** (proprietà), che sostituiscono i verbi `get`/`set` tipici di Java o C++.

```csharp
public class Persona
{
    // Property: sembra una variabile pubblica, ma nasconde getter e setter!
    public string Nome { get; set; }
    
    // Auto-property init-only (può essere impostata solo alla creazione)
    public int Eta { get; init; }

    // Costruttore
    public Persona(string nome, int eta)
    {
        Nome = nome;
        Eta = eta;
    }

    public void Saluta()
    {
        Console.WriteLine($"Ciao, sono {Nome} e ho {Eta} anni.");
    }
}

// Utilizzo:
Persona p = new Persona("Ashif", 25);
// Oppure tramite Object Initializer (richiede costruttore vuoto o parametri opzionali):
Persona p2 = new Persona { Nome = "Mario", Eta = 30 };
```

### 6. Records (C# 9+)

I record sono un tipo speciale orientato ai **dati immutabili**. Ideali per DTO (Data Transfer Objects), risposte API o modelli che non devono cambiare stato.

```csharp
// Un record genera automaticamente costruttore, proprietà init-only, 
// e metodi per confrontare i valori invece delle reference!
public record Prodotto(string Nome, decimal Prezzo);

var p1 = new Prodotto("Laptop", 1200.00m);
var p2 = new Prodotto("Laptop", 1200.00m);

Console.WriteLine(p1 == p2); // True! In una class normale sarebbe False.

// Modifica non distruttiva (crea una copia con un valore diverso)
var p3 = p1 with { Prezzo = 999.00m };
```

### 7. LINQ (Language Integrated Query)

LINQ è forse la feature più amata del C#. Permette di manipolare collezioni di dati usando una sintassi funzionale dichiarativa (simile a SQL o ai metodi `.map()`/`.filter()` di JavaScript).

```csharp
using System.Linq;
using System.Collections.Generic;

List<int> numeri = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// Filtrare i numeri pari e moltiplicarli per 10
var risultati = numeri
    .Where(n => n % 2 == 0) // Lambda espressione per filtrare
    .Select(n => n * 10)    // Trasformazione del dato
    .ToList();              // Esecuzione immediata e conversione in lista

// risultati conterrà: [20, 40, 60, 80, 100]
```

### 8. Programmazione Asincrona (async / await)

In C# gestire operazioni lente (come chiamate di rete o I/O su disco) è facilissimo e non blocca il thread principale dell'applicazione.

```csharp
using System.Net.Http;
using System.Threading.Tasks;

// Il metodo è marcato come 'async' e restituisce un 'Task'
async Task<string> ScaricaTestoAsync(string url)
{
    using HttpClient client = new HttpClient(); // 'using' chiude/dispose in automatico
    
    // 'await' sospende l'esecuzione finché il download non è completato, 
    // liberando il thread nel frattempo!
    string contenuto = await client.GetStringAsync(url);
    
    return contenuto;
}

// Utilizzo (in top-level statements o in un altro metodo async):
string esito = await ScaricaTestoAsync("https://example.com");
Console.WriteLine($"Scaricati {esito.Length} caratteri.");
```

---

Con queste basi (Properties, LINQ, e task asincroni) sei già pronto per iniziare a sviluppare applicazioni serie, sia che si tratti di un backend web con ASP.NET Core, sia di un gioco con Unity!
