const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var inputPattern = [];

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var chosenColor = buttonColors[randomNumber];
    gamePattern.push(chosenColor);
    
    playSound(chosenColor);
    $("#"+chosenColor).fadeIn(150).fadeOut(150).fadeIn(150);
}

function playSound(fileName) {
    let audioFile = new Audio('./assets/'+fileName+'.mp3');
    audioFile.play();
}

function animateClicked(color) {
    $("#"+color).addClass("button-pressed");
    setTimeout(function() {
        $("#"+color).removeClass("button-pressed");
    }, 400);
}

$(document).ready(function() {
    $(".item-button").click(function() {
        let inputColor = $(this).attr("id");
        inputPattern.push(inputColor);
        playSound(inputColor);
        animateClicked(inputColor);
    });
});

$(window).keydown(function(event) {
    if(event.keyCode == 32) {
        alert("You pressed me!");
    }
});