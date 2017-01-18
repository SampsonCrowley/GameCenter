"use strict";

TETRIS = TETRIS || {}

TETRIS.Controller = (function(view, model){
  var now,
      then;

  var _animationSpeed = function _animationSpeed(){
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
  };

  var _frame = function _frame(){
    now = Date.now() - then
    if(now > 200){
      model.drop();
      then = Date.now()
    }
    // if(now % 20 === 0)
    model.movement();
  };

  var _animate = function _animate(){
    _frame();
    view.renderEntities(model.pixels());
    requestAnimationFrame(_animate)
  };

  var init = function init(){
    model.init();
    view.init({
      keyDown: model.startKey,
      keyUp: model.stopKey
    });
    _animationSpeed();
    then = Date.now();
    _animate();
  };

  return { init: init }

})(TETRIS.View, TETRIS.Model)
