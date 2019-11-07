const questionsConfig = require('./questions');

let currentTimerId = null;
let currentQuestionId = null;


function selectRandomQuestion() {
    return Math.floor(Math.random()*questionsConfig.questions.length);
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
    currentQuestionId = selectRandomQuestion();
    document.getElementById('question').textContent = questionsConfig.questions[currentQuestionId];
    redrawTimer();
}

nextQuestion();