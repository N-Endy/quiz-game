const options = Array.from(document.querySelector('.options').children);
const option1 = document.querySelector('.option-1');
const option2 = document.querySelector('.option-2');
const option3 = document.querySelector('.option-3');
const option4 = document.querySelector('.option-4');
const currentQuestionIndex = document.querySelector('.CurrentQuestion');
const totalQuestion = document.querySelector('.totalQuestion');
const question = document.querySelector('.question');
const scoreText = document.querySelector('.score');
const finalScoreText = document.querySelector('.finalScore');
const totalScoreText = document.querySelector('.totalScore');

let questionIndex;
let index = 0;
let myArray = [];
let myArr = [];
let score = 0;  
// Load all functions



const questions = [
    {
        question: 'When was FC Barcelona founded?',
        options: ['1899', '1900', '1901', '1898'],
        answer:0
    },
    {
        question: 'Who is FC Barcelona highest ever goal scorer?',
        options: ['Kubala', 'Ronaldinho', 'Messi', 'Samuel Eto'],
        answer:2
    },
    {
        question: "How many Balon D'ors has Lionel Messi won?",
        options: ["4", "5", "6", "5"],
        answer:2
    },
    {
        question: "FC Barcelona's stadium is called...?",
        options: ["Camp of Nou", "Camp Nou", "Camp Now", 'Now Camp'],
        answer:1
    },
    {
        question: 'Who is FC Barcelona most successful coach?',
        options: ['Joan Cruff', 'Luis Enrique', 'Valverde', 'Pep Guardiola'],
        answer:3
    }
]
totalQuestion.innerHTML = questions.length;
//Starts game by loading the questios
function startGame() {
    currentQuestionIndex.innerHTML = index + 1;
    question.innerHTML = questions[questionIndex].question;
    option1.innerHTML = questions[questionIndex].options[0];
    option2.innerHTML = questions[questionIndex].options[1];
    option3.innerHTML = questions[questionIndex].options[2];
    option4.innerHTML = questions[questionIndex].options[3];
    index++;
}
function isCorrect(choice) {
    if(choice.id == questions[questionIndex].answer){
        choice.classList.add('correct');
        score++;
         scoreText.innerText = score;
    }else {
        choice.classList.add('incorrect');
    }
    disabledOptions()
}
function disabledOptions() {
    options.forEach(function(option){
        option.classList.add('disabled');
        if (option.id == questions[questionIndex].answer) {
            option.classList.add('correct');
        }
    });
}
function enableOptions(){
    options.forEach(function(option){
        option.classList.remove('disabled','correct','incorrect');
    })
}
function isSelected() {
    if(!options[0].classList.contains('disabled')){
        alert('Please select an option!')
    }else {
        enableOptions()
        getQuestion();
    }
}
function next(){
    isSelected();
}
function calculateScore(currentScore) {
    score += currentScore;
    scoreText.innerText = score;
}

function getQuestion(){
     let randomNumber = Math.floor(Math.random()*questions.length);
     let hitDuplicate = 0;
     if(index == questions.length){
         gameOver();
     }else{
         if(myArray.length > 0){
            for(let i = 0; i< myArray.length; i++){
                if(myArray[i] == randomNumber) {
                    hitDuplicate = 1;
                    break;
                }
            }
            if(hitDuplicate == 1) {
                getQuestion();
            }else {
                 questionIndex = randomNumber;
                 startGame();
                 myArr.push(questionIndex);
            }
         }
         if(myArray.length== 0) {
            questionIndex = randomNumber;
            startGame();
            myArr.push(questionIndex);

         }
         myArray.push(randomNumber);
    }

}
function gameOver(){
    if (index == questions.length){
    document.querySelector('.game-over').style.display = "flex";
    finalScoreText.innerHTML = score;
    totalScoreText.innerHTML = questions.length;
    }
    }

function playAgain() {
    window.location.reload();
}

window.onload = function () {
    getQuestion();
    gameOver();
}
