// Element variables
var timerEl = document.getElementById("time-remaining");
var startQuiz = document.getElementById("start-quiz");
var optionButtons = document.getElementById("option-buttons");
var hideOnStart = document.getElementById("welcome-container");
var questionSection = document.getElementById("questions-container");
var questionTitle = document.querySelector("#question-title");
var optionOne = document.querySelector("#option-one");
var optionTwo = document.querySelector("#option-two");
var optionThree = document.querySelector("#option-three");
var optionFour = document.querySelector("#option-four");
var allDone = document.querySelector(".enter-initials");
var initials = document.querySelector("#initials");
var saveBtn = document.querySelector("#save");
var randomQuestion, timeLeft, currentQ, score;


// Questions arrays
var questionsArr = [
    {
        question: "What company was JavaScript created for?",
        answers: {
            A: "America Online",
            B: "Microsoft",
            C: "Netscape",
            D: "Apple"
        },
        correctAnswer: "Netscape"
    },
    {
        question: "What is the current version of JavaScript, and which one are we learning in class now?",
        answers: {
            A: "ES6, ES5",
            B: "E=MC2, PEMDAS",
            C: "E3, E4",
            D: "6ES, 5ES"
        },
        correctAnswer: "ES6, ES5"
    },
    {
        question: "What year did Brendan Eich create JavaScript?",
        answers: {
            A: "1989",
            B: "2001",
            C: "1992",
            D: "1995"
        },
        correctAnswer: "1995"
    },
    {
        question: "Which of the following is an example of a string?",
        answers: {
            A: "10000",
            B: "'Hello, world'",
            C: "[0]",
            D: "function();"
        },
        correctAnswer: "'Hello, world'"
    },
    {
        question: "What is the correct HTML tag for linking your JavaScript file?",
        answers: {
            A: "<script></script>",
            B: "<link></link>",
            C: "<a></a>",
            D: "<img></img>"
        },
        correctAnswer: "<script></script>"
    },
    {
        question: "Which of the following is the correct way to call the function 'function startGame();'",
        answers: {
            A: "Go-Go Gadget function",
            B: "startGame();",
            C: "function = startGame;",
            D: "startGame;"
        },
        correctAnswer: "startGame();"
    }
];

// Timer that counts down from 75
function countdown() {
    timeLeft = 75;

    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
        // As long as the `timeLeft` is greater than 0
            // Set the `textContent` of `timerEl` to show the remaining seconds
            timerEl.textContent = timeLeft;
            // Decrement `timeLeft` by 1
            timeLeft--;
        if(timeLeft<=0 || currentQ >= questionsArr.length) {
            // Once `timeLeft` gets to 0 and no questions are left, set `timerEl` quiz over
            timerEl.textContent = "Game over!";
            // Use `clearInterval()` to stop the timer
            clearInterval(timeInterval);
        }
    }, 1000);
}

function startGame() {
    hideOnStart.style.visibility = "hidden";
    optionButtons.style.visibility = "visible";
    currentQ = 0;
    score = 0;
    newQuestion();
}

// function to generate a random question
function newQuestion(){
    
    if(currentQ < questionsArr.length){
        randomQuestion = Math.floor(Math.random() * (questionsArr.length));

        questionTitle.textContent = questionsArr[randomQuestion].question
        
        optionOne.textContent = questionsArr[randomQuestion].answers.A
        optionTwo.textContent = questionsArr[randomQuestion].answers.B
        optionThree.textContent = questionsArr[randomQuestion].answers.C
        optionFour.textContent = questionsArr[randomQuestion].answers.D
    } else {
        endOfQuiz();
    }
    
}

function checkAnswerAndGo(event){
    var chosenAnswer = event.target.textContent
    if(chosenAnswer == questionsArr[randomQuestion].correctAnswer) {
        timeLeft += 15;
        score += 10;
    }else {
        timeLeft -= 15;
    }
    questionsArr.splice(randomQuestion, 1)
    newQuestion();
}

function saveInitials() {
    var enterInitials = {
        initials: initials.value
    }
    localStorage.setItem("enterInitials", JSON.stringify(enterInitials));
}

function endOfQuiz() {
    optionButtons.style.visibility = "hidden";
    questionTitle.style.visibility = "hidden";
    allDone.style.visibility = "visible";
    localStorage.setItem("score", JSON.stringify(score));
    var finalScore = JSON.parse(localStorage.getItem("score"));
    document.querySelector(".final").innerHTML = finalScore;
    saveInitials();
}

// Event listener
startQuiz.addEventListener("click", function () {
    countdown();
    startGame();
});

optionOne.addEventListener("click", checkAnswerAndGo)
optionTwo.addEventListener("click", checkAnswerAndGo)
optionThree.addEventListener("click", checkAnswerAndGo)
optionFour.addEventListener("click", checkAnswerAndGo)


saveBtn.addEventListener("click", function (event) {
    event.preventDefault();
    saveInitials();
})
    
    
