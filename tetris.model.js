
TETRIS = TETRIS || {}

TETRIS.Model = TETRIS.Model || {}

TETRIS.Model.descentRate = 1;

TETRIS.Model.grid = {
  height: , // TODO
  rows: 20,
  columns: 10
};

// shapes: square, bar, T, L/<-L, Z/S
TETRIS.Model.Square = function Square(coords) {
  this.x = coords.x;
  this.y = coords.y;
  this.diameter = TETRIS.Model.grid.height / TETRIS.Model.grid.rows;
}

TETRIS.Model.Shape = function Shape() {
  this.orientation = 0;

}

TETRIS.Model.Bar = function Bar() {

  Shape.call(this, [{ x: 0, y: 0 },
                    { x: 1, y: 0 },
                    { x: 2, y: 0 },
                    { x: 3, y: 0 }]);
}

