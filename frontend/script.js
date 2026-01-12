const quizData = [
  {
    question: "Which language runs in the browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: 3
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style System",
      "Colorful Style Sheets"
    ],
    answer: 1
  },
  {
    question: "Which keyword declares a constant in JavaScript?",
    options: ["var", "let", "const", "static"],
    answer: 2
  }
];

let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 60;
let results = [];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const progressEl = document.getElementById("progress");
const finalScoreEl = document.getElementById("final-score");
const resultsEl = document.getElementById("results");

document.getElementById("start-btn").onclick = startQuiz;

function startQuiz() {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  quizScreen.classList.remove("shake");
  resetTimer();
  startTimer();

  const q = quizData[currentIndex];
  questionEl.textContent = q.question;
  progressEl.textContent = `Question ${currentIndex + 1} / ${quizData.length}`;
  answersEl.innerHTML = "";

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(index, btn);
    answersEl.appendChild(btn);
  });

  scoreEl.textContent = `Score: ${score}`;
}

function selectAnswer(index, btn) {
  clearInterval(timer);

  const correctIndex = quizData[currentIndex].answer;
  const buttons = document.querySelectorAll("#answers button");

  buttons.forEach(b => b.disabled = true);

  if (index === correctIndex) {
    btn.classList.add("correct");
    score++;
    results.push("Correct");
  } else {
    btn.classList.add("wrong");
    buttons[correctIndex].classList.add("correct");
    quizScreen.classList.add("shake");
    results.push("Wrong");
  }

  scoreEl.textContent = `Score: ${score}`;

  setTimeout(nextQuestion, 1000);
}

function startTimer() {
  timeLeft = 60;
  timerEl.textContent = `${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(timer);
      score--;
      results.push("Not Attempted");
      nextQuestion();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < quizData.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  finalScoreEl.textContent = `Final Score: ${score}/${quizData.length}`;

  results.forEach((res, i) => {
    const p = document.createElement("p");
    p.textContent = `Question ${i + 1}: ${res}`;
    resultsEl.appendChild(p);
  });
}
