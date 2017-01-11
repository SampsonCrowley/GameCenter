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
      if(options.filled[c + "_" + r]) {
        squareOptions.filled = true;
      }
      this.matrix[r + c + (r*(this.diameter-1))] = new TETRIS.Model.Square(squareOptions);
    }
  };
  this.initializeMatrix(options);
}


TETRIS.Model.Shape.prototype.rotate = function rotate() {
  //TODO
};

TETRIS.Model.Bar = function Bar() {
  TETRIS.Model.Shape.call(this, {
    diameter: 4,
    filled: { "0_1": true,
      "1_1": true,
      "2_1": true,
      "3_1": true
    }
  });
};

TETRIS.Model.Bar.prototype = Object.create(TETRIS.Model.Shape.prototype);
TETRIS.Model.Bar.prototype.constructor = TETRIS.Model.Bar;
