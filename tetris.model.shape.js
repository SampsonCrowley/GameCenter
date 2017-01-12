TETRIS = TETRIS || {}

TETRIS.Model = TETRIS.Model || {}

// shapes: square, bar, T, L/<-L, Z/S
TETRIS.Model.Pixel = function Pixel(options) {
  this.x = options.x;
  this.y = options.y;
  this.filled = options.filled;
};

TETRIS.Model.Shape = function Shape(options) {
  this.orientation = 0;
  this.diameter = options.diameter;
  this.x = TETRIS.Model.offset(this.diameter);
  this.y = -1;
  var initializeMatrix = function initializeMatrix(options) {
    var matrix = {}
    for(var c = 0; c < options.diameter; c++){
      setRow(c, options, matrix);
    }
    return matrix;
  };
  var setRow = function setRow(c, options, matrix) {
    var squareOptions = {};
    for(var r = 0; r < options.diameter; r++){
      squareOptions = { x: c, y: r };
      matrix[c + "_" + r] = new TETRIS.Model.Pixel(squareOptions);
    }
  };
  this.matrix = initializeMatrix(options);
};

TETRIS.Model.Shape.prototype.fillMatrix = function fillMatrix(filled, clear) {
  for(var point in filled){
    this.matrix[point].filled = (clear ? false : true);
    console.log(this.matrix[point])
  }
};


TETRIS.Model.Shape.prototype.pixels = function pixels() {
  var pixels = new Array(4);
  var n = 0;
  for(var c = 0; c < this.diameter; c++){
    for(var r = 0; r < this.diameter; r++){
      if(this.matrix[c + "_" + r].filled){
        pixels[n] = {
          x: this.matrix[c + "_" + r].x + this.x,
          y: this.matrix[c + "_" + r].y + this.y,
        }
        n++;
        if(n === 4) break;
      }
    }
  }
  return pixels

};


TETRIS.Model.Shape.prototype.rotate = function rotate(degrees) {
  // TODO
  this.updateMatrix(true);
  this.orientation += degrees
  if(this.orientation < 0) {
    this.orientation += 360;
  } else if(this.orientation >= 360) {
    this.orientation -= 360;
  }
  this.updateMatrix();
};

TETRIS.Model.Shape.prototype.strafe = function strafe(columns) {
  // TODO
  this.x += columns
  if(this.x < 0) {
    this.x = 0;
  } else if(this.x + this.diameter > TETRIS.Model.Grid.columns) {
    this.x = TETRIS.Model.Grid.columns - this.diameter;
  }
  this.updateMatrix();
};
