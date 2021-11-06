var timerEl = document.querySelector(".timer");
var introEl =document.querySelector(".intro");
var startQuizBtn = document.querySelector(".start-quiz");
var quizEl = document.querySelector("#quiz-container");
var questionEl = document.querySelector(".question");
var resultEl = document.querySelector(".result");
var scoreEl = document.querySelector(".final-score");
var formEl = document.querySelector("#initials-form");
var ulEl;
var timer = 75;
var i = 0;
var score = 0 ;
var highscoresArr =[];
var countQues=0;
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
    
  if(timer < 0){
  clearInterval(countdown);
  gameOver();
   }
  else{
   timerEl.textContent ="Time: "+timer;
   timer-- ;  
}
}

function nextQuestion(){
    countQues++;
    if(i<questions.length){
        resultEl.classList.add("hide");
        questionEl.textContent = countQues+". "+ questions[i].question;
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
        ulEl = document.querySelector(".options");
         }
         else{
             gameOver();
            //  console.log(timer);
            //  return score=timer;
             
     }
    

}
function startQuiz(){
    accuracy=0;
    countdown = setInterval(CountDown,1000);
    introEl.classList.add("hide");
   setTimeout(function(){
       quizEl.classList.remove("hide");
   }, 1000); 
    nextQuestion(questions);
    ulEl.addEventListener("click",checkAnswer);
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
        accuracy++;
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
        if(timer>0){
        i++;
        nextQuestion();}
        else{
            
            gameOver();
            //score=0;
        }
    }
    //console.log(score);
    //return score = timer;
}
 function gameOver(){
//      if(accuracy==0 || timer<0){
//          score=0;
//   }
    clearInterval(countdown);
    quizEl.classList.add("hide");
    scoreEl.textContent = score;
    resultEl.classList.remove("hide");
    console.log(accuracy);
 }

// startQuizBtn.addEventListener("click",startQuiz);
function saveScore(){
    var initials = document.querySelector("input[name='initials']").value;
    var highscoreObj ={
        name: initials,
        score: score
    };
    highscoresArr.push(highscoreObj);
    localStorage.setItem("highscore", JSON.stringify(highscoresArr));
}
function loadHighscores(){
    var  localData = localStorage.getItem("highscore");
    highscoresArr = JSON.parse(localData);
    if(highscoresArr === null){
        highscoresArr=[];
    }
    
}
function listHighscores(){
var listEl = document.querySelector("#highscores-list");

for (var i = 0; i < highscoresArr.length; i++) {
    var liEl = document.createElement("li");
    liEl.textContent = highscoresArr[i].name +" - "+highscoresArr[i].score;
    listEl.appendChild(liEl);
    
}
}
function clearHighscores(){
    localStorage.clear();
    loadHighscores();
    var liEl = document.querySelectorAll("#highscores-list li");
    for (var i = 0; i < liEl.length; i++) {
        liEl[i].remove();
        
    }
    // liEl.remove("li");

}
loadHighscores();
//formEl.addEventListener("submit",saveScore);