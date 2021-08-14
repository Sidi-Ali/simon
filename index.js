
var buttonColours = ["green","red","yellow","blue"];
var userClickedPattern = [];
var gamePattern = [];

var level = 0;

function nextSequence(){
  level = level + 1;
  userClickedPattern = [];
  $(".levelTitle").html("Level "+ level);

  var randomNumber = Math.floor(Math.random() * 4) ;
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  playSound(randomChosenColour);

  
}

function playSound(event){
  $("#" + event).fadeOut(100).fadeIn(100);
  var buttonSound = new Audio("sounds/" + event +".mp3");
      buttonSound.play();
}


  $(".btn").on("click", function(event){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(event.target.id);
    animatePress(event.target.id);
    checkAnswer(userClickedPattern.length - 1);
  })


function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}


$(document).on("keydown", function(){
  if (level === 0){
    nextSequence();
  }else {
    console.log("Game started already!");
  }
})

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
     if (gamePattern.length === userClickedPattern.length ){
       setTimeout(function () {
         nextSequence();
       }, 1000);

    }

  }
  else {
    var wrongSound = new Audio ("sounds/wrong.mp3");
        wrongSound.play();

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];

}
