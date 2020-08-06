class CellZone{

    constructor( width= 25, height = 25)
    {      
        this.width = width;
        this.height = height;
        this.array = new Array(width).fill(new Array(height).fill(0));
    }

    setDimensions(width, height){
        this.array = new Array(width).fill(new Array(height).fill(0));
        this.width = width;
        this.height = height;      
    }

    fillRandom(density)
    {
        var col;
        for (var i=0; i< this.array.length; i++){
            col = new Array(this.height);
            for (var j =0; j< this.array[0].length; j++){            
                col[j] =Math.random() < density ? 1 : 0;              
            }
            this.array[i] = col;
        }     
    }

    doStep()    {
        var col;
        var newTimestep  = new Array(this.width).fill(new Array(this.height));

        for (var i=0; i< this.array.length; i++){
            col = new Array(this.height);
            for (var j =0; j< this.array[0].length; j++){             
                col[j] =(i-1<0? 0 : this.array[i-1][j] )+ this.array[i][j] + (i+1 == this.width? 0 : this.array[i+1][j] ) ;              
            }
            newTimestep[i] = col;     
        }

        for (var i=0; i< this.array.length; i++){
            col = new Array(this.height);
            for (var j =0; j< this.array[0].length; j++){ 
                col[j] =(j-1<0? 0 : newTimestep[i][j-1] )+ newTimestep[i][j] + (j+1 == this.height? 0 : newTimestep[i][j+1] ) -this.array[i][j];
                col[j] == 3 ? col[j] = 1 : col[j] == 2 ? col[j] = this.array[i][j] : col[j] = 0;
            }
            this.array[i] = col;        
        }
    }
}

export default CellZone;