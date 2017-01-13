"use strict";

TETRIS = TETRIS || {}

TETRIS.Model = (function(grid, shapes){
  var activeShape,
      descentRate = 1,
      strafing = 0,
      rotating = 0,
      dropping = 0,
      keys = [];

 var randomShape = function randomShape() {
    activeShape = {
      0: function(){
        return new shapes.Bar()
      },
      1: function(){
        return new shapes.LGun()
      },
      2: function(){
        return new shapes.RGun()
      },
      3:function(){
        return new shapes.Snake()
      },
      4: function(){
        return new shapes.Square()
      },
      5:function(){
        return new shapes.Tee()
      },
      6:function(){
        return new shapes.ZigZag()
      }
    }[Math.floor(Math.random()*7)]()
  }

  var drop = function drop() {
    activeShape.y += 1;
  };

  var startKey = function startKey(key){
    console.log("pressed")
    keys[key] = true;
  }
  var stopKey = function stopKey(key){
    keys[key] = false;
    switch (key) {
      case 32:
      case 38:
      case 81:
      case 87:
      case "click":
        rotating = 0;
        break;
      case 65:
      case 68:
      case 37:
      case 39:
        strafing = 0;
        break;
      case 83:
      case 40:
        dropping = 0;
        break;
      default:
    }
  }

  var movement = function movement(keyCode) {
    if(keys[81] || keys[38]){
      if(rotating % 10 === 0){
        activeShape.rotate(-90);
      }
      rotating += 1;
    } else if(keys[87] || keys[32] || keys["click"]){
      if(rotating % 10 === 0){
        activeShape.rotate(90);
      }
      rotating += 1;
    }

    if(keys[65] || keys[37]){
      if(strafing % 10 === 0){
        activeShape.strafe(-1);
      }
      strafing += 1;
    } else if(keys[68] || keys[39]){
      if(strafing % 10 === 0){
        activeShape.strafe(1);
      }
      strafing += 1;
    }

    if(keys[83] || keys[40]){
      if(dropping % 5 === 0){
        drop()
      }
      dropping += 1;
    }
    var collided = grid.checkCollisions(activeShape);
    if(collided){
      randomShape()
    }
  };
  var init = function init(){
    randomShape();
  };

  var pixels = function pixels() {
    var gridResult = grid.pixels(activeShape.y + activeShape.collidable.y)
    return {
      pixels: [...activeShape.pixels(), ...gridResult.pixels],
      rows: gridResult.rows
    }
  };

  return {
    init: init,
    drop: drop,
    movement: movement,
    pixels: pixels,
    startKey: startKey,
    stopKey: stopKey
  }
})(TETRIS.Grid, TETRIS.Shapes)
