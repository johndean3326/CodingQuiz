var time = document.getElementById("Timer");
var questions = document.getElementById("questions");
var time = document.getElementById("Timer");
var questions = document.getElementById("questions");
var title = document.getElementById("Header");
var startBtn = document.getElementById("startBtn");
var container = document.getElementById("anwsers");
var scoreHere = document.getElementById("score");
var score = localStorage.getItem("score1");
var initials = document.getElementById("scoreButton");
var leaderboard = document.getElementById("hiScores");
var questionsList = [
    {
        question:"How many time zones are there in Russia",
        anwsers:[
            "4",
            "9",
            "2",
            "11"
        ],
        correct: "11",
    },
 
    {
         question:"What is the national flower of Japan?",
         anwsers:[
             "cherry blossom",
             "lotus flower",
             "orange bud",
             "peace lilly"
         ], 
         correct: "cherry blossom",
     },
 
     {
         question:"What country has the most islands in the world?",
         anwsers:[
             "japan",
             "sweden",
             "philippines",
             "usa"
         ],
         correct: "sweden, 220,000",
     },
 
     {
         question:"What year was the world wide web created",
         anwsers:[
             "1989",
             "1991",
             "1990",
             "1988"
         ],
         correct: "1990",
     },
     {
        question:"Where was the first modern Olympic Games held? ",
        anwsers:[
            "Athens",
            "Rome",
            "Quebec",
            "Boston"
        ],
        correct: "Athens, 1896",
    },
    {
        question:"What was the clothing company Nike originally called?",
        anwsers:[
            "PHIL's PHEELS",
            "NIKE",
            "Blue Ribbon Sports",
            "CHECKs"
        ],
        correct: "Blue Ribbon Sports",
    },
    {
        question:"When was Netflix founded",
        anwsers:[
            "1994",
            "1997",
            "1995",
            "2000"
        ],
        correct: "1997",
    }, 
    {
        question:"Name Disney’s first film?",
        anwsers:[
            "pinnochio",
            "snow white",
            "little mermaid",
            "TED"
        ],
        correct: "Snow White, 19370",
    },

 
 ];
 

startBtn.addEventListener('click', startQuiz);

function startQuiz() {
    startBtn.classList.add('hide');
    questions.classList.remove('hide');
    anwsers.classList.remove('hide');
    questionsList[0];
    Countdown();
    console.log("its working");
    displayQuestion();
    displayButton();
    score = 0;
}

function displayButton() {
    container.innerHTML = " ";
    
    for (var i = 0; i < questionsList[currentQuestion].anwsers.length; i++){
       var anwserButtons = document.createElement("button");
       anwserButtons.textContent = questionsList[currentQuestion].anwsers[i];
       anwserButtons.setAttribute("onclick", "nextQuestion(event)");
       container.appendChild(anwserButtons);
    }

}

function displayQuestion() {
    questions.innerHTML = " ";
    
    for (var i = 0; i < questionsList[currentQuestion].question.length; i++){
        var theQuestion = document.createElement("p");
        theQuestion.textContent = questionsList[currentQuestion].question[i];
        theQuestion.setAttribute("onclick", "nextQuestion(event)");
        questions.appendChild(theQuestion);
     }

}

function nextQuestion(event){
    var anwserChosen = event.target.innerHTML;
    if (anwserChosen === questionsList[currentQuestion].correct){
        score++;
        console.log(score);
        localStorage.setItem("score1", score);
    } else {
        secondsLeft-= 10;
    }
    if(currentQuestion >= 3){
        console.log("finish");
        secondsLeft = 0;
        endGame();
    }
    currentQuestion++;
    displayButton();
    displayQuestion();
    
}

function Countdown() {


    secondsLeft = 59;

   var counter = setInterval(function() {
   if (secondsLeft >= 1){
       secondsLeft--;
       time.textContent = secondsLeft + " seconds left";
   }
   if (secondsLeft == 0) {
       time.textContent = '';        
       clearInterval(counter);
       endGame();
   }
   }, 1000);
}

var initialsInput = document.querySelector("#initials");
var leaderboardlist = document.querySelector("#list")
var submitButton = document.querySelector("#submitIn");


function displayLeaderboard(){
   scoreButton.classList.add('hide');
   var initials2 = localStorage.getItem("initials");
   leaderboardlist.textContent = initials2 + score;
}

function scoreButton() {
   initials.classList.remove('hide');
}

submitButton.addEventListener("click", function(event2)  {
   event2.preventDefault();
   localStorage.setItem("initials", initials)
   displayLeaderboard();
});

function score1() {
   scoreHere.textContent = "Your score is " + score;

   scoreButton();
   displayLeaderboard();
}

function endGame() {
   startBtn.classList.add('hide');
   questions.classList.add('hide');
   anwsers.classList.add('hide');
   scoreHere.classList.remove('hide');
 

   console.log("game ended");
   score1()
}

