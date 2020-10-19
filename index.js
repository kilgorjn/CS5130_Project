

const num_vertices = 50
// const num_edges = 5
const max_x=400
const max_y=400
const v_diameter = 10

let V = [];
let E = [];
let D = []; //disjoint sets
let A = []; // mst edges
let searched_edges = []
let current_frame = 0

function create_vertices(){
    for(let n=0; n<num_vertices; n++){
        overlapped = true
        let comparisions = 0
        while(overlapped == true){
            r_x = int(random(v_diameter,max_x-v_diameter))
            r_y = int(random(v_diameter,max_y-v_diameter))
            comparisions +=1
            overlapped = false
            
            for (p=0; p<V.length; p++){
                d = dist(V[p].x,V[p].y, r_x,r_y)
                if(d < v_diameter*2){
                    overlapped=true
                    break
                }
            }
            if(comparisions >=50){
                overlapped=false
            }
        }
        V[n] =
          new Vertex(
            n,
            r_x, 
            r_y          );
      }
      for(let n=0; n<num_vertices; n++){
          v = V[n];
        console.log(`${n} ${v.x} ${v.y}`)
      }  
      console.log(V);    
}

function create_edges(){
    for(let i=0; i<V.length; i++){
        for(let j=i; j<V.length; j++){
            if(i != j){
                E.push(new Edge(V[i],V[j]))
            }
        }
    }
    //sort the edges by weight
    E.sort(function(e1,e2){
        if(e1.length == e2.length){
            return 0
        }
        if(e1.length < e2.length){
            return -1
        }
        if(e1.length > e2.length){
            return 1
        }
    })





}


function MAKE_SET(v){
    s = FIND_SET(v)
    console.log(`MAKE_SET: v=${v.id}  FIND_SET returned ${s}`)
    if(FIND_SET(v) === undefined){
        D.push([{id:D.length,vertices:[v]}])
    }
    console.log(`MAKE_SET:finished.  |D| = ${D.length}`)
}

function UNION(x,y){
    console.log(`UNION: called with x=${x}, y=${y}`)
    set1_index = FIND_SET(x)
    set2_index = FIND_SET(y)
    set1 = D[set1_index]
    set2 = D[set2_index]
    console.log(`   UNION: set1 = ${set1}, set2 = ${set2}`)
    console.log(`   UNION: set2.vertices = ${set2.vertices}`)
    console.debug(set2)
    for(let i =0; i<set2.length; i++){
        set1.push(set2[i])
    }
    D.splice(set2_index,1)

}

// FIND-SET(x) returns a pointer to the representative of the (unique) set containing x.
function FIND_SET(v){
    console.log(`FIND_SET: called  v.id = ${v.id}`)
    for(let i = 0; i<D.length;i++){
        s = D[i]
        for(let j=0; j<s.length;j++){
            if(v.id == s[j].id){
                return i
            }
        }
    }
    return undefined
}


function MST_KRUSKAL(){
    for(let n=0; n<V.length; n++){
        v = V[n]
        MAKE_SET(v)
    }

    for(let n=0; n<E.length; n++){
        edge = E[n]
        u = edge.v1
        v = edge.v2
        fs_u = FIND_SET(u)
        fs_v = FIND_SET(v)
        if(fs_u != fs_v){
            A.push(edge)
            UNION(u,v)
        }
    }
    
}

function setup() {
    // randomSeed(99);
    background(220);
    frameRate(1)

    createCanvas(max_x, max_y);
    create_vertices()
   
    create_edges()
    MST_KRUSKAL()
   
}

function draw_vertices(){
    for(let n=0; n<num_vertices; n++){
        v = V[n];
        circle(v.x, v.y, v_diameter);
    }
}

function draw_edges(current_frame){
    console.log(current_frame)
    for(let n=0; n<A.length; n++){
        edge = A[n]
        line(edge.v1.x, edge.v1.y, edge.v2.x, edge.v2.y);
    } 
}

function draw() {
  background(220);
  draw_vertices();
  draw_edges(current_frame);
  current_frame++;
}

class Vertex {
  constructor(id, x, y) {
    this.id = id
    this.x = x;
    this.y = y;
  }
}

class Edge {
    constructor(v1, v2){
        this.v1 = v1
        this.v2 = v2
        this.length = dist(v1.x,v1.y,v2.x,v2.y)
    }

}




