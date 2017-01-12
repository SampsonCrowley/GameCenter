"use strict";

TETRIS = TETRIS || {}

TETRIS.Model = TETRIS.Model || {}

TETRIS.Model.Snake = function Snake() {
  TETRIS.Model.Shape.call(this, {
    diameter: 3,
    color: "#6ac286"
  });
  this.updateMatrix()
};
TETRIS.Model.Snake.prototype = Object.create(TETRIS.Model.Shape.prototype);
TETRIS.Model.Snake.prototype.constructor = TETRIS.Model.Snake;

TETRIS.Model.Snake.prototype.updateMatrix = function updateMatrix(clear){
  this.fillMatrix(TETRIS.Model.Snake.rotations[this.orientation], clear)
}

TETRIS.Model.Snake.rotations = {
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
