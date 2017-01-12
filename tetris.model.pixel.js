"use strict";

TETRIS = TETRIS || {}

TETRIS.Model = TETRIS.Model || {}

TETRIS.Model.Pixel = function Pixel(options) {
  this.x = options.x;
  this.y = options.y;
  this.filled = options.filled;
};

TETRIS.Model.pixels = function pixels() {
  var gridResult = this.Grid.pixels(this.activeShape.y + this.activeShape.collidable.y)
  return {
    pixels: [...this.activeShape.pixels(), ...gridResult.pixels],
    rows: gridResult.rows
  }
};
