"use strict";

TETRIS = TETRIS || {}

TETRIS.Model = TETRIS.Model || {}

TETRIS.Model.descentRate = 1;

TETRIS.Model.Grid = {
  height: , // TODO
  rows: 20,
  columns: 10
};

// shapes: square, bar, T, L/<-L, Z/S
TETRIS.Model.Square = function Square(options) {
  this.diameter = TETRIS.Model.Grid.height / TETRIS.Model.Grid.rows;
  this.x = options.x * this.diameter;
  this.y = options.y * this.diameter;
  this.filled = options.filled
}

TETRIS.Model.Shape = function Shape(options) {
  this.orientation = 0;
  this.diameter = options.diameter;
  this.matrix = new Array(Math.pow(this.diameter, 2));
  this.initializeMatrix(options);
 }

TETRIS.Model.Shape.prototype.initializeMatrix = function initializeMatrix(options) {
  for(var r = 0; r < this.diameter; r++){
    this.setRow(r, options);
  }
};

TETRIS.Model.Shape.prototype.setRow = function setRow(r, options) {
  var squareOptions = {};
  for(var c = 0; c < this.diameter; c++){
    squareOptions = { x: c, y: r };
    if(options.filled[r + "_" + c]){
      squareOptions.filled = true;
    }
    this.matrix[r + c + (r*(this.diameter-1))] = new Square(squareOptions);
  }
};

TETRIS.Model.Shape.prototype.rotate = function rotate() {

};

TETRIS.Model.Bar = function Bar() {

  TETRIS.Model.Shape.call(TETRIS.Model.Bar, {
    diameter: 4,
    filled: { "0_1": true,
      "1_1": true,
      "2_1": true,
      "3_1": true
    }
  });


}
