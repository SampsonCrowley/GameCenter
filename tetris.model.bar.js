

TETRIS.Model.Bar = function Bar() {
  TETRIS.Model.Shape.call(this, {
    diameter: 4
  });

};
TETRIS.Model.Bar.prototype = Object.create(TETRIS.Model.Shape.prototype);
TETRIS.Model.Bar.prototype.constructor = TETRIS.Model.Bar;

TETRIS.Model.Bar.prototype.updateMatrix = function updateMatrix(){
  this.fillMatrix(TETRIS.Model.Bar.rotations[this.orientation])
}

TETRIS.Model.Bar.rotations = {
    0: {
      "0_1": true,
      "1_1": true,
      "2_1": true,
      "3_1": true
    },
    90: {
      "2_0": true,
      "2_1": true,
      "2_2": true,
      "2_3": true
    },
    180: {
      "0_2": true,
      "1_2": true,
      "2_2": true,
      "3_2": true
    },
    270: {
      "1_0": true,
      "1_1": true,
      "1_2": true,
      "1_3": true
    }
}
