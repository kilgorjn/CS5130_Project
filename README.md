# CS5130_Project
## Minimal Span Trees

This project visualizes the differences in how the Prims algorithm creates MST, vs the Kruskals algorithm.  

Note that while you can't see the density, these graphs are <b>DENSE</b>, as each vertex has an edge to all other vertices.  
The runtime of Prim's algorithm is O(|V|<sup>2</sup>), while Kruskal's algorithm is O(log(|V|)); so it would appear that Prim's would be slower are nodes grow.  
However, Prim's runs faster on dense graphs; since these graphs are dense, Prim's appears to be a superior algorithm.

In the future, I may add the option to reduce the density.
