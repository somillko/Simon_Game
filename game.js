var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];
var userClickedPattern = [];
var level = 0;

function makeSound(color)
{
  var audio;
  switch (color) {
    case "red": audio = new Audio("sounds/red.mp3"); break;
    case "blue": audio = new Audio("sounds/blue.mp3"); break;
    case "yellow": audio = new Audio("sounds/yellow.mp3"); break;
    case "green": audio = new Audio("sounds/green.mp3"); break;
    default: console.log(color);
  }
  audio.play();
}

function animatePress(currentColour)
{
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  makeSound(userChosenColour);
  animatePress(userChosenColour);
  var ll = userClickedPattern.length;
  checkAnswer(ll-1);
})

function nextSequence()
{
  userClickedPattern = [];
  $("#level-title").html("Level " + level);
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  // console.log(randomChosenColour);
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  makeSound(randomChosenColour);
}
// Important piece of code, can't think it yourself sirf ek hi keypress pe nextseqience call akrna, to uski
// value ko toggle karna padega jisse sirf ek baar hi wo code chale.
var started = false;
$(document).keypress(function() {
    if(!started)
    {
      $("#level-title").html("Level " + level);
      level++;
      started = true;
      nextSequence();
    }
});

function startOver()
{
  level = 0;
  started = false;
  gamePattern = [];
}


function checkAnswer(currentLevel)
{
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
  {
    console.log("success");
    if(userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function () {
        nextSequence();

      }, 1000);
    }
  }
  else{
    // if the sequence does not match to ye sab karna
    var ttaudio = new Audio("sounds/wrong.mp3");
    ttaudio.play();
    $("h1").html("Game Over!! Press any key to restart");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
    console.log("wrong");
  }
}


// this works pretty well. kyuki har click pe function checkanswer call ho rha to sequence bhi sahi hai ya nhi check kari jaa rhi, aur jab
// user ki enter ki hui sari sequence match ho jati to level update ho jata.lekin level update pe pura user ki sequence khali karni kyuki
// user ko phir se puri sequence dalni. full sequence matching ho gyi without any loops to phir level up. jaha galat waha pe console me
// wrong ka output aa jata, to agar user ki kahi bhi sequence galat hui, to whi pe it breaks and wrong print kar deta console me.
