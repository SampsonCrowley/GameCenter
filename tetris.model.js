"use strict";

TETRIS = TETRIS || {}

TETRIS.Model = TETRIS.Model || {}

TETRIS.Model.init = function init(){
  this.shapes = [new this.Bar()]
};

TETRIS.Model.descentRate = 1;

TETRIS.Model.Grid = {
  height: window.innerHeight, // TODO extract to view
  width: (this.height / 2),
  rows: 20,
  columns: 10
};

TETRIS.Model.offset = function offset(shapeDiameter) {
  return (this.Grid.columns / 2) - Math.floor(shapeDiameter / 2);
};

// shapes: square, bar, T, L/<-L, Z/S
TETRIS.Model.Pixel = function Pixel(options) {
  this.diameter = TETRIS.Model.Grid.height / TETRIS.Model.Grid.rows;
  this.x = options.x * this.diameter;
  this.y = options.y * this.diameter;
  this.filled = options.filled
};

TETRIS.Model.Pixel.prototype.updateCoords = function updateCoords(x, y){
  this.x = x * this.diameter;
  this.y = y * this.diameter;
};

TETRIS.Model.Shape = function Shape(options) {
  this.orientation = 0;
  this.diameter = options.diameter;
  this.x = TETRIS.Model.offset(this.diameter);
  this.y = -1;
  this.matrix = new Array(Math.pow(this.diameter, 2));
  this.initializeMatrix = function initializeMatrix(options) {
    for(var r = 0; r < this.diameter; r++){
      this.setRow(r, options);
    }
  };
  this.setRow = function setRow(r, options) {
    var squareOptions = {};
    for(var c = 0; c < this.diameter; c++){
      squareOptions = { x: c + TETRIS.Model.offset(this.diameter), y: r };
      if(options.filled[0][c + "_" + r]) {
        squareOptions.filled = true;
      }
      this.matrix[r + c + (r*(this.diameter-1))] = new TETRIS.Model.Pixel(squareOptions);
    }
  };
  this.initializeMatrix(options);
};


TETRIS.Model.Shape.prototype.rotate = function rotate() {
  //TODO
  /*
  0  | 1  | 2  | 3
  4  | 5  | 6  | 7
  8  | 9  | 10 | 11
  12 | 13 | 14 | 15

  3  | 7  | 11 | 15
  2  | 6  | 10 | 14
  1  | 5  | 9  | 13
  0  | 4  | 8  | 12
  for n = SIZE - 1 to 0
    for i = 0 to SIZE**2-1
      this.matrix.["r270"][i] = this.matrix[i + n]
  */
};

TETRIS.Model.Bar = function Bar() {
  TETRIS.Model.Shape.call(this, {
    diameter: 4,
    filled: {
      0: {
        "0_1": true,
        "1_1": true,
        "2_1": true,
        "3_1": true
      },
      1: {
        "2_0": true,
        "2_1": true,
        "2_2": true,
        "2_3": true
      },
      2: {
        "1_0": true,
        "1_1": true,
        "1_2": true,
        "1_3": true
      },
      3: {
        "0_2": true,
        "1_2": true,
        "2_2": true,
        "3_2": true
      }
    }
  });
};

TETRIS.Model.Bar.prototype = Object.create(TETRIS.Model.Shape.prototype);
TETRIS.Model.Bar.prototype.constructor = TETRIS.Model.Bar;
