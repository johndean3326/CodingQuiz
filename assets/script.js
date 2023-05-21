const start_btn = document.querySelector(".start_btn");
const rules_box = document.querySelector(".rules_box");
const exit_btn = document.querySelector(".quit");
const continue_btn = document.querySelector(".restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = document.querySelector(".timer_sec");
const timeLine = document.querySelector(".time_line");
const timeOff = document.querySelector(".time_left_text");


start_btn.onclick = ()=>{
    console.log("clicked")
    rules_box.classList.add("activeInfo");
}
exit_btn.onclick = ()=>{
    rules_box.classList.remove("activeInfo");
}
continue_btn.onclick = ()=>{
    rules_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz")
    showQuestions(0);
}

let que_count = 0;
let que_numb =1;
let counter =0;
let counterLine =0;
let timeValue =15;
let widthValue =0;
let userScore =0;

function total_que (que_numb){
    console.log(que_numb)
}
const next_btn = document.querySelector(".next_btn");
const results = document.querySelector(".results");
const restart_quiz = document.querySelector(".restart");
const quit_quiz = document.querySelector(".buttons .quit");
const timeText = document.querySelector(".time_left_txt");
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    results.classList.remove("activeResult"); //hide result box
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(que_count); //calling showQuestions function
    total_que(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent ="time left"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
}

quit_quiz.onclick =()=>{
    window.location.reload();
}

next_btn.onclick =()=>{
    if(que_count > questions.length -1){
    que_count++;
    que_numb++;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    }else{
    console.log("Questions Completed");
}
}                    
function handleBtnClick (event)
{
    event.preventDefault()
    
        let correctAns = questions[que_count].answer;
        console.log(correctAns)
        let selectedOption = event.target.innerHTML;
        if (parseInt(selectedOption) === parseInt(correctAns)){
            
            userScore += 1;
            console.log(userScore)
            que_count = que_count +1
            showQuestions(que_count)
        } else {
            que_count = que_count +1
            showQuestions(que_count)
        
        }

    
    
    
    
}
    function showQuestions(index){
        if (que_count < questions.length){
    const que_text = document.querySelector(".que_text");
    const option_list = document.querySelector(".option_list");
    que_text.innerHTML = "";
    option_list.innerHTML = "";
        let que_tag ='<span>' + questions[index].question + '</span>';
        let option_tag = '<button onclick="handleBtnClick(event)" class="option">'+ questions[index].options[0] +'<span></span></button>'
                        + '<button onclick="handleBtnClick(event)" class="option">'+ questions[index].options[1] +'<span></span></button>'
                        + '<button onclick="handleBtnClick(event)" class="option">'+ questions[index].options[2] +'<span></span></button>'
                        + '<button onclick="handleBtnClick(event)" class="option">'+ questions[index].options[3] +'<span></span></button>';

    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
} else {
    alert("quiz questions ended")
}
}


function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = question[que_count].answer;
    let allOptions = option_list.children.length;
    if(userAns == correctAns){
        userScore += 1;
        console.log(userScore)
        answer.classList.add("correct");
        console.log("Answer is Correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    }
    else{
        answer.classList.add("incorrect");
        console.log("wrong answer")
        answer.insertAdjacentHTML("beforeend", crossIcon);

        
    for (let i = 0; i < allOptions; ii++) {
        if(option_list.children[i].textContent == correctAns){
            option_list.children[i].setAttribute("class", "option correct");
            option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
        }
    }
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");    
    next_btn.style.display = "block";
}
}
}

function showResults(){
    rules_box.classList.remove("activeInfo");
    quiz_box.remove("activeQuiz");
    results.classList.add("active result");
    const scoreText =results.querySelector(".score_text");
    if(userScore > 5){
        let scoreTag = '<span>Awesome! You got <p>' + userScore + '</p> out of <p>' + questions.length +'</p><?span>';
        scoreText.innerHTML = scoreTag;    
    }
    else if(userScore > 3){
        let scoreTag = '<span>OK! You got <p>' + userScore + '</p> out of <p>' + questions.length +'</p><?span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>Oops! You only got <p>' + userScore + '</p> out of <p>' + questions.length +'</p><?span>';
        scoreText.innerHTML = scoreTag;
    }
}
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearTimeout(counter);
            timeCount.textContent = "00";
            // timeOff.textContent= "time off"

            let correctAns = questions[que_count].answer;
            let allOptions = option_list.children.length;

            for (let i = 0; i < allOptions; ii++) {
                if(option_list.children[i].textContent == correctAns){
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }
        
            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.display = "block";
            }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        timeLine.style.width = time + "px";
        if(time > 549){
            return;
        }
    }
}
function quizEnd() {
    // stop timer
    clearInterval(timerId);
  
    // show end screen
    var endScreenEl = document.getElementById('end-screen');
    endScreenEl.removeAttribute('class');
  
    // show final score
    var finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = time;
  
    // hide questions section
    questionsEl.setAttribute('class', 'hide');
  }
function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCountTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCountTag;  //adding new span tag inside bottom_ques_counter
}
