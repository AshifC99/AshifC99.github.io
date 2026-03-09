---
title: "C++ Avanzato: Move Semantics, Template e Concurrency"
description: "Guida rapida ai concetti avanzati del C++ moderno (C++11/14/17/20): RAII, costruttori di spostamento, lambda expression e multithreading."
date: 2026-03-02
author: "Ashif"
tags: ["cpp", "c++", "advanced", "programming", "cheatsheet", "architecture"]
---

# C++ Avanzato: concetti del C++ moderno (C++11 in poi)

Mentre il C++ di base ti permette di scrivere programmi procedurali e orientati agli oggetti classici, il **C++ moderno** (da C++11 fino a C++20/C++23) ha rivoluzionato il linguaggio concentrandosi su performance, sicurezza della memoria e programmazione dichiarativa.

Ecco un cheatsheet dei costrutti avanzati più importanti da conoscere.

### 1. RAII (Resource Acquisition Is Initialization)

È il pattern architetturale più importante in C++. La gestione delle risorse (memoria, file, lock) è legata al ciclo di vita di un oggetto: quando l'oggetto esce dallo scope, il suo distruttore libera automaticamente la risorsa.

```cpp
#include <iostream>
#include <fstream>

class FileWrapper {
private:
    std::ofstream file;
public:
    FileWrapper(const std::string& filename) {
        file.open(filename);
        std::cout << "File aperto.\n";
    }
    ~FileWrapper() {
        if (file.is_open()) file.close();
        std::cout << "File chiuso automaticamente.\n"; // Chiamato anche in caso di eccezioni
    }
};

void elabora() {
    FileWrapper fw("test.txt");
    // Lavora con il file...
    // Non devi ricordarti di chiamare fw.close()!
} // <- Qui fw viene distrutto e il file viene chiuso
```

### 2. Move Semantics ed Rvalue References (`&&`)

Prima del C++11, passare o restituire oggetti pesanti richiedeva copie costose in termini di CPU e memoria. La "move semantics" prende in prestito (o "ruba") le risorse da oggetti temporanei invece di copiarle.

```cpp
#include <iostream>
#include <string>
#include <vector>

void processaTesto(std::string&& testoTemporaneo) { // && indica una rvalue reference
    std::cout << "Ricevuto: " << testoTemporaneo << "\n";
}

int main() {
    std::string testoBase = "Ciao";
    
    // Copy (normale):
    std::string testoCopia = testoBase; 
    
    // Move: Evita un'allocazione di memoria
    std::string testoSpostato = std::move(testoBase);
    
    // Ora 'testoBase' è vuoto/in uno stato di validità ma non specificato!
    std::cout << "Testo base ora è: [" << testoBase << "]\n"; // Stamperà stringa vuota
    
    // Utilizzo di una rvalue reference per oggetti temporanei ("in-place")
    processaTesto(std::string("Stringa creata al volo")); 
    
    return 0;
}
```

### 3. Smart Pointers (Gestione della Memoria)

Niente più `new` e `delete` diretti. Usa le librerie di `<memory>`.

- **`std::unique_ptr`**: Puntatore con possesso esclusivo. Non clonabile, ma può essere "mosso" (move semantics). Zero overhead rispetto a un puntatore grezzo.
- **`std::shared_ptr`**: Puntatore con possesso condiviso tramite *reference counting*. L'oggetto viene distrutto quado l'ultimo shared_ptr viene deallocato.

```cpp
#include <memory>
#include <iostream>

class Risorsa {
public:
    Risorsa() { std::cout << "Risorsa allocata!\n"; }
    ~Risorsa() { std::cout << "Risorsa distrutta!\n"; }
};

int main() {
    {
        // Allocazione sicura senza "new"
        std::unique_ptr<Risorsa> res1 = std::make_unique<Risorsa>();
        
        // Siccome è unique_ptr, se vogliamo passarlo a res2 dobbiamo "trasferirne" la proprietà
        std::unique_ptr<Risorsa> res2 = std::move(res1); 
        
        // std::cout << (res1 == nullptr) << "\n"; // Vero, res1 è ormai nullo
    } // <- res2 esce dallo scope, distruttore chiamato automaticamente, zero leak!
    
    return 0;
}
```

