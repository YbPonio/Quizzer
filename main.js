let fruits;
let currentFruit;
let questionNumber = -1;
let answers;
let totalScore = 0;

async function getFruits() {
    let response = await fetch("http://localhost/quizzer/api/get-fruits.php");
    fruits = await response.json();
    fruits.sort(randomizer);
    console.log(fruits);
}

function startQuiz() {
    nextQuestion();
    questionDialog1.close();
    questionDialog2.showModal();
}

function nextQuestion() {
    if (questionNumber >= fruits.length - 1 ) {
        console.log("No more questions");
        endQuiz();
        return;
    }
    
    questionNumber++;
    currentFruit = fruits.at(questionNumber);

    questionText.innerHTML = questionNumber + 1;
    fruitImage.src = `./images/${currentFruit.name}.png`;

    getAnswer();
}

function randomizer() {
    return Math.random() - 0.5;
}

function getAnswer() {
    answers = Array.from(fruits).sort(randomizer);
    answers.splice(4);

    if (!answers.includes(currentFruit)) {
        answers.pop();
        answers.push(currentFruit);
    }

    answersOption.innerHTML = "";
    for (answer of answers) {
        answersOption.innerHTML += `<button onclick="checkAnswer(${answer.id})">${answer.name}</button>`;
    }
}

function checkAnswer(answer) {
    if (currentFruit.id == answer) {
        totalScore++;
    }
    
   nextQuestion();
}

function endQuiz() {
    fetch(`http://localhost/quizzer/api/save-fruit.php?name=${fruitID.value}&score=${totalScore}`);

    resultTotal.innerHTML = `${totalScore} / ${fruits.length}`; 
    questionDialog1.close();
    questionDialog2.close();
    questionDialog3.showModal();
}

function playAgain() {
    questionNumber = -1;
    totalScore = 0;
    questionDialog1.showModal();
    questionDialog2.close();
    questionDialog3.close();
}
getFruits();