# CS5130_Project
## Minimal Span Trees

This project visualizes the differences in how the Prims algorithm creates MST, vs the Kruskals algorithm.  

As you can see while the demo is running, these graphs are <b>DENSE</b> as each vertex has an edge to all other vertices.  
The runtime of Prim's algorithm is O(|V|<sup>2</sup>), while Kruskal's algorithm is O(log(|V|)); so it would appear that Prim's would be slower are nodes grow.  

Prim's runs faster on dense graphs. Since these graphs are dense, Prim's <em>appears</em> to be a superior algorithm; however, that might not be the case if the graphs were more sparse.

In the future, I may add an option to reduce the density.  (generating random graphs is an algorithm in itself :wink:)
