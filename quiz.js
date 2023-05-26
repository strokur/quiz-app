// Define Constants & Variables
const quiz = {
  name: "eCommerce Quiz",
  problems: {
    problem1: {
      question: "Which of the following is not a real eCommerce platform?",
      answers: {
        answer1: "Shopify",
        answer2: "WooCommerce",
        answer3: "ShopCommerce",
        answer4: "BigCommerce",
      },
      answer: "c",
    },
    problem2: {
      question: "If Shopify is so good, why are Shopify developers necessary?",
      answers: {
        answer1: "To save time on things like store setups and migrations",
        answer2:
          "To extend the limited design options and functionalities of themes with custom code",
        answer3:
          "To provide support with a deep understanding of how the platform works and what its limitations are",
        answer4: "All the above",
      },
      answer: "d",
    },
    problem3: {
      question: "Which of the following is true about Shopify developers?",
      answers: {
        answer1: "They are paid extremely well",
        answer2: "There is a high demand for them",
        answer3:
          "They need to know web development, the platform itself, and the liquid template language",
        answer4: "All the above",
      },
      answer: "d",
    },
  },
  answerKey: function () {
    let ans = [];
    for (let problem in this.problems) {
      ans.push(this.problems[problem].answer);
    }
    return ans;
  },
};
const backButton = document.querySelector("#backButton");
const nextButton = document.querySelector("#nextButton");
const restartButton = document.querySelector("#restartButton");
const problemsObj = quiz.problems;
const problemHTML = document.getElementById("problem");
const blankHTML = problemHTML.innerHTML;
const questionHTML = document.getElementById("question");
const radioAnswers = document.getElementsByName("radio-answer");
const numOfQuestions = Object.keys(problemsObj).length;
const answerKey = quiz.answerKey();
let userAnswersID = [];
let activeQuestion = 1;
let activeNumOfAnswers;
let correct = 0;

// Define Functions
function start() {
  problemHTML.innerHTML = blankHTML;
  problemHTML.classList.remove("score");
  userAnswersID = [];
  activeQuestion = 1;
  correct = 0;
  writeQuestionToScreen(activeQuestion);
  clearAnswers();
  manageButtons();
}
function writeQuestionToScreen(index) {
  if (activeQuestion > numOfQuestions) {
    showResults(userAnswersID);
  } else {
    let problemObj = problemsObj["problem" + index];
    let answersObj = problemObj.answers;
    let qNofN = `<h4>Question ${index} of ${numOfQuestions}:</h4>`;
    let Q = `<p> ${problemObj.question}</p>`;
    activeNumOfAnswers = Object.keys(answersObj).length;
    for (let i = 1; i <= activeNumOfAnswers; i++) {
      document.getElementById("l" + i).innerHTML = answersObj["answer" + i];
    }
    question.innerHTML = qNofN + Q;
  }
}
function nextClick() {
  getUserAnswers();
  clearAnswers();
  activeQuestion++;
  writeQuestionToScreen(activeQuestion);
  manageButtons();
}
function backClick() {
  activeQuestion--;
  document.getElementById(userAnswersID[activeQuestion - 1]).checked = true;
  writeQuestionToScreen(activeQuestion);
  manageButtons();
}
function isFirstQuestion() {
  return activeQuestion === 1;
}
function isLastQuestion() {
  return activeQuestion === numOfQuestions + 1;
}
function isNotFirstNotLast() {
  return !isFirstQuestion() && !isLastQuestion();
}
function manageButtons() {
  restartButton.classList.add("is-active");
  restartButton.addEventListener("click", start);
  if (isFirstQuestion()) {
    nextButton.classList.add("is-active");
    nextButton.addEventListener("click", nextClick);
    backButton.removeEventListener("click", backClick);
    backButton.classList.remove("is-active");
  }
  if (isNotFirstNotLast()) {
    nextButton.classList.add("is-active");
    nextButton.addEventListener("click", nextClick);
    backButton.classList.add("is-active");
    backButton.addEventListener("click", backClick);
  }
  if (isLastQuestion()) {
    nextButton.classList.remove("is-active");
    nextButton.removeEventListener("click", nextClick);
    backButton.classList.remove("is-active");
    backButton.removeEventListener("click", backClick);
  }
}
function getUserAnswers() {
  userAnswersID[activeQuestion - 1] = document.querySelector(
    'input[name="radio-answer"]:checked'
  ).id;
}
function getNumOfMatches(arr1, arr2) {
  let numOfMatches = 0;
  for (let i = 0; i < numOfQuestions; i++) {
    if (arr1[i] === arr2[i]) {
      numOfMatches++;
    }
  }
  return numOfMatches;
}
function showResults(answerArray) {
  let userAnswerValues = answerArray.map(
    (id) => document.getElementById(id).value
  );
  correct = getNumOfMatches(userAnswerValues, answerKey);
  problemHTML.classList.add("score");
  problemHTML.innerHTML = `<h5>You scored ${correct} out of ${numOfQuestions} correct`;
}
function clearAnswers() {
  let answer = document.getElementsByName("radio-answer");
  for (let i = 0; i < activeNumOfAnswers; i++) {
    answer[i].checked = false;
  }
}

// Let's run some code
document.querySelector(".header>h1").innerText = quiz.name;
start();
