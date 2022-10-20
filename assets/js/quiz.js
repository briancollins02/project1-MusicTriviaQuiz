const questionEl = document.getElementById('question-render');
const pointsEl = document.getElementById('pointsEl');
const container = document.getElementById('container')
const songTitleEl = document.getElementById("title-render");
const answerStatus = document.getElementById('answer-status');
const answerReveal = document.getElementById('reveal');

var arraySelection;

// get the entire tracklist from local-storage and assign it to song_list
var questions = JSON.parse(localStorage.getItem('song_list'));
console.log('quiz song list', questions)
var startLength = questions.length;
console.log('total songs in playlist', startLength)
console.log("connected")

// function myFunction() {
//     console.log("button pressed")
// }
// var initialInput = document.getElementById('initialsEl');

const endScore = document.getElementById('total-scoreEl');
const totalQuestions = document.getElementById('total-questionsEl');


var canAnswer = false;

var savedHighScore = JSON.parse(localStorage.getItem('high-score')) || 0;
var scoreDisplay = savedHighScore.pointTotal

console.log('old high-score',scoreDisplay)


var score = 0;
pointsEl.textContent = score + ' correct / ' + questions.length;
var currentQuestion;


// Total numer of Questions


// start out at -1 so get question gets us to index: 0


// Go to next question
function getQuestion() {
    // enable answering
    canAnswer = true;
    document.getElementById('user-text').value = "";
    answerStatus.textContent = ''
    // remove last question from array if not the first question
    if (arraySelection != null){
        console.log('removed song ', questions[arraySelection].track.name + 'by ' + questions[arraySelection].track.artists[0].name)
        questions.splice(arraySelection, 1);
    }
    //check if there are any more questions
 
    if (questions.length < 1) {
        endGame();
    }

    // go to next question
    arraySelection = Math.floor(Math.random(0)*questions.length) -1;
    songTitleEl.textContent = '"' + questions[arraySelection].track.name + '"';
    console.log('question select', arraySelection +' , ' + questions[arraySelection].track.name + ' by ' + questions[arraySelection].track.artists[0].name + '. there are ' + questions.length + ' songs left.')
    var currentQuestion = questions[arraySelection];
}

// check button selection and add score
function checkAnswer(){
    userGuess = document.getElementById('user-text').value;
    console.log('guess',userGuess);
        if (canAnswer == true) {
            if (userGuess == questions[arraySelection].track.artists[0].name){
                score++
                pointsEl.textContent = score + ' correct/ ' + questions.length;
                console.log('correct');
                correct();
            } else {           
                console.log('incorrect');
                incorrect()
            }
        } else { //stop the function from working while canAnswer=false
            return
        }
        //TODO insert a function that plays a confirmation animation
        //wait for user feedback to play and then move to the next question
    setTimeout(getQuestion, 2000); 
}

//correct and incorrect user feedback
function correct() {
        canAnswer = false;
        answerStatus.classList.add('flash-green');
        answerStatus.textContent = 'Correct!'
     setTimeout(function() {
        answerStatus.classList.remove('flash-green');
    },2000)
}

function incorrect() {
    canAnswer = false;
    document.getElementById('wrap').classList.add('flash-red');
    setTimeout(function() {
        document.getElementById('wrap').classList.remove('flash-red');
        endGame();
    },2000)
}



// end game if time up or out of questions
function endGame() {
    console.log('no')
    document.getElementById('answer-wrap').classList.remove('hide');
    document.getElementById('answer-wrap').classList.add('show');
    document.getElementById('container').classList.remove('show');
    document.getElementById('container').classList.add('hide');
    // endScore.textContent = score;
    // totalQuestions.textContent = questions.length;
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