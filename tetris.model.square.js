"use strict";

TETRIS = TETRIS || {}

TETRIS.Model = TETRIS.Model || {}

TETRIS.Model.Square = function Square() {
  TETRIS.Model.Shape.call(this, {
    diameter: 2,
    color: "#ffe599"
  });
  this.updateMatrix()
};
TETRIS.Model.Square.prototype = Object.create(TETRIS.Model.Shape.prototype);
TETRIS.Model.Square.prototype.constructor = TETRIS.Model.Square;

TETRIS.Model.Square.prototype.updateMatrix = function updateMatrix(clear){
  this.fillMatrix(TETRIS.Model.Square.rotations[this.orientation], clear)
}

TETRIS.Model.Square.rotations = {
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
