TETRIS = TETRIS || {}

TETRIS.View = {

  init: function init(cb) {
    this.setHTML();
    this.initCanvas();
    this.listeners(cb);
    this.renderBackground();
  },

  setHTML: function setHTML(){
    this.gameWrapper = document.getElementsByTagName('tetris')[0] || this.createWrapper();
    this.backgroundCanvas = this.gameWrapper.getElementsByClassName('tetris-background')[0] || this.createCanvas('tetris-background');
    this.tetrisCanvas = this.gameWrapper.getElementsByClassName('tetris-objects')[0] || this.createCanvas('tetris-objects');
  },

  createWrapper: function createWrapper() {
    var wrapper = document.createElement('TETRIS');
    document.body.appendChild(wrapper);

    return wrapper;
  },

  createCanvas: function createCanvas(className) {
    var canvas = document.createElement('CANVAS');
    canvas.classList.add(className);
    canvas.height = window.innerHeight;
    canvas.width = canvas.height / 2;

    this.gameWrapper.appendChild(canvas);

    return canvas;
  },

  initCanvas: function initCanvas() {
    this.bgContext = this.backgroundCanvas.getContext('2d');
    this.bgContext.fillStyle = "#9fc5f8";
    this.tetrisContext = this.tetrisCanvas.getContext('2d');
    this.resize();
  },

  listeners: function listeners(cb){
    cb = cb || {};
    var _this = this;

    if(cb.keyDown){
      document.body.addEventListener("keydown", function(e) {
        cb.keyDown(e.which || e.keyCode || 0)
      });
    }

    window.addEventListener('resize', function() {
      _this.resize();
      if(cb.resize){
        cb.resize(_this.width, _this.height);
      }
    });
  },

  resize: function resize() {
    this.height = window.innerHeight;
    this.width = this.height / 2;
    this.diameter = this.width / 10;
    this.backgroundCanvas.height = this.height;
    this.backgroundCanvas.width = this.width;
    this.tetrisCanvas.height = this.height;
    this.tetrisCanvas.width = this.width;

    this.renderBackground();
  },

  renderBackground: function renderBackground() {
    this.bgContext.fillStyle = "#9fc5f8";
    this.bgContext.clearRect(0,0, this.width, this.height);
    this.bgContext.fillRect(0,0, this.backgroundCanvas.width, this.backgroundCanvas.height);
  },
  clearEntities: function clearEntities(){
    this.tetrisContext.clearRect(0,0, this.width, this.height);
  },
  renderEntities: function renderEntities(objects){
    this.clearEntities();
    this.renderShapes(objects.shapes);
  },
  renderShapes: function renderPixel(shapes){
    for(var i = 0; i < shapes.length; i++){
      this.renderMatrix(shapes[i].pixels(), shapes[i].color);
    }
  },
  renderMatrix: function renderMatrix(pixels, color){
    for(var i = 0; i < pixels.length; i++){
      this.drawPixel(pixels[i].x, pixels[i].y, color);
    }
  },
  drawPixel: function drawPixel(x, y, color) {
    this.tetrisContext.fillStyle = color;
    this.tetrisContext.strokeStyle = "#333333";
    this.tetrisContext.fillRect((x * this.diameter), (y * this.diameter), this.diameter, this.diameter);
    this.tetrisContext.strokeRect((x * this.diameter), (y * this.diameter), this.diameter, this.diameter);
  },
  gameOver: function gameOver(){
    this.tetrisContext.font="50vh Verdana";
    this.tetrisContext.fillStyle="white";
    this.tetrisContext.fillText("Game Over", this.width/4, this.height*.75, this.width/2);
  }
}
