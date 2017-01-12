"use strict";

TETRIS = TETRIS || {}

TETRIS.Model = TETRIS.Model || {}

TETRIS.Model.LGun = function LGun() {
  TETRIS.Model.Shape.call(this, {
    diameter: 3,
    color: "#f6b26b"
  });
  this.updateMatrix()
};
TETRIS.Model.LGun.prototype = Object.create(TETRIS.Model.Shape.prototype);
TETRIS.Model.LGun.prototype.constructor = TETRIS.Model.LGun;

TETRIS.Model.LGun.prototype.updateMatrix = function updateMatrix(clear){
  this.fillMatrix(TETRIS.Model.LGun.rotations[this.orientation], clear)
}

TETRIS.Model.LGun.rotations = {
    0: {
      "2_0": true,
      "0_1": true,
      "1_1": true,
      "2_1": true
    },
    90: {
      "1_0": true,
      "1_1": true,
      "1_2": true,
      "2_2": true
    },
    180: {
      "0_1": true,
      "1_1": true,
      "2_1": true,
      "0_2": true
    },
    270: {
      "0_0": true,
      "1_0": true,
      "1_1": true,
      "1_2": true
    },
}