### 4. Lambdas e `std::function`

Espressioni lambda per funzioni anonime in-line. Fondamentali insieme agli algoritmi della STL (Standard Template Library).

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numeri = {5, 2, 8, 1, 9};

    // Sintassi base: [capture_list](parametri) -> return_type { corpo }
    int moltiplicatore = 3;

    // Catturiamo 'moltiplicatore' dallo scope per valore (usare [&] per prenderlo per riferimento)
    std::for_each(numeri.begin(), numeri.end(), [moltiplicatore](int n) {
        std::cout << n * moltiplicatore << " ";
    });
    
    std::cout << "\n";
    
    // Utilizzo delle lambda per l'ordinamento avanzato (C++14: parametri di tipo auto)
    std::sort(numeri.begin(), numeri.end(), [](auto a, auto b) {
        return a > b; // Ordine decrescente
    });

    return 0;
}
```

### 5. Template e Meta-Programmazione

I template permettono di scrivere programmi generici non legati a un tipo particolare. Vengono risolti a **tempo di compilazione** (zero cost abstraction).

```cpp
#include <iostream>

// Template per una funzione "Generica"
template <typename T>
T massimo(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    std::cout << massimo<int>(10, 20) << "\n";       // Output: 20
    std::cout << massimo<double>(3.14, 2.71) << "\n"; // Output: 3.14
    
    // In C++ moderno il tipo T viene dedotto automaticamente
    std::cout << massimo('Z', 'A') << "\n";           // Output: Z
    
    return 0;
}
```

### 6. Multithreading e Concurrency

Con C++11, il multithreading è parte della standard library. Non servono più API dipendenti dal sistema operativo (come pthreads).

```cpp
#include <iostream>
#include <thread>
#include <mutex>
#include <vector>

std::mutex mtx; // Sincronizzazione per evitare "data races"

void worker(int id) {
    // std::lock_guard acquisisce il lock all'inizio e lo rilascia
    // automaticamente alla fine dello scope (RAII in azione!)
    std::lock_guard<std::mutex> lock(mtx);
    std::cout << "Thread " << id << " al lavoro!\n";
}

int main() {
    std::vector<std::thread> threadList;

    // Crea e avvia 5 threads
    for (int i = 0; i < 5; ++i) {
        threadList.push_back(std::thread(worker, i));
    }

    // Il thread principale aspetta (join) che tutti gli altri finiscano
    for (auto& t : threadList) {
        if (t.joinable()) {
            t.join();
        }
    }

    std::cout << "Lavoro asincrono completato.\n";
    return 0;
}
```

### 7. Optional e Variant (C++17)

Sostitutivi moderni e null-safe dei pointer e delle union, ispirati a linguaggi funzionali come Rust o Haskell.

- **`std::optional`**: rappresenta un valore che *potrebbe* non esserci (utile invece di ritornare puntatori nulli).
- **`std::variant`**: un tipo *type-safe* che può mantenere uno e un solo valore scelto tra un gruppo di tipi possibili.

```cpp
#include <iostream>
#include <optional>
#include <variant>

// Funzione che potrebbe non trovare il risultato
std::optional<int> cerca(bool trova) {
    if (trova) return 42;
    return std::nullopt; // equivalente moderno a tornare NULL/nullptr
}

int main() {
    auto ris = cerca(true);
    if (ris.has_value()) {
        std::cout << "Trovato: " << ris.value() << "\n";
    }
    
    // Variant (Type safe union)
    std::variant<int, std::string> var;
    var = "Ciao mondo";
    std::cout << "Testo var: " << std::get<std::string>(var) << "\n";
    
    var = 100;
    std::cout << "Numero var: " << std::get<int>(var) << "\n";

    return 0;
}
```

---

Padroneggiare queste funzionalità (insieme a **Concepts** introdotti in C++20 e ai **Modules**) segna lo spartiacque tra chi si limita a scrivere "C compilato col compilatore C++" e un vero sviluppatore C++ moderno ad alte prestazioni!
