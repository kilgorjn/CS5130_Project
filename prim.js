//CLRS page 634

let max_x=400
let max_y=400
// let num_vertices = 5
let v_diameter = 10

let V = [];
let E = [];


class Vertex {
    constructor(id, x, y) {
      this.id = id
      this.x = x;
      this.y = y;
      this.pi = null
      this.key = Infinity
    }
}
  
class Edge {
    constructor(v1, v2){
        this.v1 = v1
        this.v2 = v2
        this.length = dist(v1.x,v1.y,v2.x,v2.y)
    }

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
    // //sort the edges by weight
    // E.sort(function(e1,e2){
    //     if(e1.length == e2.length){
    //         return 0
    //     }
    //     if(e1.length < e2.length){
    //         return -1
    //     }
    //     if(e1.length > e2.length){
    //         return 1
    //     }
    // })

}

function draw_vertices(){
    stroke('gray')
    for(let n=0; n<V.length; n++){
        v = V[n];
        circle(v.x, v.y, v_diameter);
    }
}

function createQ(){
    Q = []
    for(i=0; i<V.length; i++){
        v = V[i]
        Q.push(new Vertex(v.id, v.x, v.y))
    }

    for(i=0; i<Q.length; i++){
        v = Q[i]
        for(j=0; j<E.length; j++){
            console.log(`i = ${i} j = ${j} v.id = ${v.id} k.key = ${v.key} E${j} = ${E[j]} E${j}.v1.id = ${E[j].v1.id}  E${j}.length = ${E[j].length} `)
            if(E[j].v1.id === v.id && E[j].length < v.key){
                console.log('setting key')
                v.key = E[i].length
            }
        }
    }
    return Q

}

function EXTRACT_MIN(Q){

}

  
function MST_PRIM(){
    // r = V[0]
    // r.key = 0
    // Q = createQ()

    // console.debug(V)
    // console.debug(Q)


    // while(Q.length>0){
    //     u = EXTRACT_MIN(Q)
    // }

}


function setup() {
    let params = getURLParams();
    
    if(params.num_vertices !== undefined){
        num_vertices = int(params.num_vertices)
    }
    if(params.max_x !== undefined){
        max_x = int(params.max_x)
    }
    if(params.max_y !== undefined){
        max_y = int(params.max_y)
    }
    if(params.v_diameter !== undefined){
        v_diameter = int(v_diameter)
    }

    if(params.vertices !== undefined){
        vertices = JSON.parse(decodeURIComponent(params.vertices))
        V = []
        for(i=0; i<vertices.length; i++){
            v = vertices[i]
            V.push(new Vertex(v.id,v.x,v.y))
        }       
    }

    createCanvas(max_x, max_y);
    background(220);

    // create_vertices()
    create_edges()
    MST_PRIM()
    // noLoop()

}


function draw() {
    background(220);
    draw_vertices()
}