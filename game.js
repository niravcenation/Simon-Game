var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$("h1").click(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", function() {
    var userChoosenColor = (this.id);
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length - 1);

});

function nextSequence() {

    userClickedPattern = [];

    level++;
    $("h1").text("Level " + level);

    var randNum = Math.floor(Math.random() * 4);
    var randomChoosenColor = buttonColors[randNum];
    gamePattern.push(randomChoosenColor);

    for (var i = 0; i < gamePattern.length; i++) {
        sequenceCall(i);
    }


}

function sequenceCall(i) {
    setTimeout(function() {
        $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);

        playSound(gamePattern[i]);
    }, i * 500);
}

function playSound(audioName) {
    var audio = new Audio(audioName + '.mp3');
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {


    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        var audio = new Audio('wrong.mp3');
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key or click me to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}