# MST Cable Network Optimization – Kruskal Algorithm

## 📌 Project Overview

This project demonstrates the implementation of **Kruskal’s Algorithm** to compute the **Minimum Spanning Tree (MST)** for optimizing cable layout between computers in a network.

The goal is to connect all computers using the **least total cable cost** while avoiding cycles.

The program uses:

- Greedy algorithm strategy
- Union-Find (Disjoint Set) data structure
- Path compression optimization
- Union by rank heuristic

---

## 🚀 Algorithm Used

### Kruskal’s Algorithm

Kruskal’s algorithm builds the Minimum Spanning Tree by:

1. Sorting all edges by weight in ascending order.
2. Selecting the smallest edge that does not create a cycle.
3. Repeating until **V - 1 edges** are selected.

Time Complexity:

- Sorting edges → **O(E log E)**
- Union-Find operations → nearly **O(1)** amortized


## 🧠 Data Structures

### Union-Find (Disjoint Set)

Used to efficiently:

- Detect cycles
- Manage connected components

Optimizations implemented:

- Path compression
- Union by rank


## 📂 Project Structure

```js
project/
│
├── main.js
├── README.md
```


## ✨ Features

- Graph representation using edge lists
- Dynamic edge filtering
- Cycle detection
- Minimum network cable cost calculation
- Console formatted output
- Fully optimized Union-Find operations

---

## 🖥️ How to Run

### Requirements

- Node.js installed (recommended version ≥ 12)

### Execution

Run the program using:

```bash
node main.js
```

🔍 Complexity Analysis
Operation	Complexity
Edge Sorting	O(E log E)
Union-Find Find	α(V) (inverse Ackermann)
Union Operation	α(V)
Overall	O(E log E)

⚠️ Assumptions

Graph must be connected.

Input edges must be valid.

Duplicate or invalid edges are ignored.



👨‍💻 Sylvestre IBOMBO GAKOSSO

Developed as an exercise on graph optimization algorithms.