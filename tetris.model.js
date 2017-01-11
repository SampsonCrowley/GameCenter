"use strict";

TETRIS = TETRIS || {}

TETRIS.Model = TETRIS.Model || {}

TETRIS.Model.init = function init(){
  this.shapes = [new this.Bar()]
}

TETRIS.Model.descentRate = 1;

TETRIS.Model.Grid = {
  height: window.innerHeight, // TODO
  rows: 20,
  columns: 10
};

TETRIS.Model.offset = function offset(shapeSize) {
  // TODO
  return (this.Grid.columns/2) - Math.floor(shapeSize/2);
};

// shapes: square, bar, T, L/<-L, Z/S
TETRIS.Model.Square = function Square(options) {
  this.diameter = TETRIS.Model.Grid.height / TETRIS.Model.Grid.rows;
  this.rx = options.x;
  this.ry = options.y;
  this.x = this.rx * this.diameter;
  this.y = this.ry * this.diameter;
  this.filled = options.filled
}
TETRIS.Model.prototype.updateCoords = function updateCoords(x, y){
  this.rx = x;
  this.ry = y;
  this.x = this.rx * this.diameter;
  this.y = this.ry * this.diameter;
};

TETRIS.Model.Shape = function Shape(options) {
  this.orientation = 0;
  this.diameter = options.diameter;
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
      this.matrix[r + c + (r*(this.diameter-1))] = new TETRIS.Model.Square(squareOptions);
    }
  };
  this.initializeMatrix(options);
}


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
