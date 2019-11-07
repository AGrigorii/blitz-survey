const questionsConfig = require('./questions');

let currentTimerId = null;
let currentQuestionId = -1;

function shuffle(arr){
    let j, temp;
    for(let i = arr.length - 1; i > 0; i--){
        j = Math.floor(Math.random()*(i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

shuffle(questionsConfig.questions);

function getNextQuestionIndex() {
    currentQuestionId = (currentQuestionId + 1) % questionsConfig.questions.length;
}

function redrawTimer(remainSeconds = questionsConfig.timeout) {
    if (currentTimerId) {
        clearTimeout(currentTimerId);
    }
    document.getElementById('timer').style.color = (remainSeconds < 5) ? 'red' : '#333';
    document.getElementById('timer').textContent = remainSeconds ? remainSeconds : 'Time is over';

    if (remainSeconds) {
        currentTimerId = setTimeout(redrawTimer, 1000, remainSeconds - 1);
    }
}

document.addEventListener('keydown', function(event) {
    switch (event.code) {
        case 'Space':
            redrawTimer();
            break;
        case 'Enter':
            nextQuestion();
            break;
        default:
            return;
    }
});

function nextQuestion() {
    getNextQuestionIndex();
    document.getElementById('question').textContent = questionsConfig.questions[currentQuestionId];
    redrawTimer();
}

nextQuestion();