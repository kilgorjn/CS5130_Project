

class Vertex {
    constructor(id, x, y) {
      this.id = id
      this.x = x;
      this.y = y;
    }
  }


function create_vertices(num_vertices,v_diameter,max_x,max_y){
    V=[]
    
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
      return V 
}

function setup() {
    noLoop();
}
function draw(){

}