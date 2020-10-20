//varibles decleretion
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var start = false;
var level = 0;

//onClick func for the buttons
$(".btn").on("click", function(){
  if(start){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
}});

//init the game
$("body").on("keypress",function(){
  if (!(start)) {
    $("#level-title").text("Level " + level);
    nextSequence();
    start = true;
  }
});

//func that generate the next sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor((Math.random()*4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//func that make a sound according to the pressed button
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//func that make press animation
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
    }, 100);
}


//func that check the user Answer
function checkAnswer(currentLevel) {
if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
  console.log("success");
  if ( (currentLevel + 1) === gamePattern.length ) {
    setTimeout(function(){
      nextSequence();
    }, 1000);
  }

} else {
  console.log("wrong");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
    }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
}
}

//func that restart the gave and at the next key press the game will restart
function startOver() {
  gamePattern = [];
  start = false;
  level = 0;
}
