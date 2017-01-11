
TETRIS = TETRIS || {}

TETRIS.Model = TETRIS.Model || {}

TETRIS.Model.descentRate = 1;

TETRIS.Model.Grid = {
  height: , // TODO
  rows: 20,
  columns: 10
};

// shapes: square, bar, T, L/<-L, Z/S
TETRIS.Model.Square = function Square(options) {
  this.x = options.x;
  this.y = options.y;
  this.diameter = TETRIS.Model.Grid.height / TETRIS.Model.Grid.rows;
  this.filled = options.filled
}

TETRIS.Model.Shape = function Shape(options) {
  this.orientation = 0;
  this.matrix = new Array(size.x * size.x);
  for(var r = 0; r < size.y; r++){
    for(var c = 0; c < size.x; c++){
      if( options.filled[r + "_" + c]){
        this.matrix[r + c + (r*(size.x-1))] = ""
      }else {
        this.matrix[r + c + (r*(size.x-1))] = ""
      }
    }
  }
}

TETRIS.Model.Shape.prototype.rotate = function rotate() {

};

TETRIS.Model.Bar = function Bar() {

  TETRIS.Model.Shape.call(TETRIS.Model.Bar, {
    size: { x: 4, y: 4 },
    filled: { "0_1": { x: 0, y: 1 },
              "1_1": { x: 1, y: 1 },
              "2_1": { x: 2, y: 1 },
              "3_1": { x: 3, y: 1 }
            }
  });


}
