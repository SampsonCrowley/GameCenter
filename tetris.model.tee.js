"use strict";

TETRIS = TETRIS || {}

TETRIS.Model = TETRIS.Model || {}

TETRIS.Model.Tee = function Tee() {
  TETRIS.Model.Shape.call(this, {
    diameter: 3,
    color: "#a36eaa"
  });
  this.updateMatrix()
};
TETRIS.Model.Tee.prototype = Object.create(TETRIS.Model.Shape.prototype);
TETRIS.Model.Tee.prototype.constructor = TETRIS.Model.Tee;

TETRIS.Model.Tee.prototype.updateMatrix = function updateMatrix(clear){
  this.fillMatrix(TETRIS.Model.Tee.rotations[this.orientation], clear)
}

TETRIS.Model.Tee.rotations = {
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
