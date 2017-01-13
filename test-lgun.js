"use strict";

TETRIS = TETRIS || {}

TETRIS.Shapes = TETRIS.Shapes || {}

TETRIS.Shapes.LGun = (function LGun(shape) {
  var rotations = {
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

  var LGun = function LGun() {
    shape.call(this, {
      diameter: 3,
      color: "#f6b26b"
    });
    this.updateMatrix()
  };
  LGun.prototype = Object.create(shape.prototype);
  LGun.prototype.constructor = LGun;

  LGun.prototype.updateMatrix = function updateMatrix(clear){
    this.fillMatrix(rotations[this.orientation], clear)
  }

  return LGun;
})(TETRIS.Shape)
