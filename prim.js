

//CLRS page 634

let max_x=400
let max_y=400
// let num_vertices = 5
let v_diameter = 10

let V = [];
let E = [];
let found_vertices = []
let frame_rate = 5
let current_frame = 0



class Vertex {
    constructor(id, x, y) {
      this.id = id
      this.x = x;
      this.y = y;
      this.pi = undefined
      this.key = Infinity
    }
}
  
class Edge {
    constructor(v1, v2){
        this.v1 = v1
        this.v2 = v2
        this.length = dist(v1.x,v1.y,v2.x,v2.y)
    }

    containsVertext(v){
        return v.id === this.v1.id || v.id === this.v2.id
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
        console.log(`edge ${i} connects vertext ${e.v1.id} with vertext ${e.v2.id} with length ${e.length}`)
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
    Q.containsVertex = function(v){ 
        
        for(_i in this){
            if(this[_i].id === v.id){
                return true
            }
        }
        return false;
    }
    for(i=0; i<V.length; i++){
        v = V[i]
        // Q.push(new Vertex(v.id, v.x, v.y))
        Q.push(v)
    }

    Q.sort(function(a,b){
        if(a.key == b.key){
            return 0
        }
        if(a.key < b.key){
            return -1
        }
        if(a.key > b.key){
            return 1
        }
    })
    console.log("----------createQ   printing Q")
    for(i=0; i<Q.length; i++){
        console.log(Q[i])
    }
    return Q

}

function EXTRACT_MIN(Q){

    Q.sort(function(a,b){
        if(a.key == b.key){
            return 0
        }
        if(a.key < b.key){
            return -1
        }
        if(a.key > b.key){
            return 1
        }
    })
    v = Q.shift()
    console.debug(JSON.stringify(Q))
    console.debug(v)
    console.log(`EXTRACT_MIN: returning v.id=${v.id} and key = ${v.key}`)    
    return(v)

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
    r.pi = null
    Q = createQ()
    console.debug("Q=")
    console.debug(Q)


    while(Q.length>0){
        // console.debug(`*************Q len = ${Q.length}`)
        u = EXTRACT_MIN(Q)
        found_vertices.push(u)
        // console.log(`MST_PRIM inpecting vertex ${u.id} with key ${u.key}`)
        adj_vertices = G_adj(u)
        // console.log(`MST_PRIM adjacent verticies of ${u.id} are:`)
        // console.debug(adj_vertices)

        for(i=0; i<adj_vertices.length; i++){
            // console.log(`  looping  i=${i} adj_vertices.length = ${adj_vertices.length}`)
            v = adj_vertices[i]
            vInQ = Q.containsVertex(v)
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
    frameRate(frame_rate)
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
    // m = min(current_frame,found_vertices.length)
    // for(i=0; i<m;i++){
    //     v = found_vertices[i]
    //     u = found_vertices[i+1]
    //     line(v.x,v.y,u.x,u.y)
    // }
    // current_frame++
    draw_MST()
    // draw_edges()
}