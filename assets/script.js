


// !!!!!!!!!!!!!!!!!!!!!!!!.addEventListener('click', startGame);

 var interval;

function countdown() {
    clearInterval(interval);
    interval = setInterval( function() {
        var timer = $('.js-timeout').html();
        timer = timer.split(':');
        var minutes = timer[0];
        var seconds = timer[1];
        seconds -= 1;
        if (minutes < 0) return;
        else if (seconds < 0 && minutes != 0) {
            minutes -= 1;
            seconds = 59;
        }
        else if (seconds < 10 && length.seconds != 2) seconds = '0' + seconds;
  
        $('.js-timeout').html(minutes + ':' + seconds);
  
        if (minutes == 0 && seconds == 0) clearInterval(interval);
    }, 1000);
  }
  
  $('#js-startTimer').click(function () {
    $('.js-timeout').text("2:00");
    countdown();
  });
  
  $('#js-resetTimer').click(function () {
    $('.js-timeout').text("2:00");
    clearInterval(interval);
  });

function startGame() {
    startButtonElement.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    beginningTextElement.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    score = 0;
    gameEnd = false;
    time = 120;
    timer.textContent = 'Time: ' + time;
    setTime();
    setNextQuestion();   
};

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
};

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
};

function resetState() {
    nextButtonElement.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(event) {
    const selectedButtonElement = event.target;
    const correct = selectedButtonElement.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if (correct) {
        score += 10;
    } else {
        time -= 15;
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
    currentQuestionIndex++;
    setNextQuestion();
    } else {  
       gameEnd = true; 
       endGame();  
    }
};

    function endGame () {
        endTextElement.classList.remove('hide');
        finalScoreElement.classList.remove('hide');
        finalScoreElement.innerText = "Your final score is "+ score + " points." ;
        questionContainerElement.classList.add('hide');
        submitButtonElement.addEventListener('click', highScores);
        
        
}

function highScores() {
    
    scoresElement.classList.remove('hide');
    endTextElement.classList.add('hide');
    localStorage.setItem(inputTextElement.value, JSON.stringify(score));
    while (ulElement.firstChild) {
        ulElement.removeChild(ulElement.firstChild)
    }
    for (var i = 0, len = localStorage.length; i < len; ++i) {
        JSON.parse(localStorage.getItem(localStorage.key (i)));
        let liElement = document.createElement('li'); 
        liElement.innerText = localStorage.key (i) + " : " + localStorage.getItem(localStorage.key (i));
        ulElement.append(liElement);   
    }


    restartButtonElement.addEventListener('click', newGame);  
}

function newGame () {
    beginningTextElement.classList.remove('hide');
    startButtonElement.classList.remove('hide');
    scoresElement.classList.add('hide');
    endTextElement.classList.remove('hide');
    endTextElement.classList.add('hide');
    finalScoreElement.classList.add('hide');
    inputTextElement.value = "";
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}; 

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question:"How many time zones are there in Russia",
        answers:[
            { text: "4", correct: false },
            { text: "9", correct: false },
            { text: "2", correct: false },
            { text: "11", correct: true },
        ],
        
    }, 
    {
         question:"What is the national flower of Japan?",
         answers:[
            { text: "Cherry Blossom", correct: true },
            { text: "Lotus Flower", correct: false },
            { text: "Orange Bud", correct: false },
            { text: "Peace Lilly", correct: false },
         ], 
        
    }, 
    {
         question:"What country has the most islands in the world?",
         answers:[
            { text: "Japan", correct: false },
            { text: "Sweden", correct: true },
            { text: "Philippines", correct: false },
            { text: "USA", correct: false },            
         ],
          
    }, 
    {
         question:"What year was the world wide web created",
         answers:[
            { text: "1989", correct: false },
            { text: "1991", correct: false },
            { text: "1990", correct: true },
            { text: "1988", correct: false },
         ],
    },
    {
        question:"Where was the first modern Olympic Games held? ",
        answers:[
        { text: "Athens", correct: true },
        { text: "Rome", correct: false },
        { text: "Quebec", correct: false },
        { text: "Boston", correct: false },
        ],
       
    },
    {
        question:"What was the clothing company Nike originally called?",
        answers:[
        { text: "PHIL's PHEELS", correct: false },
        { text: "NIKE", correct: false },
        { text: "Blue Ribbon Sports", correct: true },
        { text: "CHECKS", correct: false },
        
        ],
        
    },
    {
        question:"When was Netflix founded",
        answers:[
        { text: "1994", correct: false },
        { text: "1997", correct: true },
        { text: "1995", correct: false },
        { text: "2000", correct: false },
        ],
        
    }, 
    {
        question:"Name Disney’s first film?",
        answers:[
        { text: "Pinnochio", correct: false },
        { text: "Snow White", correct: true },
        { text: "Little Mermaid", correct: false },
        { text: "TED", correct: false },
        ],
    },

 ];