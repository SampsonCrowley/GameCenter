"use strict";

TETRIS = TETRIS || {}

TETRIS.Shapes = TETRIS.Shapes || {}

TETRIS.Shapes.Tee = (function Tee(shape) {
  var rotations = {
      0: {
        "1_0": true,
        "0_1": true,
        "1_1": true,
        "2_1": true
      },
      90: {
        "1_0": true,
        "1_1": true,
        "2_1": true,
        "1_2": true
      },
      180: {
        "0_1": true,
        "1_1": true,
        "2_1": true,
        "1_2": true
      },
      270: {
        "1_0": true,
        "0_1": true,
        "1_1": true,
        "1_2": true
      },
  }


  var Tee = function Tee() {
    shape.call(this, {
      diameter: 3,
      color: "#a36eaa"
    });
    this.updateMatrix()
  };
  Tee.prototype = Object.create(shape.prototype);
  Tee.prototype.constructor = Tee;

  Tee.prototype.updateMatrix = function updateMatrix(clear){
    this.fillMatrix(rotations[this.orientation], clear)
  }

  return Tee;
})(TETRIS.Shape)
