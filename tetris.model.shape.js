TETRIS = TETRIS || {}

TETRIS.Model = TETRIS.Model || {}

// shapes: square, bar, T, L/<-L, Z/S
TETRIS.Model.Pixel = function Pixel(options) {
  this.diameter = TETRIS.Model.Grid.height / TETRIS.Model.Grid.rows;
  this.x = options.x * this.diameter;
  this.y = options.y * this.diameter;
  this.filled = options.filled
};

TETRIS.Model.Shape = function Shape(options) {
  this.orientation = 0;
  this.diameter = options.diameter;
  this.x = TETRIS.Model.offset(this.diameter);
  this.y = -1;
  var initializeMatrix = function initializeMatrix(options) {
    var matrix = new Array(Math.pow(options.diameter, 2));
    for(var r = 0; r < options.diameter; r++){
      setRow(r, options, matrix);
    }
    return matrix;
  };
  var setRow = function setRow(r, options, matrix) {
    var squareOptions = {};
    for(var c = 0; c < options.diameter; c++){
      squareOptions = { x: c, y: r };
      matrix[r + c + (r*(options.diameter-1))] = new TETRIS.Model.Pixel(squareOptions);
    }
  };
  this.matrix = initializeMatrix(options);
};

TETRIS.Model.Shape.prototype.fillMatrix = function fillMatrix(filled) {
  for(var r = 0; r < this.diameter; r++){
    for(var c = 0; c < this.diameter; c++){
      this.fillPixel(r, c, filled);
    }
  }
};

TETRIS.Model.Shape.prototype.pixels = function pixels() {
  var pixels = new Array(4);
  var n = 0;
  for(var i = 0; i < this.matrix.length; i++){
    if(this.matrix[i].filled){
      pixels[n] = {
        x: this.matrix[i].x + (this.matrix[i].diameter * this.x),
        y: this.matrix[i].y + (this.matrix[i].diameter * this.y),
        diameter: this.matrix[i].diameter
      }
      n++;
      if(n === 4) break;
    }
  }
  return pixels

};

TETRIS.Model.Shape.prototype.fillPixel = function fillPixel(c, r, filled) {
  if(filled[c + "_" + r]) {
    this.matrix[r + c + (r*(this.diameter-1))].filled = true;
  } else {
    this.matrix[r + c + (r*(this.diameter-1))].filled = false;
  }
};

TETRIS.Model.Shape.prototype.rotate = function rotate(degrees) {
  // TODO
  this.orientation += degrees
  if(this.orientation < 0) {
    this.orientation += 360;
  } else if(this.orientation >= 360) {
    this.orientation -= 360;
  }
  this.updateMatrix();
};
