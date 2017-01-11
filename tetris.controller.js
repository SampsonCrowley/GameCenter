TETRIS = TETRIS || {}
TETRIS.Controller = TETRIS.Controller || {}

TETRIS.Controller.init = function init(){
  this.view = TETRIS.View;
  this.model = TETRIS.Model;
  this.model.init();
  this.view.init();
  this.animationSpeed();
  this.animate();
};

TETRIS.Controller.animationSpeed = function animationSpeed(){
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
};

TETRIS.Controller.animate = function animate(){
  requestAnimationFrame(function(){TETRIS.Controller.animate()})
  // this.model.move();
  this.view.renderEntities({shapes: this.model.shapes});
};
