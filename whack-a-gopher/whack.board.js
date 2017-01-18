var WHACK = WHACK || {};

WHACK.Board = (function(){
  var _board,
      _moles,
      _hammer;

  var createBoard = function createBoard() {
    var board = document.createElement("WHACK-A-MOLE");
    document.body.appendChild(board);
    return board;
  }
  
  var createEl = function createEl(tag) {
    return document.createElement(tag);
  }

  var createMoles = function createMoles() {
    for(i = _moles.length; i < 8; i++){
      var square = createEl("DIV");
      square.classList.add("mole");
      _board.appendChild(square);
    }
  }
  var createScoreBoard = function createScoreBoard() {
    var scoreBoard = createEl("DIV");
    scoreBoard.classList.add("scoreboard");
    scoreBoard.innerHTML = "Score: ";
    _board.appendChild(scoreBoard);
    return scoreBoard;
  }

  var addMoleData = function addMoleData(){
    for(i = 0; i < _moles.length; i++){
      _moles[i].setAttribute("data-id", i)
    }
  }

  var setupBoard = function setupBoard(){
    _board = document.getElementsByTagName("WHACK-A-MOLE")[0] || createBoard();
    _moles = _board.getElementsByClassName("mole");
    _scoreBoard = _board.getElementsByClassName("scoreboard")[0] || createScoreBoard();
    if(_moles.length < 8) createMoles();
    addMoleData();
    _hammer = createHammer();
  }

  var createHammer = function createHammer(){
    var hammerImg = document.createElement("IMG");
    hammerImg.src = "https://openclipart.org/image/2400px/svg_to_png/196484/wooden-mallet-magnesusversion.png";
    hammerImg.classList.add("hammer");
    _board.appendChild(hammerImg);
    return hammerImg;
  }

  var hammer = function(e) {
    _hammer.setAttribute("style", "top: " + e.layerY + "px; left: " + e.layerX + "px")
  }

  var swingHammer = function(){
    _hammer.classList.add("swing")
    animationEvent && _hammer.addEventListener(animationEvent, function() {
      _hammer.classList.remove("swing")
    });
  }
  /* From Modernizr */
  function whichAnimationEvent(){
      var t;
      var el = document.createElement('fakeelement');
      var animations = {
        'animation':'animationend',
        'OAnimation':'oAnimationEnd',
        'MozAnimation':'animationend',
        'WebkitAnimation':'webkitAnimationEnd'
      }

      for(t in animations){
          if( el.style[t] !== undefined ){
              return animations[t];
          }
      }
  }

  /* Listen for a animation! */
  var animationEvent = whichAnimationEvent();

  var listeners = function(cb){
    if(cb.click){
      _board.addEventListener('click', function(e){
        cb.click(e.target.getAttribute("data-id"))
        swingHammer()
      })
    }
    _board.addEventListener("mousemove", function(e){
      hammer(e);
    });
  }

  var init = function init(callbacks){
    setupBoard();
    listeners(callbacks);
  }

  var render = function render(moleData, score){
    for(i = 0; i < moleData.length; i++){
      if(moleData[i].cheeky()){
        _moles[i].classList.add("cheeky");
      } else {
        _moles[i].classList.remove("cheeky");
      }
    }
    _scoreBoard.innerHTML = "Score: " + score
  }

  return {
    init: init,
    render: render
  }
})()
