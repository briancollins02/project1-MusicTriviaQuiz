const questionEl = document.getElementById('question-render');
const pointsEl = document.getElementById('ui-question-progress');
const quizLengthEl = document.getElementById('total-questions');
const highScoreEl = document.getElementById('high-scoreEl');
const container = document.getElementById('container')
// console.log("connected")

// function myFunction() {
//     console.log("button pressed")
// }
// var initialInput = document.getElementById('initialsEl');

const endScore = document.getElementById('total-scoreEl');
const totalQuestions = document.getElementById('total-questionsEl');


var canAnswer = false;

var savedHighScore = JSON.parse(localStorage.getItem('high-score')) || 0;
var scoreDisplay = savedHighScore.pointTotal

console.log(savedHighScore)
console.log(scoreDisplay)

console.log('old high-score',scoreDisplay)


var score = 0;
var currentQuestion;
const questions = [
    {
        q: 'placeholder question',
        choices: ['placeholder answer'],
        answer: ' '
    },
]

// Total numer of Questions
quizLengthEl.innerText = '/' + questions.length


// start out at -1 so get question gets us to index: 0
var arraySelection = -1

// Go to next question
function getQuestion() {
    // enable answering
    canAnswer = true;
    //check if there are any more questions
 
    if (arraySelection > questions.length-2) {
        endGame();
    }
    // go to next question
    arraySelection++
    var currentQuestion = questions[arraySelection];
    questionEl.textContent = currentQuestion.q;
    // choiceA.textContent = currentQuestion.choices[0];
    // choiceB.textContent = currentQuestion.choices[1];
    // choiceC.textContent = currentQuestion.choices[2];
    // choiceD.textContent = currentQuestion.choices[3];
}

// check button selection and add score
document.querySelectorAll('button').forEach(occurence => {
        occurence.addEventListener('click', (e) => {
            if (canAnswer == true) {
                let elementId = e.target.id;
                console.log(canAnswer)
                if (elementId !== '') {
                    if (elementId == questions[arraySelection].answer){
                        score++
                        pointsEl.textContent = score + ' correct/' + questions.length;
                        correct();
                    } else {
                        timeLeft -=5;
                        incorrect()
                    }
                }
            } else { //stop the function from working while canAnswer=false
                return
            }
            //TODO insert a function that plays a confirmation animation
            //wait for user feedback to play and then move to the next question
        setTimeout(getQuestion, 250); 
    })
})

//correct and incorrect user feedback
function correct() {
        canAnswer = false;
        container.classList.add('flash-green');
        console.log ("Button Pressed")
    // setTimeout(function() {
    //     pointsEl.classList.remove('flash-green');
    // },2000)
}

function incorrect() {
        canAnswer = false;
        container.classList.add('flash-red');
    // setTimeout(function() {
    //     timerEl.classList.remove('flash-red');
    // },2000)
}



// end game if time up or out of questions
function endGame() {
    endScore.textContent = score;
    totalQuestions.textContent = questions.length;
    console.log('scoreDisplay',scoreDisplay);
    document.getElementById('end-screen').classList.add('show');
    document.getElementById('end-screen').classList.remove('hide');
    console.log('current score', score)
    if (scoreDisplay === undefined || score > savedHighScore.pointTotal) {
        console.log(savedHighScore.pointTotal)
        console.log('new high-score!')
        //Show High Score submission form
        document.getElementById('form').classList.add('show')
        document.getElementById('form').classList.remove('hide')
    } else {
        highScoreEl.textContent = 'The current High-Score is ' + scoreDisplay + ' by ' + savedHighScore.initials;
        document.getElementById('back-button').classList.add('show')
        document.getElementById('back-button').classList.remove('hide')
    }
    

   

}

// End Screen Functionality

function saveScore() {
    // create user object from submission
    var currentScore = {
        pointTotal: score,
        // initials: initialInput.value.trim()
    };
    console.log(savedHighScore)
    //send submission to local storage
        localStorage.setItem("high-score", JSON.stringify(currentScore));
        savedHighScore = localStorage.getItem("high-score");
        console.log('submitted!', savedHighScore)
    return window.location.assign('index.html')
}

// Call Functions
getQuestion();