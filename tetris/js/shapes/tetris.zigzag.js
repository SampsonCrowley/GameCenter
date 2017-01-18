"use strict";

TETRIS = TETRIS || {}

TETRIS.Shapes = TETRIS.Shapes || {}

TETRIS.Shapes.ZigZag = (function ZigZag(shape) {
  var rotations = {
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


  var ZigZag = function ZigZag() {
    shape.call(this, {
      diameter: 3,
      color: "#EE8888"
    });
    this.updateMatrix()
  };
  ZigZag.prototype = Object.create(shape.prototype);
  ZigZag.prototype.constructor = ZigZag;

  ZigZag.prototype.updateMatrix = function updateMatrix(clear){
    this.fillMatrix(rotations[this.orientation], clear)
  }

  return ZigZag;
})(TETRIS.Shape)
