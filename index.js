

const num_vertices = 50
// const num_edges = 5
const max_x=400
const max_y=400
const v_diameter = 10
frame_rate = 5

let V = [];
let E = [];
let D = []; //disjoint sets
let A = []; // mst edges
let searched_edges = []
let current_frame = 0


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


function reset(){
    V = []
    E = []
    D = []
    A = []
    searched_edges = []
    current_frame = 0
}

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
            r_y          
            );
      }
      for(let n=0; n<num_vertices; n++){
          v = V[n];
      }  
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


/**
 * Disjoint Set methods
 * (from pseudo code in CLRS book)
 */

function MAKE_SET(v){
    s = FIND_SET(v)
    console.log(`MAKE_SET: v=${v.id}  FIND_SET returned ${s}`)
    if(FIND_SET(v) === undefined){
        D.push([{id:D.length,vertices:[v]}])
    }
}

function UNION(x,y){
    set1_index = FIND_SET(x)
    set2_index = FIND_SET(y)
    set1 = D[set1_index]
    set2 = D[set2_index]
    for(let i =0; i<set2.length; i++){
        set1.push(set2[i])
    }
    D.splice(set2_index,1)

}

function FIND_SET(v){
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




/**
 * Minimal Spanning Tree method (KRUSKAL alg)
 * from pseudo-code in CLRS book
 * 
 * with additional array 'searched_edges' which is used
 * to display the results
 */

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
            searched_edges.push({edge:edge,type:'found'})
            UNION(u,v)
        }else{
            searched_edges.push({edge:edge,type:'searched'})
        }
    }
    
}






/**
 * functions for drawing edges and vertices on the screen
 */
function truncate_searched_edges(){
    //search for the last found edge
    let last_found_searched_edge = 0

    for(n=0; n<searched_edges.length; n++){
        if(searched_edges[n].type == 'found'){
            last_found_searched_edge = n
        }
    }
    searched_edges.splice(last_found_searched_edge,searched_edges.length-last_found_searched_edge)
}

function draw_vertices(){
    stroke('gray')
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

function draw_searched_edges(current_frame){
    m = min(current_frame,searched_edges.length)
    for(let n=0; n<m; n++){
        searched_edge = searched_edges[n]
        edge = searched_edge.edge
        if(searched_edge.type == 'searched'){
            if(n == m-1){
                stroke('black')
                strokeWeight(4)           
                line(edge.v1.x, edge.v1.y, edge.v2.x, edge.v2.y);
                strokeWeight(1)
            }
        }else{
            stroke('red')
            line(edge.v1.x, edge.v1.y, edge.v2.x, edge.v2.y);
        }

    } 
}

function draw_found_edges(){
    for(let n=0; n<A.length; n++){
        edge = A[n]
        stroke('red')
        line(edge.v1.x, edge.v1.y, edge.v2.x, edge.v2.y);
    }

}


function start_loop(button){
    
    loop()
    button.attribute('disabled', '');
}

/**
 * P5 setup and draw methods
 */

function setup() {
    // randomSeed(99);
    background(220);
    frameRate(frame_rate)
    button = createButton('Start');
    button.position(19, max_y+40);
    button.mousePressed(function(){
        loop()
        this.attribute('disabled','')
    });
    // rSlider = createSlider(0, 50, 10);
    // rSlider.position(20, 20);
    // text('red', rSlider.x * 2 + rSlider.width, 35);
    createCanvas(max_x, max_y);
    create_vertices()
    background(220);
    draw_vertices();    
    create_edges()
    MST_KRUSKAL()
    truncate_searched_edges()
    noLoop()
   
}


function draw() {
  background(220);
  draw_vertices();
  if(current_frame < searched_edges.length){
    draw_searched_edges(current_frame);
  }else{
    draw_found_edges();
  }
  
  current_frame++;
}






