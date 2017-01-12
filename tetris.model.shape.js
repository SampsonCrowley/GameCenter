"use strict";

TETRIS = TETRIS || {}

TETRIS.Model = TETRIS.Model || {}

TETRIS.Model.Shape = function Shape(options) {
  this.orientation = 0;
  this.diameter = options.diameter;
  this.x = TETRIS.Model.offset(this.diameter);
  this.y = options.y || -1;
  this.color = options.color;
  this.collidable = {
    xl: 50,
    xr: 0,
    y: 0,
    pixels: new Array(4)
  };
  var initializeMatrix = function initializeMatrix(options) {
    // var matrix = {}
    var matrix = new Array(Math.pow(options.diameter, 2));
    for(var c = 0; c < options.diameter; c++){
      setColumn(c, options, matrix);
    }
    return matrix;
  };
  var setColumn = function setColumn(c, options, matrix) {
    var squareOptions = {};
    for(var r = 0; r < options.diameter; r++){
      squareOptions = { x: c, y: r };
      matrix[c + "_" + r] = new TETRIS.Model.Pixel(squareOptions);
    }
  };
  this.matrix = initializeMatrix(options);
};

TETRIS.Model.Shape.prototype.fillMatrix = function fillMatrix(filled, clear) {
  var n = 0;
  this.collidable.xl = 50;
  this.collidable.xr = 0;
  this.collidable.y =  0;

  for(var point in filled){
    this.matrix[point].filled = (clear ? false : true);
    this.collidable.pixels[n] = this.matrix[point];
    this.collidable.xl = Math.min(this.collidable.xl, this.matrix[point].x)
    this.collidable.xr = Math.max(this.collidable.xr, this.matrix[point].x)
    this.collidable.y = Math.max(this.collidable.y, this.matrix[point].y)
    n++
  }
};

TETRIS.Model.Shape.prototype.each = function each(cb) {
  var i = 0;
  var breakOut = false;
  for(var c = 0; c < this.diameter; c++){
    for(var r = 0; r < this.diameter; r++){
      breakOut = cb(this.matrix[c + "_" + r], i)
      if(breakOut) return;
      i++;
    }
  }
};

TETRIS.Model.Shape.prototype.pixels = function pixels() {
  var pixels = new Array(4);
  var n = 0;
  var _this = this;
  this.each(function(pixel){
    if(pixel.filled){
      pixels[n] = {
        x: pixel.x + _this.x,
        y: pixel.y + _this.y,
        color: _this.color
      }
      n++;
      if(n === 4) return true;
    }
  })

  return pixels
};


TETRIS.Model.Shape.prototype.rotate = function rotate(degrees) {
  this.updateMatrix(true);
  this.orientation += degrees
  if(this.orientation < 0) {
    this.orientation += 360;
  } else if(this.orientation >= 360) {
    this.orientation -= 360;
  }
  this.updateMatrix();
  this.strafe(0);
};

TETRIS.Model.Shape.prototype.strafe = function strafe(columns) {
  this.x += columns
  if(this.x + this.collidable.xl < 0) {
    this.x = 0 - this.collidable.xl;
  } else if(this.x + (this.collidable.xr + 1) > TETRIS.Model.Grid.columns) {
    this.x = TETRIS.Model.Grid.columns - (this.collidable.xr + 1);
  }
};
