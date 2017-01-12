"use strict";

TETRIS = TETRIS || {}

TETRIS.Model = TETRIS.Model || {}

TETRIS.Model.ZigZag = function ZigZag() {
  TETRIS.Model.Shape.call(this, {
    diameter: 3,
    color: "#EE8888"
  });
  this.updateMatrix()
};
TETRIS.Model.ZigZag.prototype = Object.create(TETRIS.Model.Shape.prototype);
TETRIS.Model.ZigZag.prototype.constructor = TETRIS.Model.ZigZag;

TETRIS.Model.ZigZag.prototype.updateMatrix = function updateMatrix(clear){
  this.fillMatrix(TETRIS.Model.ZigZag.rotations[this.orientation], clear)
}

TETRIS.Model.ZigZag.rotations = {
    0: {
      "0_0": true,
      "1_0": true,
      "1_1": true,
      "2_1": true
    },
    90: {
      "2_0": true,
      "1_1": true,
      "2_1": true,
      "1_2": true
    },
    180: {
      "0_1": true,
      "1_1": true,
      "1_2": true,
      "2_2": true
    },
    270: {
      "1_0": true,
      "0_1": true,
      "1_1": true,
      "0_2": true
    }
}
