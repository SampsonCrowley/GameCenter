"use strict";

TETRIS = TETRIS || {}

TETRIS.Model = TETRIS.Model || {}

TETRIS.Model.init = function init(){
  // this.activeShape = (Math.random() > .49 ? new this.Bar() : new this.Square());
  this.randomShape();
};

TETRIS.Model.descentRate = 1;
TETRIS.Model.strafing = false;
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
  TETRIS.Model.rotating = false;
  TETRIS.Model.strafing = false;
}

TETRIS.Model.movement = function movement(keyCode) {
  if(this.keys[81]){
    if(!this.rotating){
      this.activeShape.rotate(-90);
      this.rotating = true;
    }
  } else if(this.keys[87] || this.keys[32] || this.keys["click"]){
    if(!this.rotating){
      this.activeShape.rotate(90);
      this.rotating = true;
    }
  }

  if(this.keys[65]){
    if(!this.strafing){
      this.activeShape.strafe(-1);
      this.strafing = true;
    }
  } else if(this.keys[68]){
    if(!this.strafing){
      this.activeShape.strafe(1);
      this.strafing = true;
    }
  }
  var collided = this.Grid.checkCollisions(this.activeShape)
  if(collided){
    this.randomShape()
  }
};
