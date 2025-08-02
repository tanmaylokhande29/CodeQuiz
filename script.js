// Qns and opt for the quiz
const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High-level Text Machine Language", correct: false },
            { text: "Hyperlink and Text Markup Language", correct: false },
            { text: "Home Tool Markup Language", correct: false }
        ]
    },
    {
        question: "Which CSS property is used for changing the font size of an element?",
        answers: [
            { text: "text-size", correct: false },
            { text: "font-style", correct: false },
            { text: "font-size", correct: true },
            { text: "text-style", correct: false }
        ]
    },
    {
        question: "What is the correct way to include an external JavaScript file?",
        answers: [
            { text: "<script href='script.js'>", correct: false },
            { text: "<script name='script.js'>", correct: false },
            { text: "<script src='script.js'>", correct: true },
            { text: "<script file='script.js'>", correct: false }
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const quizSection = document.getElementById("quiz");
const resultSection = document.getElementById("result");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

// Strt or restarts
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizSection.classList.remove("hidden");
    resultSection.classList.add("hidden");
    nextButton.textContent = "Next";
    showQuestion();
}
// ongoing or currnt qn
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");

        // if correct
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

// clr prev qn and next button
function resetState() {
    nextButton.classList.add("hidden");
    answerButtonsElement.innerHTML = "";
}

// ans is selected
function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }

    // Show all correct answers and disable all buttons
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.classList.remove("hidden");
}

// next qns / end qns
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// score
function showResult() {
    quizSection.classList.add("hidden");
    resultSection.classList.remove("hidden");
    scoreElement.textContent = score;
}

// restart
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

restartButton.addEventListener("click", startQuiz);


startQuiz();
