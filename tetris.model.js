"use strict";

TETRIS = TETRIS || {}

TETRIS.Model = TETRIS.Model || {}

TETRIS.Model.init = function init(){
  // this.activeShape = (Math.random() > .49 ? new this.Bar() : new this.Square());
  this.randomShape();
};

TETRIS.Model.descentRate = 1;
TETRIS.Model.strafing = 0;
TETRIS.Model.rotating = 0;
TETRIS.Model.keys = [];


TETRIS.Model.randomShape = function randomShape() {
  this.activeShape = {
    0: function(){
      return new TETRIS.Model.Bar()
    },
    1: function(){
      return new TETRIS.Model.LGun()
    },
    2: function(){
      return new TETRIS.Model.RGun()
    },
    3:function(){
      return new TETRIS.Model.Snake()
    },
    4: function(){
      return new TETRIS.Model.Square()
    },
    5:function(){
      return new TETRIS.Model.Tee()
    },
    6:function(){
      return new TETRIS.Model.ZigZag()
    }
  }[Math.floor(Math.random()*7)]()
}

TETRIS.Model.offset = function offset(shapeDiameter) {
  return (this.Grid.columns / 2) - Math.floor(shapeDiameter / 2);
};

TETRIS.Model.drop = function drop() {
  this.activeShape.y += 1;
};

TETRIS.Model.startKey = function startKey(key){
  TETRIS.Model.keys[key] = true;
}
TETRIS.Model.stopKey = function stopKey(key){
  TETRIS.Model.keys[key] = false;
  switch (key) {
    case 32:
    case 81:
    case 87:
    case "click":
      TETRIS.Model.rotating = 0;
      break;
    case 65:
    case 68:
      TETRIS.Model.strafing = 0;
      break;
    default:
  }
}

TETRIS.Model.movement = function movement(keyCode) {
  if(this.keys[81]){
    if(this.rotating % 10 === 0){
      this.activeShape.rotate(-90);
    }
    this.rotating += 1;
  } else if(this.keys[87] || this.keys[32] || this.keys["click"]){
    if(this.rotating % 10 === 0){
      this.activeShape.rotate(90);
    }
    this.rotating += 1;
  }

  if(this.keys[65]){
    if(this.strafing % 10 === 0){
      this.activeShape.strafe(-1);
    }
    this.strafing += 1;
  } else if(this.keys[68]){
    if(this.strafing % 10 === 0){
      this.activeShape.strafe(1);
    }
    this.strafing += 1;
  }
  var collided = this.Grid.checkCollisions(this.activeShape)
  if(collided){
    this.randomShape()
  }
};
