// # Fly me to my destination - It's urgent!!

// Consider there are **N** airports in the world, each airport has a plane available with limited units of fuel available to fly.

// You are initially positioned at airport **number one** and you have to reach the last airport (**N**) by hiring a **minimum** number of planes. You'd need 1 unit of fuel to fly to the nearest airport from any airport.

// You will be given an array of N numbers each representing the units of fuel available in the plane at that particular airport. Print the number of planes you'd need to hire to reach the last airport. If it is not possible to reach the last airport, return -1

// Example:

// Array = [2,1,2,3,1]

// In the given array, there are 5 airports, the plane at the starting airport has 2 units of fuel so you can hire this plane and stop at the 2nd or 3rd airport. The plane at the 2nd airport has 1 unit of fuel so it can fly to the 3rd airport only. The minimum number of planes required in this case is two 2 → 2→ 1.

// Example 2:

// Array = [1,6,3,4,5,0,0,0,6]

// In the given array, there are 9 airports, the plane at the starting airport has 1 unit of fuel, so you can hire this plane and stop at the 2nd airport only. The plane at the 2nd airport has 6 units of fuel, so it can fly to the 3rd, 4th, 5th, 6th, 7th, or 8th airport. If we take the plane at the 5th airport, the minimum number of planes required in this case is three 1 → 6 → 5 → 6

// <aside>
// 👉 Our team will analyze the code for its quality, logic, code comments, variable naming, complexity, and user interface design.

// </aside>

// <aside>
// ✅ Along with the code, we’d want you to write & explain the algorithm of the logic (step by step) that you’ve put into use for solving the above-mentioned problem.

// </aside>

// All the best!

//Code Starts Here

class Graph {
  constructor(vertices) {
    this.V = vertices;
    let array = [];
    for (let i = 1; i <= this.V; i++) {
      array[i] = [];
    }
    this.adj = { ...array };
  }
  add_edge(src, dest) {
    let tempa = this.adj[src];
    tempa.push(dest);
    this.adj[src] = tempa;
  }
  print_array() {
    console.log(this.adj);
  }
  ShortestPath(src, dest) {
    let tempdist = {};
    for (let i = 1; i <= this.V; i++) {
      tempdist[i] = 0;
    }
    let dist = { ...tempdist };
    let tempparent = {};
    for (let i = 1; i <= this.V; i++) {
      tempparent[i] = i;
    }
    let parent = { ...tempparent };

    let tempvisited = {};
    for (let i = 1; i <= this.V; i++) {
      tempvisited[i] = false;
    }
    let visited = { ...tempvisited };
    let queue = [];
    queue.push(src);
    visited[src] = true;

    while (queue.length > 0) {
      let queueLength = queue.length;
      while (queueLength--) {
        let node = queue[0];
        queue.shift();
        visited[node] = true;
        for (let i = 0; i < this.adj[node].length; i++) {
          if (!visited[this.adj[node][i]]) {
            visited[this.adj[node][i]] = true;
            dist[this.adj[node][i]] = dist[node] + 1;
            parent[this.adj[node][i]] = node;
            queue.push(this.adj[node][i]);
          }
        }
      }
    }

    let stack = [];
    while (parent[dest] != dest) {
      stack.push(dest);
      dest = parent[dest];
    }
    stack.push(dest);
    let Path_length = stack.length;
    if (stack.length < 2) {
      Path_length = 0;
    }
    let outstring = "";
    while (stack.length > 1) {
      outstring = outstring + `${stack[stack.length - 1]}  -> `;
      stack.pop();
    }
    if (stack.length > 0 && Path_length != 0) {
      outstring = outstring + `${stack[stack.length - 1]}`;
    }
    console.log("The Shortest Path of the Unweighted Graph is:", outstring);
    return Path_length - 1;
  }
}

let airports = [1, 6, 3, 4, 5, 0, 0, 0, 6];
let G = new Graph(airports.length);

for (let i = 1; i <= airports.length; i++) {
  for (j = 1; j <= airports[i - 1]; j++) {
    if (i + j <= airports.length && i + j > 1) {
      G.add_edge(i, i + j);
    }
  }
}
G.print_array();
console.log("Nuber of Planes to Hire = ", G.ShortestPath(1, airports.length));
