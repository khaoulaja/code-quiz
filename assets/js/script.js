var timerEl = document.querySelector(".timer");
var introEl =document.querySelector(".intro");
var startQuizBtn = document.querySelector(".start-quiz");
var quizEl = document.querySelector("#quiz-container");
var questionEl = document.querySelector(".question");
var resultEl = document.querySelector(".result");
var correctionEl = document.querySelector(".correction");
var ulEl;
var timer = 75;
var i = 0;
var score = 0;
var countdown; 
var questions =[
    {
        "question": "Inside which HTML element do we put the JavaScript?",
        "options": ["<scripting>","<js>","<javascript>","<script>"],
        "answer":"<script>"
    },
    {
        "question": "Which of the following type of variable is visible everywhere in your JavaScript code?",
        "options": ["global variable","local variable","Both of the above","None of the above."],
        "answer":"global variable"
    },
    {
        "question": "Which built-in method sorts the elements of an array?",
        "options": ["changeOrder(order)","order()","sort()","None of the above"],
        "answer":"sort()"
    },
    {
        "question": "JavaScript is a ___ -side programming language.",
        "options": ["Client","Server","Both","None"],
        "answer":"Both"
    },
    {
        "question": "Which are the correct “if” statements to execute certain code if “x” is equal to 2?",
        "options": ["if(x 2)","if(x == 2)","if(x = 2)","if(x != 2 )"],
        "answer":"if(x == 2)"
    },
    {
        "question": "What will the code return?  Boolean(3 < 7)",
        "options": ["true","false","NaN","SyntaxError"],
        "answer":"true"
    },
    {
        "question": "Which method will you use to round the number 24.76 to the nearest integer?",
        "options": ["Math.round(24.76);","round(24.76);","rnd(24.76);","Math.rnd(24.76);"],
        "answer":"Math.round(24.76);"
    },
    {
        "question": "Which of the following statements will show a message as well as ask for user input in a popup?",
        "options": ["alert()","prompt()","confirm()","message()"],
        "answer":"prompt()"
    },
    {
        "question": "Which of the following is an event listener in JavaScript?",
        "options": ["onclick","blur","click","Click()"],
        "answer":"click"
    },
    {
        "question": "Which built-in method returns the index within the calling String object of the first occurrence of the specified value?",
        "options": ["getIndex()","indexOf()","location()","None of the above"],
        "answer":"indexOf()"
    }
];

function CountDown(){
    timer-- ;
  if(timer < 0){
  clearInterval(countdown);
   }
  else{
   timerEl.textContent ="Time: "+timer;
     
}
}

function nextQuestion(){
    if(i<questions.length){
        resultEl.classList.add("hide");
        questionEl.textContent = questions[i].question;
        var option1=document.getElementsByClassName("option")[0];
        var option2=document.getElementsByClassName("option")[1];
        var option3=document.getElementsByClassName("option")[2];
        var option4=document.getElementsByClassName("option")[3];
        option1.textContent="1. "+questions[i].options[0];
        option1.setAttribute("value",questions[i].options[0]);
        option2.textContent="2. "+questions[i].options[1];
        option2.setAttribute("value",questions[i].options[1]);
        option3.textContent="3. "+questions[i].options[2];
        option3.setAttribute("value",questions[i].options[2]);
        option4.textContent="4. "+questions[i].options[3];
        option4.setAttribute("value",questions[i].options[3]);
       // quizEl.innerHTML = "<h2>"+questions[i].question +"</h2><ul class='options'><li><button value='"+questions[i].options[0]+"'>1. "+questions[i].options[0]+"</button> </li><li><button value='"+questions[i].options[1]+"'>2. "+questions[i].options[1]+"</button></li><li><button value='"+questions[i].options[2]+"'>3. "+questions[i].options[2]+"</button></li><li><button value='"+questions[i].options[3]+"'>4. "+questions[i].options[3]+"</button></li></ul>";
         ulEl = document.querySelector(".options");
         }
         else{
             console.log("game over");
     }
    

}
function startQuiz(){
    countdown = setInterval(CountDown,1000);
    introEl.classList.add("hide");
    quizEl.classList.remove("hide");
    nextQuestion(questions);
    ulEl.addEventListener("click",checkAnswer);
    //i++;
}

function checkAnswer(event){
    var hrEl = document.createElement("hr");
    var iEl = document.createElement("i");
    var userAnswer =event.target.value;
    var correctAnswer = questions[i].answer;
    if(userAnswer === correctAnswer){
        iEl.textContent="correct!";
        quizEl.append(hrEl,iEl);
        setTimeout(function() {
            hrEl.remove();
            iEl.remove();
          }, 1000);
        console.log("correct!");
        score +=10;
        i++;
        nextQuestion();
    }
    else{
        iEl.textContent="wrong!";
        quizEl.append(hrEl,iEl);
        setTimeout(function() {
            hrEl.remove();
            iEl.remove();
          }, 1000);
        console.log("wrong!");
        timer-=10;
        i++;
        nextQuestion();
    }
    console.log(score);
    return score;
}


startQuizBtn.addEventListener("click",startQuiz);
