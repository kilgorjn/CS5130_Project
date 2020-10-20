# CS5130_Project
## Minimal Span Trees

<a href='https://kilgorjn.github.io/CS5130_Project/' target='_blank'>See the demo</a>

This project visualizes the differences in how the Prims algorithm creates MST, vs the Kruskals algorithm. 

A random graph is generated and traversed by the 2 algorithms, updating the display during traversal.  The normal edges are displayed in gray, the MST edges are displayed in red, and the edges being searched are displayed in black.

The input box controls the number of vertices in the graph.  Clicking 'Go' will create a new graph, and start traversing.

While the demo is running, all of the edges are displayed. As you can see, these graphs are <b>DENSE</b> as each vertex has an edge to all other vertices.

Once the MST is complete, the edges are removed so that only the edges in the MST are displayed in red.

The runtime of Prim's algorithm is O(|V|<sup>2</sup>), while Kruskal's algorithm is O(log(|V|)); so it would appear that Prim's would be slower are nodes grow.  

Prim's runs faster on dense graphs. Since these graphs are dense, Prim's <em>appears</em> to be a superior algorithm; however, that might not be the case if the graphs were more sparse.

In the future, I may add an option to reduce the density.  (generating random graphs is an algorithm in itself :wink:)
