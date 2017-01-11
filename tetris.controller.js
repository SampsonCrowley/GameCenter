TETRIS = TETRIS || {}
TETRIS.Controller = TETRIS.Controller || {}

TETRIS.Controller.init = function init(){
  this.view = TETRIS.View;
  this.model = TETRIS.Model;
  this.model.init();
  this.view.init();
  this.animationSpeed();
  this.then = Date.now();
  this.animate();
};

TETRIS.Controller.animationSpeed = function animationSpeed(){
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
};

TETRIS.Controller.drop = function drop(){
  this.now = Date.now() - this.then
  if(this.now > 1000){
    // this.model.drop();
    this.then = Date.now()
  }
};

TETRIS.Controller.animate = function animate(){
  requestAnimationFrame(function(){TETRIS.Controller.animate()})
  // this.model.move();
  this.drop();
  this.view.renderEntities({shapes: this.model.shapes});
};
