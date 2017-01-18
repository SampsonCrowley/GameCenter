WHACK = WHACK || {}

WHACK.Controller = (function(board, mole){

  var interval,
      pause = false;

  var animationSpeed = function animationSpeed(){
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
  };

  var animate = function animate(){
    board.render(mole.moles(), mole.score());
    if(pause){
      return
    }
    requestAnimationFrame(animate)
  };

  var _moleLoop = function _gameLoop(){
    mole.random();
  }

  var click = function click(id) {
    mole.click(id);
  }

  var runGame = function runGame(){
    interval = setInterval(function(){
      _moleLoop();
    }, 300);
    pause = false;
    animate();
  }

  var pauseGame = function pauseGame(){
    clearInterval(interval);
    pause = true;
  }

  var init = function init () {
    animationSpeed();
    mole.init();
    board.init({
      click: click
    });
    runGame();
  }

  return {
    init: init,
    run: runGame,
    pause: pauseGame
  }

})(WHACK.Board, WHACK.Mole)
