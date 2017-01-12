"use strict";

TETRIS = TETRIS || {}

TETRIS.Model = TETRIS.Model || {}

TETRIS.Model.init = function init(){
  this.activeShape = new this.Bar();
  console.log(this.Grid)
};

TETRIS.Model.descentRate = 1;

TETRIS.Model.offset = function offset(shapeDiameter) {
  console.log(this.Grid);
  return (this.Grid.columns / 2) - Math.floor(shapeDiameter / 2);
};

TETRIS.Model.drop = function drop() {
  this.activeShape.y += 1;
};
TETRIS.Model.keys = [];

TETRIS.Model.startKey = function startKey(key){
  TETRIS.Model.keys[key] = true;
}
TETRIS.Model.stopKey = function stopKey(key){
  TETRIS.Model.keys[key] = false;
  TETRIS.Model.rotating = false
}

TETRIS.Model.movement = function movement(keyCode) {
  if(TETRIS.Model.keys[81]){
    if(!this.rotating){
      this.activeShape.rotate(-90);
      this.rotating = true;
    }
  } else if(TETRIS.Model.keys[87]){
    if(!this.rotating){
      this.activeShape.rotate(90);
      this.rotating = true;
    }
  }

  if(TETRIS.Model.keys[65]){
    this.activeShape.strafe(-1);
  } else if(TETRIS.Model.keys[68]){
    this.activeShape.strafe(1);
  }
  // this.Grid.checkCollisions(this.activeShape)
};
