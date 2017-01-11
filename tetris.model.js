"use strict";

TETRIS = TETRIS || {}

TETRIS.Model = TETRIS.Model || {}

TETRIS.Model.init = function init(){
  this.shapes = [new this.Bar()];
  this.activeShape = this.shapes[0];
};

TETRIS.Model.descentRate = 1;

TETRIS.Model.Grid = {
  height: window.innerHeight, // TODO extract to view
  width: (this.height / 2),
  rows: 20,
  rowHeight: (window.innerHeight / 20),
  columns: 10
};

TETRIS.Model.offset = function offset(shapeDiameter) {
  return (this.Grid.columns / 2) - Math.floor(shapeDiameter / 2);
};

TETRIS.Model.drop = function drop() {
  this.activeShape.y += 1;
};
TETRIS.Model.keys = {
  rotation: {
    81: -90, // Q
    87: 90 //W
  },
  strafe: {
    65: -1, //A
    68: 1 //D
  }
};

TETRIS.Model.keyDown = function keyDown(keyCode) {
  if(TETRIS.Model.keys.rotation[+keyCode]){
    TETRIS.Model.rotate(+keyCode);
  }
  if(TETRIS.Model.keys.strafe[+keyCode]){
    TETRIS.Model.strafe(+keyCode);
  }
};

TETRIS.Model.rotate = function rotate(keyCode) {
  this.activeShape.rotate(this.keys.rotation[+keyCode]);
};

TETRIS.Model.strafe = function strafe(keyCode) {
  this.activeShape.strafe(this.keys.strafe[+keyCode]);
};
