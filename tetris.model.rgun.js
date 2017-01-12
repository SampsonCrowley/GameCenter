"use strict";

TETRIS = TETRIS || {}

TETRIS.Model = TETRIS.Model || {}

TETRIS.Model.RGun = function RGun() {
  TETRIS.Model.Shape.call(this, {
    diameter: 3,
    color: "#2b78e4"
  });
  this.updateMatrix()
};
TETRIS.Model.RGun.prototype = Object.create(TETRIS.Model.Shape.prototype);
TETRIS.Model.RGun.prototype.constructor = TETRIS.Model.RGun;

TETRIS.Model.RGun.prototype.updateMatrix = function updateMatrix(clear){
  this.fillMatrix(TETRIS.Model.RGun.rotations[this.orientation], clear)
}

TETRIS.Model.RGun.rotations = {
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
