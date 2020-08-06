import CellZone from "./CellZone";
import DrawingTool from "./DrawingTool";
import $ from 'jquery';


class Processor {
    constructor() {

        this.runButton = $('#run');
        this.initializeButton = $('#initialize');
        this.cellSizeInput = $('#cell-size');
        this.cellDensityInput = $('#cell-density');
        this.simTimeInput = $('#sim-time');
        this.timeDisplay = $('#current-time');
        this.resizeButton = $('#resize');
        this.heightInput = $('#height');
        this.widthInput = $('#width');
        this.canvas = $("#canvas");
        this.allowDrawCheck = $('#allow-draw');
        this.drawingTool = new DrawingTool();
        this.cellZone = new CellZone();
        this.stopButton = $('#stop');
        this.enableEndCheck = $('#enable-end');
        this.drawButton = $("#draw-button");
        this.eraseButton = $("#erase");
        this.stepButton = $('#step');
        this.events();
        this.initialized = false;
        this.painting = false
        this.allowDraw = this.allowDrawCheck.is(':checked');
        this.stop = true;
        
    }
    events() {
        this.runButton.on("click", this.run.bind(this));
        this.initializeButton.on("click", this.initialize.bind(this));
        this.resizeButton.on("click", this.resize.bind(this));
        this.canvas.on("mousedown", this.startPosition.bind(this));
        this.canvas.on("mouseup", this.endPosition.bind(this));
        this.canvas.on("mousemove", this.draw.bind(this));
        this.allowDrawCheck.on("click", this.allowDrawFun.bind(this));
        this.stopButton.on('click', () => { this.stop = true;});
        this.enableEndCheck.on('click', this.enableEnd.bind(this));
        this.cellSizeInput.on('input', () =>{ this.stop = true; this.resize()})
        this.stepButton.on('click', this.step.bind(this));

    }
    enableEnd(){
        if (!this.enableEndCheck.is(':checked')){
            this.simTimeInput.attr('disabled', 'disabled');
        }
        else{
            this.simTimeInput.removeAttr('disabled');
        }
    }

    allowDrawFun(){
        this.allowDraw = this.allowDrawCheck.is(':checked');
        this.initialized = true;    
 
 
    }
    step(){
        if (!this.checkConditions() || !this.initialized) {
            if (!this.initialized) this.drawingTool.warning('You have to initialize first');
            else this.drawingTool.warning("wrong input!");
            return;
        }
        this.cellZone.doStep();
        this.drawingTool.render(this.cellZone.array, this.cellSizeInput.val());
        this.timeDisplay.text('time: ' + (this.timeDisplay.text().replace('time: ' ,"")*1 + 0.03).toFixed(2));
    }
    run() {
 
        if (!this.checkConditions() || !this.initialized) {
            if (!this.initialized) this.drawingTool.warning('You have to initialize first');
            else this.drawingTool.warning("wrong input!");
            return;
        }
            this.stop = false;
            let start = Date.now() - Math.floor(this.timeDisplay.text().replace('time: ' ,"")*1000);
            var id = setInterval(frame.bind(this), 30);
            
            function frame(){
                let timePassed = Date.now() - start;        
                if (timePassed > this.simTimeInput.val()*1000 && this.enableEndCheck.is(':checked') || this.stop){
                    clearInterval(id);
                    return;
                }
                this.cellZone.doStep();
                this.drawingTool.render(this.cellZone.array, this.cellSizeInput.val());
                this.timeDisplay.text('time: ' + (timePassed/ 1000).toFixed(2));
            }
        
    }

    initialize() {
        if (!this.checkConditions()) {
            this.drawingTool.warning("wrong input!");
            return;
        }
        this.stop = true;
        this.timeDisplay.text('time: 0');
        let width = Math.floor(this.drawingTool.canvas.width / this.cellSizeInput.val());
        let height = Math.floor(this.drawingTool.canvas.height / this.cellSizeInput.val());
        this.cellZone.setDimensions(width, height);
        this.cellZone.fillRandom(this.cellDensityInput.val());
        var myarr = [...this.cellZone.array];
        this.drawingTool.render(myarr, this.cellSizeInput.val());
        this.initialized = true;
    }

    checkConditions(){
        if (!$.isNumeric(this.cellDensityInput.val()))   return false;
        if (this.cellDensityInput.val() > 1 ||this.cellDensityInput.val() < 0) return false;
        if (!$.isNumeric(this.cellSizeInput.val())) return false;
        return true;
    }

    resize(){
        this.stop = true;
        this.timeDisplay.text('time: 0');
        this.initialized = false; 

        if (!$.isNumeric(this.heightInput.val())) alert('nie bangla');
        if (!$.isNumeric(this.widthInput.val())) alert('nie bangla');
        this.drawingTool.resize(this.widthInput.val(), this.heightInput.val() )
        let width = Math.floor(this.drawingTool.canvas.width / this.cellSizeInput.val());
        let height = Math.floor(this.drawingTool.canvas.height / this.cellSizeInput.val());
        this.cellZone.setDimensions(width, height);

    }

    startPosition(event){
        this.painting = true;
        this.draw(event);
    }

    endPosition(){
        this.painting = false;
    }

    draw(event){
        if(!this.painting || !this.allowDraw) return;

        this.initialized = true;
        this.drawingTool.fillCell(event.clientX, event.clientY, this.cellSizeInput.val(),this.cellZone.array)
    }
}

export default Processor;