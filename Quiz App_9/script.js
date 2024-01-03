const questions = [
  {
    question:
      "Which of the following keywords is used to define a variable in Javascript?",
    answer: [
      { text: "(A) var", correct: false },
      { text: "(B) let", correct: false },
      { text: "(C) let & var", correct: true },
      { text: "(D) NOT", correct: false },
    ],
  },
  {
    question: "How can a datatype be declared to be a constant type?",
    answer: [
      { text: "(A) const", correct: true },
      { text: "(B) let", correct: false },
      { text: "(C) var", correct: false },
      { text: "(D) constant", correct: false },
    ],
  },
  {
    question:
      "Which of the following methods is used to access HTML elements using Javascript?",
    answer: [
      { text: "(A) getElementbyId", correct: false },
      { text: "(B) getElementbyClassName", correct: false },
      { text: "(C) Both A & B", correct: true },
      { text: "(D) constant", correct: false },
    ],
  },
  {
    question:
      "When an operator’s value is NULL, the typeof returned by the unary operator is:",
    answer: [
      { text: "(A) Boolean", correct: false },
      { text: "(B) Undefined", correct: false },
      { text: "(C) Object", correct: true },
      { text: "(D) Integer", correct: false },
    ],
  },
  {
    question:
      "Which of the following methods can be used to display data in some form using Javascript?",
    answer: [
      { text: "(A) document.write()", correct: false },
      { text: "(B) conlose.log()", correct: false },
      { text: "(C) window.alert()", correct: false },
      { text: "(D) All of the above", correct: true },
    ],
  },
];

const questionElement = document.querySelector("#qus");
const answerButton = document.querySelector(".ansBtns");
const nextButton = document.querySelector("#nextBtn");

let currentQusIndex = 0;
let score = 0;

function startQuiz() {
  currentQusIndex = 0;
  score = 0;
  nextButton.style.display = "block";
  showQuestion();
}
function showQuestion() {
    resetState();
  let currentQus = questions[currentQusIndex];
  let questionNo = currentQusIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQus.question;

  currentQus.answer.forEach((ans) => {
    const button = document.createElement("button");
    button.innerHTML = ans.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (ans.correct) {
      button.dataset.correct = ans.correct;
    }
    button.addEventListener("click", slectAns);
  });
}

function slectAns(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach(button => {
    if (button.dataset.correct === "true") {
        button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
  nextButton.innerHTML = "Next";


}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQusIndex++;
    if (currentQusIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if (currentQusIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})
startQuiz();
