"use strict";

TETRIS = TETRIS || {}

TETRIS.Pixel = function Pixel(options) {
  this.x = options.x;
  this.y = options.y;
  this.filled = options.filled;
};
