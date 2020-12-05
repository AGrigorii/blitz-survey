const questionsConfig = require('./questions');

let currentTimerId = null;
let currentQuestionId = -1;

function shuffle(arr) {
    let j, temp;
    for (let i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
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

const keyDownCallback = function (event) {
    const key = event.code || event.key;
    switch (key) {
        case 'Space':
        case 'Spacebar': //IE 11
            redrawTimer();
            break;
        case 'Enter':
            nextQuestion();
            break;
        default:
            return;
    }
};

const spaceButton = document.getElementById('space');
const enterButton = document.getElementById('enter');
spaceButton.addEventListener('click', () => redrawTimer());
enterButton.addEventListener('click', () => nextQuestion());

document.addEventListener('keydown', keyDownCallback);

function nextQuestion() {
    getNextQuestionIndex();
    document.getElementById('question').textContent = questionsConfig.questions[currentQuestionId];
    redrawTimer();
}

nextQuestion();
