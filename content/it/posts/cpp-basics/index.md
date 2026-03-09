---
title: "C++ per principianti: concetti essenziali e sintassi base"
description: "Una guida pratica al C++: dalla struttura base alle classi, puntatori e Standard Template Library (STL)."
date: 2026-03-02
author: "Ashif"
tags: ["cpp", "c++", "programming", "cheatsheet", "developer"]
---

# C++ per principianti: concetti essenziali per iniziare

Il C++ è un linguaggio potente e flessibile, ampiamente usato per sistemi ad alte prestazioni, videogiochi e applicazioni embedded. 

Sotto trovi una lista pratica (stile cheatsheet) dei concetti e costrutti più utili per orientarsi in C++.

### 1. Struttura base di un programma

```cpp
#include <iostream>

int main() {
    std::cout << "Ciao, Mondo!" << std::endl;
    return 0;
}
```

- `#include <iostream>` = include la libreria standard per input/output.
- `int main()` = il punto di ingresso (entry point) di ogni programma C++.
- `std::cout` = usato per stampare output su schermo.
- `std::endl` = va a capo e svuota il buffer (flush).

### 2. Variabili e tipi di dati

```cpp
int eta = 25;                  // Numero intero
double pigreco = 3.14159;      // Numero a virgola mobile a doppia precisione
char iniziale = 'A';           // Singolo carattere
bool isAttivo = true;          // Booleano (true/false)
std::string nome = "Ashif";    // Stringa di testo (richiede <string>)
```

> Tip: usa `auto` se vuoi che il compilatore deduca il tipo automaticamente (es: `auto numero = 42;`).

### 3. Input e Output

```cpp
#include <iostream>
#include <string>

int main() {
    std::string nome;
    std::cout << "Inserisci il tuo nome: ";
    std::cin >> nome; // Legge l'input dall'utente
    std::cout << "Benvenuto, " << nome << "!\n";
    return 0;
}
```

### 4. Strutture di controllo

**If / Else:**
```cpp
if (eta >= 18) {
    std::cout << "Maggiorenne";
} else {
    std::cout << "Minorenne";
}
```

**Ciclo For:**
```cpp
for (int i = 0; i < 5; i++) {
    std::cout << i << " ";
}
```

**Ciclo While:**
```cpp
int count = 0;
while (count < 3) {
    std::cout << "Ciao ";
    count++;
}
```

### 5. Funzioni

```cpp
// Dichiarazione e definizione
int somma(int a, int b) {
    return a + b;
}

int main() {
    int risultato = somma(5, 3);
    std::cout << risultato;
    return 0;
}
```

### 6. Array e Vector (STL)

Gli array tradizionali hanno una dimensione fissa, mentre `std::vector` (dalla Standard Template Library) è dinamico ed è molto più usato in C++ moderno.

```cpp
#include <vector>
#include <iostream>

std::vector<int> numeri = {1, 2, 3};
numeri.push_back(4); // Aggiunge 4 alla fine

for (int n : numeri) { // Range-based for loop
    std::cout << n << "\n";
}
```

### 7. Puntatori e Referenze

I puntatori memorizzano l'indirizzo di memoria di un'altra variabile. Le referenze sono alias per variabili esistenti.

```cpp
int valore = 10;
int& ref = valore;       // ref è una referenza a valore
int* ptr = &valore;      // ptr memorizza l'indirizzo di valore

std::cout << "Valore: " << valore << "\n";
std::cout << "Tramite referenza: " << ref << "\n";
std::cout << "Indirizzo: " << ptr << "\n";
std::cout << "Valore puntato: " << *ptr << "\n"; // Dereferenziazione
```

### 8. Classi e Oggetti (OOP)

Il C++ supporta pienamente la programmazione orientata agli oggetti.

```cpp
#include <iostream>
#include <string>

class Persona {
private:
    std::string nome;
    int eta;

public:
    // Costruttore
    Persona(std::string n, int e) : nome(n), eta(e) {}

    // Metodo
    void saluta() {
        std::cout << "Ciao, sono " << nome << " e ho " << eta << " anni.\n";
    }
};

int main() {
    Persona p("Ashif", 25);
    p.saluta();
    return 0;
}
```

### 9. Gestione della memoria (Smart Pointers)

In C++ moderno (C++11 in poi), evita `new` e `delete` diretti se possibile. Usa gli smart pointer per prevenire memory leak.

```cpp
#include <memory>

// std::unique_ptr possiede in modo esclusivo l'oggetto
std::unique_ptr<int> ptrUnico = std::make_unique<int>(100);

// std::shared_ptr permette proprietà condivisa
std::shared_ptr<int> ptrCondiviso = std::make_shared<int>(200);
```

---

Imparare il C++ richiede costanza, ma ti darà un controllo eccezionale sull'hardware e la possibilità di scrivere software dalle massime prestazioni. Buona programmazione!
