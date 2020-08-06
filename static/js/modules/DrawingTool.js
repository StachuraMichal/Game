import $ from 'jquery';

class DrawingTool {
    constructor() {
        this.canvas        = document.querySelector('#canvas');
        this.ctx           = this.canvas.getContext("2d");
        this.resize();
        this.allowDraw = $('#allow-draw');
        
  
    }

    test() {

        this.ctx.fillRect(50, 50, 50, 50);
    }

    render(array, cellSize) {
        this.clear();
        this.ctx.fillStyle = "green";
        for (var i=0; i< array.length; i++){
            for (var j =0; j< array[0].length; j++){
                
                if (array[i][j] == 1) this.ctx.fillRect(cellSize*i, cellSize*j, cellSize, cellSize);
            }
           
        }
        
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    resize(width = 500,height =500){
      
        this.canvas.width = width;
        this.canvas.height = height;

        
    }

    fillCell(x, y, cellSize, array){
        var rect = this.canvas.getBoundingClientRect();
        let xi = Math.floor((x-rect.left)/cellSize);
        let yi = Math.floor((y-rect.top)/cellSize);
    
        let col = [...array[xi]];
        col[yi] = 1;
        array[xi] = col;
     
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(xi*cellSize, yi*cellSize, cellSize, cellSize);
        
    }
    warning(text){
        this.clear();
        this.ctx.font = "30px Comic Sans MS";
        this.ctx.fillStyle = "red";
        this.ctx.textAlign = "center";
        this.ctx.fillText(text, this.canvas.width/2, this.canvas.height/2);
    }

}
export default DrawingTool;