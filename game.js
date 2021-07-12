const buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = []
var choosenBtn = "";
var startGame = false;
var gamePatternIndex = -1;
var currentLevel = 1;

// keypress event.
$(document).keypress(function(event) {

    if($("h1").text()=== "Press A Key to Start" || $("h1").text() === "Game Over, Press A Key to Start"){
        $("h1").text("Level 1");
        startGame = true;
        gamePattern = [];
        gamePatternIndex = -1;
        currentLevel = 1;
        flashButton(buttonColors[nextSequence()]);
    }
});

// click event for every button
$(".btn").click(function(event){
    
    if(startGame){
        if(gamePatternIndex === -1) gamePatternIndex = 0;

        // we exit if the index is -2 because we had a wrong answer before
        if(gamePatternIndex === -2) return;
        
        let wrongAnswer = false;
        // if the colour touched isnt the good one, the game stops and it must be reseted.
        if(event.target.id !== gamePattern[gamePatternIndex]){
            wrongAnswer = true;
            startGame = false;
            var wrongAudio = new Audio("./sounds/wrong.mp3");
            wrongAudio.play();
        }
        // play the button sound
        addSounds(event.target);

        let className = event.target.className;
        event.target.classList.add("pressed");
        if(wrongAnswer){
            $("body").addClass("game-over");
        }

        // create the animation for the pressed button.
        setTimeout(()=>{
            event.target.classList.remove("pressed");
            $("body").removeClass("game-over");
        }, 100);

        // if the answer was correct we continue the game.
        if(!wrongAnswer){
            gamePatternIndex ++;
            if(gamePatternIndex == gamePattern.length){
                setTimeout(function(){
                    flashButton(buttonColors[nextSequence()]);
                }, 500);
                gamePatternIndex = -1;
                currentLevel ++;
                $("h1").text("Level " + currentLevel);
            }
        }
        else{
            $("h1").text("Game Over, Press A Key to Start");
        }
    }
});

function nextSequence(){

    var randomNumber = Math.floor(Math.random() * 4);
    return randomNumber;
}


function addSounds(key){
    switch (key.id){
        case "blue":{
            var blueAudio = new Audio("./sounds/blue.mp3");
            blueAudio.play();
            break;
        }
        case "green":{
            var greenAudio = new Audio("./sounds/green.mp3");
            greenAudio.play();
            break;
        }
        case "red":{
            var redAudio = new Audio("./sounds/red.mp3");
            redAudio.play();
            break;
        }
        case "yellow":{
            var yellowAudio = new Audio("./sounds/yellow.mp3");
            yellowAudio.play();
            break;
        }
    }
}

function flashButton(color){
    $("#" + color).fadeOut(150).fadeIn(150);
    gamePattern.push(color);
}