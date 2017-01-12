"use strict";

TETRIS = TETRIS || {}

TETRIS.Model = TETRIS.Model || {}

TETRIS.Model.Grid = (function Grid() {
  var x = 0,
      y = -2,
      color = "#a36eaa",
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
      row[c] = new TETRIS.Model.Pixel(squareOptions);
    }
    return row;
  };

  var clearFull = function clearFull(clear){
    var deletions = 0, temp;
    for(var r = this.rows - 1; r >= deletions; r--){
      // if(r - deletions === 0) break;
      var full = true;
      for(var c = 0; c < this.width; c++){
        if(matrix[r][c].filled === false){
          full = false;
          break;
        }
      }
      if(full){
        deletions++;
        for(var c = 0; c < this.width; c++){
          matrix[r][c].filled = false;
        }
        // matrix.push(matrix.splice(r,1))
        var temp = matrix[r];
        for(var nr = r; nr >= deletions; nr--){
          matrix[nr] = matrix[nr - 1];
        }
        matrix[deletions] = temp;
        r--;
      }
      cleared = deletions;
    }
  };
  var each = function each(cb, rowCount) {
    var i = 0;
    var breakOut = false
    for(var r = 0; r < (rowCount || rows); r++){
      for(var c = 0; c < columns; c++) {
        breakOut = cb(matrix[r][c], i)
        if(breakOut) return;
        i++;
      }
    }
  };
  var pixels = function pixels(rowCount) {
    var pixels = [];
    var n = 0;
    var _this = this;
    if(cleared){
      rowCount = undefined;
      cleared = false
    }
    each(function(pixel, rowCount){
      if(pixel.filled){
        pixels.push({
          x: pixel.x + _this.x,
          y: pixel.y + _this.y,
          color: "#a36eaa"
        })
        n++;
        if(n === set) return true;
      }
    })

    return {pixels: pixels, rows: rowCount}
  };
  var matrix = initializeMatrix();
  return {
    x: 0,
    y: -2,
    columns: columns,
    rows: rows,
    clearFull: clearFull,
    pixels: pixels
  }
})();
