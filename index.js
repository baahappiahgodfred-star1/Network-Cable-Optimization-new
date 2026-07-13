// =====================================================
// GRAPH REPRESENTATION (Cables entre PCs)
// =====================================================
const vertices = ["PC1", "PC2", "PC3", "PC4", "PC5"]; // 5 PCs = V=5 → MST aura 4 arêtes

const edges = [
  { from: "PC1", to: "PC2", weight: 4 }, // Long câble
  { from: "PC1", to: "PC3", weight: 2 }, // Court
  { from: "PC2", to: "PC3", weight: 1 }, // PLUS COURT ! ⭐
  { from: "PC2", to: "PC4", weight: 5 },
  { from: "PC3", to: "PC4", weight: 8 }, // Cher → ignoré
  { from: "PC3", to: "PC5", weight: 10 }, // Cher → ignoré
  { from: "PC4", to: "PC5", weight: 2 }, // Essentiel
];

class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i); // 🔑 CHAQUE PC seul: PC1→0, PC2→1...
    this.rank = Array(n).fill(0); // Équilibre arbre (optimisation senior)
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // 🌟 COMPRESSION: aplatit l'arbre → O(1)
    }
    return this.parent[x]; // Racine du "clan" de x
  }

  union(x, y) {
    let rootX = this.find(x); // Chef de clan X
    let rootY = this.find(y); // Chef de clan Y

    if (rootX === rootY) return false; // 🔥 CYCLE DÉTECTÉ: même clan !

    // UNION BY RANK: attache petit à grand (évite arbres longs)
    if (this.rank[rootX] < this.rank[rootY]) {
      [rootX, rootY] = [rootY, rootX]; // Swap malin !
    }
    this.parent[rootY] = rootX; // Petit clan rejoint grand

    if (this.rank[rootX] === this.rank[rootY]) {
      this.rank[rootX]++; // Nouveau chef gagne +1 rang
    }
    return true; // Fusion OK
  }
}

function kruskal(vertices, edges) {
  // LIGNE 1: Sécurité (crash-proof)
  if (!vertices?.length) throw new Error("Invalid vertex list");
  // → Exécuté TOUJOURS en 1er. Vérifie que tu as des PCs !

  const vertexMap = new Map(vertices.map((v, i) => [v, i]));
  /*
    Résultat IMMÉDIAT:
    PC1 → 0    PC2 → 1    PC3 → 2    PC4 → 3    PC5 → 4
    Pourquoi? UnionFind ne comprend QUE des nombres 0,1,2...
  */

  // Transforme edges texte → indices numériques
  const mappedEdges = edges
    .map((e) => ({
      u: vertexMap.get(e.from), // PC1 → 0
      v: vertexMap.get(e.to), // PC2 → 1
      weight: e.weight,
    }))
    .filter((e) => e.u !== undefined && e.v !== undefined); // Ignore arêtes invalides

  /*
  AVANT: {from:"PC1", to:"PC2", weight:4}
  APRÈS: {u:0, v:1, weight:4}
  */

  // 🌟 ÉTAPE 1: TRI (cœur greedy Kruskal)
  mappedEdges.sort((a, b) => a.weight - b.weight);
  /*
  AVANT: [4,2,1,5,8,10,2] → random order
  APRÈS: [1,2,2,4,5,8,10] → CROISSANT !
  
  ⚡ COMPARATEUR EXPLIQUE:
  a.weight - b.weight < 0 → a avant b
  1-4 = -3 < 0 → PC2-PC3(1) avant PC1-PC2(4)
  */

  const uf = new UnionFind(vertices.length); // 5 clans isolés
  const mst = []; // Arêtes sélectionnées
  let totalCost = 0;

  // 🌟 ÉTAPE 2: Parcours greedy
  for (let edge of mappedEdges) {
    if (uf.union(edge.u, edge.v)) {
      // Pas de cycle ?
      mst.push(edge); // → AJOUTÉ !
      totalCost += edge.weight;
    } // Sinon: SKIP (cycle)

    if (mst.length === vertices.length - 1) break; // V-1=4 → FINI !
  }

  // 🛡️ VÉRIFICATION: Graphe connexe ?
  if (mst.length !== vertices.length - 1)
    throw new Error("Graph is not fully connected");

  return { mst, totalCost }; // ⭐ PARFAIT !
}

// =====================================================
// 🚀 APPEL DIRECT + FORMATAGE RESULTAT
// =====================================================
console.log("=== Réseau de câbles optimal ===");
const result = kruskal(vertices, edges);

const vertexMapBack = new Map(vertices.map((v,i) => [i,v]));
const connections = result.mst.map(edge => 
  `${vertexMapBack.get(edge.u)}-${vertexMapBack.get(edge.v)} (${edge.weight})`
);

console.log("\n📡 CÂBLES SÉLECTIONNÉS:");
connections.forEach(c => console.log(`  ${c}`));
console.log(`💰 Coût total: ${result.totalCost}$`);