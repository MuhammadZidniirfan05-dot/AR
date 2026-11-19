const params = new URLSearchParams(location.search);
const organParam = params.get("organ");
const targetOrgan = organParam
  ? ORGANS.find(item => item.id === organParam)
  : null;

const quizCard = document.getElementById("quiz-card");
const quizResult = document.getElementById("quiz-result");
const quizMode = document.getElementById("quiz-mode");
const quizProgress = document.getElementById("quiz-progress");
const quizQuestion = document.getElementById("quiz-question");
const quizOptions = document.getElementById("quiz-options");
const quizFeedback = document.getElementById("quiz-feedback");
const quizStatus = document.getElementById("quiz-status");
const quizExplanation = document.getElementById("quiz-explanation");
const quizNext = document.getElementById("quiz-next");
const resultScore = document.getElementById("result-score");
const resultHighScore = document.getElementById("result-high-score");
const quizRetry = document.getElementById("quiz-retry");

function shuffleArray(items) {
  const copy = items.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

const baseQuestions = targetOrgan
  ? QUIZ.filter(q => q.organId === targetOrgan.id)
  : QUIZ;

function updateQuizHeader() {
  if (targetOrgan) {
    const organText = getOrganText(targetOrgan);
    document.title = t("quizTitleOrgan", { name: organText.nama });
    quizMode.textContent = t("quizModeOrgan", { name: organText.nama });
  } else {
    document.title = t("quizTitleAll");
    quizMode.textContent = t("quizModeAll");
  }
}

updateQuizHeader();

const storageKey = targetOrgan
  ? `ar-organ-highscore-${targetOrgan.id}`
  : "ar-organ-highscore-all";

let questions = [];
let currentIndex = 0;
let score = 0;
let answered = false;
let lastSelectedIndex = -1;
let lastHighScore = 0;

function getHighScore() {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved ? Number(saved) || 0 : 0;
  } catch (err) {
    return 0;
  }
}

function saveHighScore(newScore) {
  try {
    const currentHigh = getHighScore();
    if (newScore > currentHigh) {
      localStorage.setItem(storageKey, String(newScore));
      return newScore;
    }
    return currentHigh;
  } catch (err) {
    return newScore;
  }
}

function renderQuestion() {
  const current = getQuizText(questions[currentIndex]);
  answered = false;
  lastSelectedIndex = -1;
  quizFeedback.hidden = true;
  quizProgress.textContent = t("quizProgress", {
    current: currentIndex + 1,
    total: questions.length
  });
  quizQuestion.textContent = current.pertanyaan;
  quizOptions.innerHTML = "";

  current.pilihan.forEach((pilihanText, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "quiz-option";
    btn.textContent = pilihanText;
    btn.addEventListener("click", () => handleAnswer(index));
    quizOptions.appendChild(btn);
  });

  quizNext.textContent =
    currentIndex === questions.length - 1 ? t("quizSeeResult") : t("quizNext");
}

function handleAnswer(selectedIndex) {
  if (answered) {
    return;
  }
  answered = true;
  lastSelectedIndex = selectedIndex;

  const current = getQuizText(questions[currentIndex]);
  const optionButtons = quizOptions.querySelectorAll(".quiz-option");
  const isCorrect = selectedIndex === current.jawaban;

  if (isCorrect) {
    score += 1;
  }

  optionButtons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === current.jawaban) {
      btn.classList.add("correct");
    } else if (idx === selectedIndex && !isCorrect) {
      btn.classList.add("wrong");
    }
  });

  quizStatus.textContent = isCorrect ? t("quizCorrect") : t("quizWrong");
  quizStatus.className = `quiz-status ${isCorrect ? "is-correct" : "is-wrong"}`;
  quizExplanation.textContent = current.penjelasan;
  quizFeedback.hidden = false;
}

function renderResultText() {
  resultScore.textContent = t("quizScoreText", {
    score: score,
    total: questions.length
  });
  resultHighScore.textContent = t("quizHighScoreText", {
    high: lastHighScore,
    total: questions.length
  });
}

function showResult() {
  quizCard.hidden = true;
  quizResult.hidden = false;

  lastHighScore = saveHighScore(score);
  renderResultText();
}

function refreshQuizTranslation() {
  updateQuizHeader();
  if (!quizResult.hidden) {
    renderResultText();
    return;
  }
  if (!questions.length) {
    return;
  }
  const current = getQuizText(questions[currentIndex]);
  quizProgress.textContent = t("quizProgress", {
    current: currentIndex + 1,
    total: questions.length
  });
  quizQuestion.textContent = current.pertanyaan;

  const optionButtons = quizOptions.querySelectorAll(".quiz-option");
  optionButtons.forEach((btn, idx) => {
    if (current.pilihan[idx] !== undefined) {
      btn.textContent = current.pilihan[idx];
    }
  });

  quizNext.textContent =
    currentIndex === questions.length - 1 ? t("quizSeeResult") : t("quizNext");

  if (answered) {
    const isCorrect = lastSelectedIndex === current.jawaban;
    quizStatus.textContent = isCorrect ? t("quizCorrect") : t("quizWrong");
    quizExplanation.textContent = current.penjelasan;
  }
}

function startQuiz() {
  questions = shuffleArray(baseQuestions);
  currentIndex = 0;
  score = 0;
  quizResult.hidden = true;
  quizCard.hidden = false;
  renderQuestion();
}

quizNext.addEventListener("click", () => {
  if (currentIndex < questions.length - 1) {
    currentIndex += 1;
    renderQuestion();
  } else {
    showResult();
  }
});

quizRetry.addEventListener("click", startQuiz);

document.addEventListener("ar-lang-change", refreshQuizTranslation);

startQuiz();
