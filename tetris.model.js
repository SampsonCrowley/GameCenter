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

TETRIS.Model.move = function move() {
  
};
