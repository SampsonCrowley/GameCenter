"use strict";

TETRIS = TETRIS || {}

TETRIS.Shapes = TETRIS.Shapes || {}

TETRIS.Shapes.RGun = (function RGun(shape) {
  var rotations = {
      0: {
        "0_0": true,
        "0_1": true,
        "1_1": true,
        "2_1": true
      },
      90: {
        "1_0": true,
        "2_0": true,
        "1_1": true,
        "1_2": true
      },
      180: {
        "0_1": true,
        "1_1": true,
        "2_1": true,
        "2_2": true
      },
      270: {
        "1_0": true,
        "1_1": true,
        "0_2": true,
        "1_2": true
      },
  }

  var RGun = function RGun() {
    shape.call(this, {
      diameter: 3,
      color: "#2b78e4"
    });
    this.updateMatrix()
  };
  RGun.prototype = Object.create(shape.prototype);
  RGun.prototype.constructor = RGun;

  RGun.prototype.updateMatrix = function updateMatrix(clear){
    this.fillMatrix(rotations[this.orientation], clear)
  }

  return RGun;
})(TETRIS.Shape)
