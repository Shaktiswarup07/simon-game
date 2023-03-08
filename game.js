// alert("Hello");
var gamePattern=[];
var buttonColors=["red","blue","green","yellow"];

var userClickedPattern=[];
var started=false;
var level=0;


//--------------------------PLAYING SOUNDS ON BTN CLICKS--------------------

function playSound(Color){
    var audio=new Audio("sounds/" +Color+".mp3");
    audio.play();
}

//------------------------ANIMATING BLOCKS ON PRESSES----------------------------

function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed");
    },120);
}



//---------------------CHECK ANSWER, UserCLICKED AND GamePATTERN------------------


function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length===gamePattern.length){

            setTimeout(function(){
                nextSequence();
            },1000);
            
        }
    } else {
        console.log("wrong");
        var wrongaudio=new Audio("sounds/wrong.mp3");
        wrongaudio.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over! Press any key to Restart.");

        startOver();

        
        
    }
}


//----------------------WHAT'S HAPPENING ON BUTTON CLICK---------------------


$(".btn").click(function(){

    var userChosenColor=$(this).attr("id");

    userClickedPattern.push(userChosenColor);

    // console.log(userClickedPattern);
    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});


//----------------------WHAT'S HAPPENING ON FIRST KEYPRESS---------------------


$(document).keypress(function(){
    if(!started){

        $("h1").text("Level "+level);
        nextSequence();
        started=true;
        
    }
    
});

//-----------------------------------NEXT SEQUENCE------------------------------

function nextSequence(){

    userClickedPattern=[];

    level++;
    $("h1").text("Level "+level);

    var randomNumber=Math.floor(Math.random()*4);

    var randomChosenColor=buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

    
}

//-------------------START OVER-------------------------


function startOver(){
    level=0;
    userClickedPattern=[];
    gamePattern=[];
    started=false;
}

