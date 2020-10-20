

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


function create_edges(){
    for(let i=0; i<V.length; i++){
        for(let j=i; j<V.length; j++){
            if(i != j){
                E.push(new Edge(V[i],V[j]))
            }
        }
    }

    for(i=0; i<E.length; i++){
        e = E[i]
        console.log(`edge ${i} connects vertext ${e.v1.id} with vertext ${e.v2.id}`)
    }

}

function draw_vertices(){
    stroke('gray')
    for(let n=0; n<V.length; n++){
        v = V[n];
        circle(v.x, v.y, v_diameter);
        text(v.id,v.x+5,v.y+5)
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
            // console.log(`i = ${i} j = ${j} v.id = ${v.id} k.key = ${v.key} E${j} = ${E[j]} E${j}.v1.id = ${E[j].v1.id}  E${j}.length = ${E[j].length} `)
            if(E[j].v1.id === v.id && E[j].length < v.key){
                // console.log('setting key')
                v.key = E[i].length
            }
        }
    }
    return Q

}

function EXTRACT_MIN(Q){
    //find the vector in Q with the min key, remove and return
    min_key = Infinity
    min_idx = -1
    for(i=0; i<Q; i++){
        if(Q.key < min_key){
            min_key = Q.key
            min_idx = i
        }
    }

    return Q.splice(min_idx,1)[0]

}

/**
 * find all vectors that are adjacent to v
 * @param {} v 
 */
function G_adj(v){
    retval = []
    for(i=0; i<E.length; i++){
        // console.log(`G_adj: i=${i} v.id = ${v.id} E[${i}].v1.id = ${E[i].v1.id}`)
        if(E[i].v2.id === v.id){
            retval.push(E[i].v1)
        }else if(E[i].v1.id === v.id){
            retval.push(E[i].v2)
        }
    }
    return retval;
}

function weight(u,v){
    return dist(u.x,u.y,v.x,v.y)
}

function MST_PRIM(){
    r = V[0]
    r.key = 0
    Q = createQ()
    console.debug("Q=")
    console.debug(Q)


    while(Q.length>0){
        u = EXTRACT_MIN(Q)
        console.log(`MST_PRIM inpecting vertex ${u.id}`)
        adj_vertices = G_adj(u)
        for(i=0; i<adj_vertices.length; i++){
            v = adj_vertices[i]
            vInQ = false
            for(j=0; j<Q.length; j++){
                if(v.id === Q[j].id){
                    vInQ=true;
                    break;
                }
            }
            w=weight(u,v)            
            if(vInQ && w < v.key){
                v.pi=u
                v.key = w
            }
        }
    }

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

    if(V.length > 0){
        // create_vertices()
        create_edges()
        MST_PRIM()
        console.log('Prim is finished')
        console.log('V.length = ',V.length)
        for(i=0; i<V.length; i++){
            console.log(V[i])
        }
    }
    // noLoop()
    console.log("----------------------draw_MST")
    console.debug(V)

}


function draw_edges(){
    stroke('black')
    for(i=0; i<E.length; i++){
        
        line(E[i].v1.x,E[i].v1.y,E[i].v2.x,E[i].v2.y)
    }
}

function draw_MST(){
    for(i=0; i<V.length; i++){
        v = V[i]
        if(v.pi !== null){
            u=v.pi
            // console.log(`draw_MST:  v=${v} v.pi = ${v.pi}`)
            line(u.x,u.y,v.x,v.y)
        }
    }
    

}

function draw() {
    background(220);
    draw_vertices()
    draw_MST()
    // draw_edges()
}