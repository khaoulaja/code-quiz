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
        "options": ["global variable","local variable","Both of the above.","None of the above."],
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
    },
    {
        "question": "Which of the following is correct about the features of JavaScript?",
        "options": ["JavaScript is is complementary to and integrated with HTML.","JavaScript is open and cross-platform.","Both of the above.","None of the above."],
        "answer":"Both of the above."
    },
    {
        "question": "Which of these values is NOT considered false?",
        "options": ['0','"0"','null','""'],
        "answer":'"0"'
    },
    {
        "question": "Which built-in method returns the string representation of the number's value?",
        "options": ["ToValue()","ToNumber()","ToString()","None of the above."],
        "answer":"ToString()"
    },
    {
        "question": "A Function Associated With An object is Called",
        "options": ["Link","Function","Method","None"],
        "answer":"Method"
    },
    {
        "question": "Function is Used To Parse a String To Int:",
        "options": ["Int.Parse","Parse.Int","Integer.Parse","None"],
        "answer":"Int.Parse"
    },
    {
        "question": "If Button is clicked ______ Event Handler is invoked.",
        "options": ["OnSubmit()","OnLoad()","IsPostBack()","Onclick()"],
        "answer":"Onclick()"
    },
    {
        "question": "IsNaN() Evaluates And Argument To Determine if Given Value:",
        "options": ["Is Not a Null","Is Not a New Object","Is Not a Number","None Of The Above."],
        "answer":"Is Not a Number"
    },
    {
        "question": "Method Prompt() Contain ____ Number of Parameters.",
        "options": ["One","Two","Three","Zero"],
        "answer":"Two"
    },
    {
        "question": "JavaScript File Has An Extension of:",
        "options": [".Java",".javascript",".xml",".Js"],
        "answer":".Js"
    },
    {
        "question": "GetMonth() returns The Month as:",
        "options": ["Int","Char","String","Float"],
        "answer":"Int"
    }
];
//dislay the time left
function CountDown(){
    
  if(timer < 0){
//if timer reaches 0 stop the countdown      
  clearInterval(countdown);
  gameOver();
   }
  else{
   timerEl.textContent ="Time: "+timer;
   timer-- ;  
}
}
//display the next question
function nextQuestion(){
    // question number
    countQues++;
    if(i<questions.length){
        //hide the intro div
        resultEl.classList.add("hide");
        //show the question
        questionEl.textContent = countQues+". "+ questions[i].question;
        var option1=document.getElementsByClassName("option")[0];
        var option2=document.getElementsByClassName("option")[1];
        var option3=document.getElementsByClassName("option")[2];
        var option4=document.getElementsByClassName("option")[3];
        //list the options
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
     }
    
}
// start the test function
function startQuiz(){
    countdown = setInterval(CountDown,1000);
    introEl.classList.add("hide");
    //display quiz div after 1s so this latter and the timer could start at the same time
   setTimeout(function(){
       quizEl.classList.remove("hide");
   }, 1000); 
    nextQuestion(questions);
    ulEl.addEventListener("click",checkAnswer);
}
//check whether the answer is correct or wrong
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
        timer-=10;
        if(timer>0){
        i++;
        nextQuestion();
    }
        else{ 
            gameOver();   
        }
    }
   
}
//end the game + stop the timer + display the final score and the form
 function gameOver(){
    clearInterval(countdown);
    quizEl.classList.add("hide");
    scoreEl.textContent = score;
    resultEl.classList.remove("hide");
 }
//save score to the local storage
function saveScore(){
    var initials = document.querySelector("input[name='initials']").value;
    if(initials == ""){
        initials="Anonymous";
    }
    var highscoreObj ={
        name: initials,
        score: score
    };
    highscoresArr.push(highscoreObj);
    localStorage.setItem("highscore", JSON.stringify(highscoresArr));
}
// add saved score to the highscores array
function loadHighscores(){
    var  localData = localStorage.getItem("highscore");
    highscoresArr = JSON.parse(localData);
    if(highscoresArr === null){
        highscoresArr=[];
    }
    
}
//display saved highscores
function listHighscores(){
var listEl = document.querySelector("#highscores-list");

for (var i = 0; i < highscoresArr.length; i++) {
    var liEl = document.createElement("li");
    liEl.textContent = highscoresArr[i].name +" - "+highscoresArr[i].score;
    listEl.appendChild(liEl);
    
}
}
//delete local storage
function clearHighscores(){
    localStorage.clear();
    loadHighscores();
    var liEl = document.querySelectorAll("#highscores-list li");
    for (var i = 0; i < liEl.length; i++) {
        liEl[i].remove();
        
    }


}

loadHighscores();
