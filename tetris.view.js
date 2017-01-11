TETRIS = TETRIS || {}
TETRIS.View = TETRIS.View || {}

TETRIS.View.init = function init() {

}


TETRIS.View.renderShape = function renderShape(shape) {
  this.shapeContext.fillRect(shape.x, shape.y, this.diameter, this.diameter)
}
