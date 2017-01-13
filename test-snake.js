"use strict";

TETRIS = TETRIS || {}

TETRIS.Shapes = TETRIS.Shapes || {}

TETRIS.Shapes.Snake = (function Snake(shape) {
  var rotations = {
      0: {
        "1_0": true,
        "2_0": true,
        "0_1": true,
        "1_1": true
      },
      90: {
        "1_0": true,
        "1_1": true,
        "2_1": true,
        "2_2": true
      },
      180: {
        "1_1": true,
        "2_1": true,
        "0_2": true,
        "1_2": true
      },
      270: {
        "0_0": true,
        "0_1": true,
        "1_1": true,
        "1_2": true
      }
  }

  var Snake = function Snake() {
    shape.call(this, {
      diameter: 3,
      color: "#6ac286"
    });
    this.updateMatrix()
  };
  Snake.prototype = Object.create(shape.prototype);
  Snake.prototype.constructor = Snake;

  Snake.prototype.updateMatrix = function updateMatrix(clear){
    this.fillMatrix(rotations[this.orientation], clear)
  }

  return Snake;
})(TETRIS.Shape)
