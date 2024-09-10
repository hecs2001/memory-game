const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var inputPattern = [];
var gameStarted = false;
var gameLevel = 0;

function resetGame() {
    gamePattern = [];
    inputPattern = [];
    gameLevel = 0;
}

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var chosenColor = buttonColors[randomNumber];
    gamePattern.push(chosenColor);

    inputPattern = [];
    gameLevel++;
    $(".item-title").text("Level "+gameLevel);

    playSound(chosenColor);
    $("#"+chosenColor).fadeIn(150).fadeOut(150).fadeIn(150);
}

function checkSequence(sequence, color) {
    if(gameStarted) {
        if(inputPattern[sequence] == gamePattern[sequence]) {
            if(inputPattern.length === gamePattern.length) {
                $(".item-title").text("Level "+gameLevel+" Completed");
                setTimeout(function(){
                    nextSequence();
                }, 1000);
            }
        } else {
            $(".item-title").text("Game Over");
            $("body").addClass("game-over");
            gameStarted = false;
            setTimeout(function() {
                $("body").removeClass("game-over");
                $(".item-title").text("Press 'space' to Restart");
            }, 500);
            return "wrong";
        }
    }
    return color;
}

function playSound(fileName) {
    let audioFile = new Audio('./assets/'+fileName+'.mp3');
    audioFile.play();
}

function animateClicked(color) {
    $("#"+color).addClass("button-pressed");
    setTimeout(function() {
        $("#"+color).removeClass("button-pressed");
    }, 300);
}

$(document).ready(function() {
    $(".item-button").click(function() {
        let inputColor = $(this).attr("id");
        inputPattern.push(inputColor);
        
        let result = checkSequence((inputPattern.length-1), inputColor);
        playSound(result);
        animateClicked(inputColor);
    });
});

$(window).keydown(function(event) {
    if(event.keyCode == 32) {
        if(!gameStarted) {
            resetGame();
            nextSequence();
            gameStarted = true;
        } else {
            if(confirm("Game is still ongoing. RESTART?") == true) {
                resetGame();
                nextSequence();
            }
        }
    }
});