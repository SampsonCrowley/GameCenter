var WHACK = WHACK || {};

WHACK.Mole = (function() {
  var moles = [],
      score = 0,
      multiplier = 1,
      audio = new Audio('wilhelm.mp3');

  var Mole = function Mole () {
    var cheekyBastard = false,
        _hungry = true,
        _angry = "maybe",
        _screech = "AAARGH",
        _timeout;

    var emitScreech = function emitScreech () {
      console.log(_screech);
      return _screech;
    };

    var isCheeky = function isCheeky() {
      return !!cheekyBastard;
    };

    var wreck = function wreck() {
      cheekyBastard = false;
      clearTimeout(_timeout)
      return isCheeky();
    };

    var blandiloquate = function blandiloquate() {
      cheekyBastard = true;
      _timeout = setTimeout(wreck, 1000)
      return isCheeky();
    };

    var starving = function starving() {
      return _hungry;
    };

    var pissedOff = function pissedOff() {
      return _angry;
    };

    return {
      pissedOff: pissedOff,
      starving: starving,
      blandiloquate: blandiloquate,
      wreck: wreck,
      cheeky: isCheeky
    }
  };

 var _incrementScore = function _incrementScore(){
   score += Math.floor(1 * multiplier);
   multiplier += .4
 }
 var _destroyMultiplier = function _destroyMultiplier() {
   multiplier = 1;
 }

  var randomCheeky = function randomCheeky(){
    if(Math.random() > .7){
      var moles = getMoles()
      var cheekyMole = moles[Math.floor(Math.random() * moles.length)];
      cheekyMole.blandiloquate();
    }
  }

  var click = function click(id){
    var clickedMole = getMoles()[+id];
    if(clickedMole.cheeky()){
      audio.pause()
      audio.currentTime = 0
      audio.play()
      _incrementScore();
    } else {
      _destroyMultiplier();
    }
    clickedMole.wreck();
  }

  var getMoles = function(){
    return moles;
  };

  var getScore = function getScore() {
    return score;
  }

  var _addMole = function(){
    moles.push(Mole())
    return getMoles();
  };
  var init = function init (){
    for(i = 0; i < 8; i++){
      _addMole();
    }
  }

  return {
    init: init,
    moles: getMoles,
    score: getScore,
    random: randomCheeky,
    click: click
  }

})();
