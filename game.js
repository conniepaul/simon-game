let gamePattern = []
let userClickedPattern = []

let buttonColours = ["purple", "coral", "yellow", "pink"];
let level = 0;
let started = false;

// Function Definition


function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber]; // Selects colour randomly
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

function playSound(name){
    let soundPlayed = "sounds/" + name + ".mp3"; // Creates soundPlayed variable that will be used to save audio file path
    let audio = new Audio(soundPlayed);
    audio.play();
}

function animatePress(currentColour){
    
    $(".btn." + currentColour).fadeOut().fadeIn();
    $("#" + currentColour).addClass("pressed")
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 1);
}

function checkAnswer(currentLevel){

    let result;

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
            if (userClickedPattern.length == gamePattern.length){
                setTimeout(function(){nextSequence()},1000);
            }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over!");
        $(".subtitle").removeClass("subtitle-visibility").text("Press Any Key To Restart");
        startOver();
    };


};

function startOver(){
    started = false;
    gamePattern = [];
    level = 0;
}

// Main

$(document).on("keypress", function(){

    if(started === false){
        $("#level-title").text("Level " + level);
        $(".subtitle").addClass("subtitle-visibility");
        started = true;
        nextSequence();
    }
});



$(".btn").click(function() {

    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern)
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  });




