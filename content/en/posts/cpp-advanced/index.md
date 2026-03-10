---
title: "Advanced C++: Move Semantics, Templates and Concurrency"
description: "Quick guide to advanced concepts of modern C++ (C++11/14/17/20): RAII, move constructors, lambda expressions and multithreading."
date: 2026-03-02
author: "Ashif"
tags: ["cpp", "c++", "advanced", "programming", "cheatsheet", "architecture"]
---

# Advanced C++: Modern C++ Concepts (C++11 onwards)

While basic C++ allows you to write classic procedural and object-oriented programs, **modern C++** (from C++11 up to C++20/C++23) has revolutionized the language by focusing on performance, memory safety, and declarative programming.

Here is a cheatsheet of the most important advanced constructs to know.

### 1. RAII (Resource Acquisition Is Initialization)

It is the most important architectural pattern in C++. Resource management (memory, files, locks) is tied to the lifecycle of an object: when the object goes out of scope, its destructor automatically frees the resource.

```cpp
#include <iostream>
#include <fstream>

class FileWrapper {
private:
    std::ofstream file;
public:
    FileWrapper(const std::string& filename) {
        file.open(filename);
        std::cout << "File opened.\n";
    }
    ~FileWrapper() {
        if (file.is_open()) file.close();
        std::cout << "File closed automatically.\n"; // Called even in case of exceptions
    }
};

void process() {
    FileWrapper fw("test.txt");
    // Work with the file...
    // You don't have to remember to call fw.close()!
} // <- Here fw is destroyed and the file is closed
```

### 2. Move Semantics and Rvalue References (`&&`)

Before C++11, passing or returning heavy objects required expensive copies in terms of CPU and memory. "Move semantics" borrows (or "steals") resources from temporary objects instead of copying them.

```cpp
#include <iostream>
#include <string>
#include <vector>

void processText(std::string&& tempText) { // && indicates an rvalue reference
    std::cout << "Received: " << tempText << "\n";
}

int main() {
    std::string baseText = "Hello";
    
    // Copy (normal):
    std::string copyText = baseText; 
    
    // Move: Avoids a memory allocation
    std::string movedText = std::move(baseText);
    
    // Now 'baseText' is empty/in a valid but unspecified state!
    std::cout << "Base text is now: [" << baseText << "]\n"; // Will print empty string
    
    // Using an rvalue reference for temporary objects ("in-place")
    processText(std::string("String created on the fly")); 
    
    return 0;
}
```

### 3. Smart Pointers (Memory Management)

No more direct `new` and `delete`. Use the libraries from `<memory>`.

- **`std::unique_ptr`**: Pointer with exclusive ownership. Cannot be cloned, but can be "moved" (move semantics). Zero overhead compared to a raw pointer.
- **`std::shared_ptr`**: Pointer with shared ownership via *reference counting*. The object is destroyed when the last shared_ptr is deallocated.

```cpp
#include <memory>
#include <iostream>

class Resource {
public:
    Resource() { std::cout << "Resource allocated!\n"; }
    ~Resource() { std::cout << "Resource destroyed!\n"; }
};

int main() {
    {
        // Safe allocation without "new"
        std::unique_ptr<Resource> res1 = std::make_unique<Resource>();
        
        // Since it's unique_ptr, if we want to pass it to res2 we have to "transfer" its ownership
        std::unique_ptr<Resource> res2 = std::move(res1); 
        
        // std::cout << (res1 == nullptr) << "\n"; // True, res1 is now null
    } // <- res2 goes out of scope, destructor called automatically, zero leaks!
    
    return 0;
}
```

### 4. Lambdas and `std::function`

Lambda expressions for in-line anonymous functions. Fundamental along with the STL (Standard Template Library) algorithms.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {5, 2, 8, 1, 9};

    // Basic syntax: [capture_list](parameters) -> return_type { body }
    int multiplier = 3;

    // We capture 'multiplier' from the scope by value (use [&] to take it by reference)
    std::for_each(numbers.begin(), numbers.end(), [multiplier](int n) {
        std::cout << n * multiplier << " ";
    });
    
    std::cout << "\n";
    
    // Using lambdas for advanced sorting (C++14: auto type parameters)
    std::sort(numbers.begin(), numbers.end(), [](auto a, auto b) {
        return a > b; // Descending order
    });

    return 0;
}
```

### 5. Templates and Meta-Programming

Templates allow writing generic programs not tied to a particular type. They are resolved at **compile time** (zero cost abstraction).

```cpp
#include <iostream>

// Template for a "Generic" function
template <typename T>
T maximum(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    std::cout << maximum<int>(10, 20) << "\n";       // Output: 20
    std::cout << maximum<double>(3.14, 2.71) << "\n"; // Output: 3.14
    
    // In modern C++ type T is automatically deduced
    std::cout << maximum('Z', 'A') << "\n";           // Output: Z
    
    return 0;
}
```

### 6. Multithreading and Concurrency

With C++11, multithreading is part of the standard library. OS-dependent APIs (like pthreads) are no longer needed.

```cpp
#include <iostream>
#include <thread>
#include <mutex>
#include <vector>

std::mutex mtx; // Synchronization to avoid "data races"

void worker(int id) {
    // std::lock_guard acquires the lock at the beginning and releases it
    // automatically at the end of the scope (RAII in action!)
    std::lock_guard<std::mutex> lock(mtx);
    std::cout << "Thread " << id << " working!\n";
}

int main() {
    std::vector<std::thread> threadList;

    // Create and start 5 threads
    for (int i = 0; i < 5; ++i) {
        threadList.push_back(std::thread(worker, i));
    }

    // The main thread waits (join) for all others to finish
    for (auto& t : threadList) {
        if (t.joinable()) {
            t.join();
        }
    }

    std::cout << "Asynchronous work completed.\n";
    return 0;
}
```

### 7. Optional and Variant (C++17)

Modern and null-safe replacements for pointers and unions, inspired by functional languages like Rust or Haskell.

- **`std::optional`**: represents a value that *might* not be there (useful instead of returning null pointers).
- **`std::variant`**: a *type-safe* type that can hold one and only one value chosen from a group of possible types.

```cpp
#include <iostream>
#include <optional>
#include <variant>

// Function that might not find the result
std::optional<int> find(bool search) {
    if (search) return 42;
    return std::nullopt; // modern equivalent to returning NULL/nullptr
}

int main() {
    auto res = find(true);
    if (res.has_value()) {
        std::cout << "Found: " << res.value() << "\n";
    }
    
    // Variant (Type safe union)
    std::variant<int, std::string> var;
    var = "Hello world";
    std::cout << "Text var: " << std::get<std::string>(var) << "\n";
    
    var = 100;
    std::cout << "Number var: " << std::get<int>(var) << "\n";

    return 0;
}
```

---

Mastering these features (along with **Concepts** introduced in C++20 and **Modules**) marks the watershed between those who simply write "C compiled with the C++ compiler" and a true modern high-performance C++ developer!
