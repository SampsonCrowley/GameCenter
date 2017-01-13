"use strict";

TETRIS = TETRIS || {}

TETRIS.Shapes = TETRIS.Shapes || {}

TETRIS.Shapes.Bar = (function Bar(shape) {
  var rotations = {
    0: {
      "0_1": true,
      "1_1": true,
      "2_1": true,
      "3_1": true
    },
    90: {
      "2_0": true,
      "2_1": true,
      "2_2": true,
      "2_3": true
    },
    180: {
      "0_2": true,
      "1_2": true,
      "2_2": true,
      "3_2": true
    },
    270: {
      "1_0": true,
      "1_1": true,
      "1_2": true,
      "1_3": true
    }
  }
  var Bar = function Bar() {
    shape.call(this, {
      diameter: 4,
      color: "#f0f8ff"
    });
    this.updateMatrix()
  };
  Bar.prototype = Object.create(shape.prototype);
  Bar.prototype.constructor = Bar;

  Bar.prototype.updateMatrix = function updateMatrix(clear){
    this.fillMatrix(rotations[this.orientation], clear)
  }

  return Bar;
})(TETRIS.Shape)
