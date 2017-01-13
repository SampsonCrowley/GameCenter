"use strict";

TETRIS = TETRIS || {}

TETRIS.Grid = (function Grid(pixel) {
  var color = "#a36eaa",
      rows = 20,
      columns = 10,
      set = 0,
      cleared = false;

  var initializeMatrix = function initializeMatrix() {
    var grid = new Array(rows);
    for(var r = 0; r < rows; r++){
      grid[r] = setRow(r);
    }
    return grid;
  };

  var setRow = function setRow(r) {
    var squareOptions = {};
    var row = new Array(columns);
    for(var c = 0; c < columns; c++){
      squareOptions = { x: c, y: r };
      row[c] = new pixel(squareOptions);
    }
    return row;
  };

  var clearFull = function clearFull(){
    var deletions = 0, temp;
    for(var clr = rows - 1; clr >= deletions; clr--){
      var full = true;
      for(var clc = 0; clc < columns; clc++){
        if(!matrix[clr][clc].filled){
          full = false;
          break;
        }
      }
      if(full){
        deletions++;
        for(var nr = clr; nr >= deletions; nr--){
          for(var clcd = 0; clcd < columns; clcd++){
            matrix[nr][clcd].filled = matrix[nr-1][clcd].filled;
          }
        }
        for(var clcd = 0; clcd < columns; clcd++){
          matrix[deletions][clcd].filled = false;
        }
        clr++;
      }
    }
    cleared = deletions;
  };
  var each = function each(cb, rowCount, startRow) {
    var ei = 0, breakOut = false;
    rowCount = (isNaN(rowCount) ? rows : Math.min(rowCount, rows))
    for(var er = (isNaN(startRow) ? 0 : Math.max(startRow,0)); er < rowCount; er++){
      for(var ec = 0; ec < columns; ec++) {
        breakOut = cb(matrix[er][ec], ei);
        if(breakOut) return;
        ei++;
      }
    }
  };
  var pixels = function pixels(rowCount) {
    var pixelList = [],
    n = 0;
    // if(cleared){
    //   rowCount = undefined;
    //   cleared = false;
    // }
    each(function(pixel){
      if(pixel.filled){
        pixelList.push({
          x: pixel.x,
          y: pixel.y,
          color: pixel.color
        })
        n++;
        if(n === set) return true;
      }
    })
    // }, rowCount)

    // return {pixels: pixelList, rows: rowCount}
    return {pixels: pixelList, rows: undefined}
  };

  var addToGrid = function addToGrid(pixels, x, y, color){
    for(var i = 0; i < 4; i++){
      matrix[pixels[i].y + y][pixels[i].x + x].filled = true
      matrix[pixels[i].y + y][pixels[i].x + x].color = color
    }
  };

  var checkCollisions = function checkCollisions(shape){
    var n = 0,
        collided = false;

    if(shape.collidable.y + shape.y + 1 === rows) {
      collided = true;
    } else {
      each(function(pixel){
        if(pixel.filled){
          if((pixel.x) >= (shape.collidable.xl + shape.x) &&
          (pixel.y) >= (shape.collidable.y + shape.y)) {
            for(var i = 0; i < 4; i++){
              if((pixel.x) === (shape.collidable.pixels[i].x + shape.x) &&
              (pixel.y) === (shape.collidable.pixels[i].y + shape.y + 1)){
                return collided = true;
              }
            }
          }
        }
      }, (shape.y + shape.collidable.y + 3), shape.y-shape.diameter)
    }

    if(collided){
      (function(pixels, x, y, color){addToGrid(pixels, x, y, color)})(shape.collidable.pixels, shape.x, shape.y, shape.color);
      clearFull();
      return true
    }
  };

  var offset = function offset(shapeDiameter) {
    return (columns / 2) - Math.floor(shapeDiameter / 2);
  };

  var matrix = initializeMatrix();
  return {
    columns: columns,
    rows: rows,
    pixels: pixels,
    checkCollisions: checkCollisions,
    offset: offset
  }
})(TETRIS.Pixel);
