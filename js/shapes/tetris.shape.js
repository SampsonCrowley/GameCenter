"use strict";

TETRIS = TETRIS || {}

TETRIS.Shape = (function Shape(pixel, grid) {

      var initializeMatrix = function initializeMatrix(diameter) {
        var matrix = new Array(Math.pow(diameter, 2));
        for(var c = 0; c < diameter; c++){
          setColumn(c, diameter, matrix);
        }
        return matrix;
      };

      var setColumn = function setColumn(c, diameter, matrix) {
        var squareOptions = {};
        for(var r = 0; r < diameter; r++){
          squareOptions = { x: c, y: r };
          matrix[c + "_" + r] = new pixel(squareOptions);
        }
      };

      var Shape = function Shape(options){
        this.orientation = 0;
        this.diameter = options.diameter;
        this.x = grid.offset(this.diameter);
        this.y = options.y || -1;
        this.color = options.color;
        this.matrix = initializeMatrix(options.diameter);
        this.collidable = {
          xl: 50,
          xr: 0,
          y: 0,
          pixels: new Array(4)
        };
      }

      Shape.prototype.fillMatrix = function fillMatrix(filled, clear) {
        var n = 0;
        this.collidable.xl = 50;
        this.collidable.xr = 0;
        this.collidable.y =  0;
        if(this.collidable.pixels[0]){
          for(var i = 0; i < 4; i++){
            var pix = this.collidable.pixels[i]
            this.matrix[pix.x + "_" + pix.y].filled = false;
          }
        }

        for(var point in filled){
          this.matrix[point].filled = (clear ? false : true);
          this.collidable.pixels[n] = this.matrix[point];
          this.collidable.xl = Math.min(this.collidable.xl, this.matrix[point].x)
          this.collidable.xr = Math.max(this.collidable.xr, this.matrix[point].x)
          this.collidable.y = Math.max(this.collidable.y, this.matrix[point].y)
          n++
        }
      };

      Shape.prototype.pixels = function pixels() {
        var pixels = new Array(4);

        for(var i = 0; i < pixels.length; i++){
          pixels[i] = {
            x: this.collidable.pixels[i].x + this.x,
            y: this.collidable.pixels[i].y + this.y,
            color: this.color
          }
        }
        return pixels;
      };


      Shape.prototype.rotate = function rotate(degrees) {
        this.updateMatrix(true);
        this.orientation += degrees
        if(this.orientation < 0) {
          this.orientation += 360;
        } else if(this.orientation >= 360) {
          this.orientation -= 360;
        }
        this.updateMatrix();
        this.strafe(0);
      };

      Shape.prototype.strafe = function strafe(columns) {
        this.x += columns
        if(this.x + this.collidable.xl < 0) {
          this.x = 0 - this.collidable.xl;
        } else if(this.x + (this.collidable.xr + 1) > grid.columns) {
          this.x = grid.columns - (this.collidable.xr + 1);
        }
      };

  return Shape;

})(TETRIS.Pixel, TETRIS.Grid);
