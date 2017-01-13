"use strict";

TETRIS = TETRIS || {}

TETRIS.Shapes = TETRIS.Shapes || {}

TETRIS.Shapes.Square = (function Square(shape) {
  var rotations = {
      0: {
        "0_0": true,
        "0_1": true,
        "1_0": true,
        "1_1": true
      },
      90: {
        "0_0": true,
        "0_1": true,
        "1_0": true,
        "1_1": true
      },
      180: {
        "0_0": true,
        "0_1": true,
        "1_0": true,
        "1_1": true
      },
      270: {
        "0_0": true,
        "0_1": true,
        "1_0": true,
        "1_1": true
      }
  }


  var Square = function Square() {
    shape.call(this, {
      diameter: 2,
      color: "#ffe599"
    });
    this.updateMatrix()
  };
  Square.prototype = Object.create(shape.prototype);
  Square.prototype.constructor = Square;

  Square.prototype.updateMatrix = function updateMatrix(clear){
    this.fillMatrix(rotations[this.orientation], clear)
  }

  return Square;
})(TETRIS.Shape)
