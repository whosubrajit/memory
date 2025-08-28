/* ---------------- Quiz Logic ---------------- */
let timeLeft = 150; // seconds
let timer;
let totalQuestions = 5;
let answered = false;

// Quiz questions
const quizData = [
  {
    question: "Forgetting someone’s name right after meeting them is an example of:",
    options: [ "Storage Decay", "Encoding Failure"],
    answer: "Encoding Failure"
  },
  {
    question: "Remembering exactly where you were during your first big achievement is:",
    options: ["Flashbulb Memory", "Implicit Memory"],
    answer: "Flashbulb Memory"
  },
  {
    question: "Remembering a phone number as 017-1234-5678 is an example of:",
    options: ["Hierarchy", "Chunking" ],
    answer: "Chunking"
  },
  {
    question: "Which memory involves skills & habits like riding a bike?",
    options: ["Working Memory", "Implicit Memory"],
    answer: "Implicit Memory"
  },
  {
    question: "Which memory stores personally experienced events?",
    options: ["Explicit Memory", "Implicit Memory"],
    answer: "Explicit Memory"
  }
];

// Build quiz HTML dynamically with spacing
function buildQuiz() {
  const quizContainer = document.getElementById("quiz");
  const output = quizData.map((q, i) => `
    <div class="question" style="margin-bottom:20px;">${i + 1}. ${q.question}</div>
    <div class="options" style="margin-bottom:20px;">
      ${q.options.map(opt => `<label><input type="radio" name="q${i}" value="${opt}"> ${opt}</label>`).join("")}
    </div>
  `);
  quizContainer.innerHTML = output.join("");
}

// Timer logic
function startTimer() {
  const timerEl = document.getElementById("timer");
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timerEl.textContent = "⏳ Time Left: " + timeLeft + "s";
    } else {
      clearInterval(timer);
      if (!answered) checkQuiz(); // auto-submit
    }
  }, 1000);
}

// Check quiz answers
function checkQuiz() {
  answered = true;
  clearInterval(timer);
  const result = document.getElementById("result");

  const answers = quizData.map((q, i) => {
    const sel = document.querySelector(`input[name="q${i}"]:checked`);
    return sel ? sel.value : null;
  });

  let score = answers.filter((a, i) => a === quizData[i].answer).length;

  let message = "";
  switch (score) {
    case 0:
      message = "0/5, You should go through the site again.";
      break;
    case 1:
      message = "1/5, This is just the beginning, wanna retry?";
      break;
    case 2:
      message = "2/5, Hold up soldier, you're on a roll.";
      break;
    case 3:
      message = "3/5, Well well, your memory ain't betraying you.";
      break;
    case 4:
      message = "4/5, Goddamnit, you're getting good with your brain.";
      break;
    case 5:
      message = "5/5 🧠 Master of Memory is here!";
      if (typeof confetti === "function") launchConfetti();
      break;
  }

      result.innerHTML = message;
}

// Launch confetti (previous version)
function launchConfetti() {
  const duration = 2 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// Initialize quiz
buildQuiz();
startTimer();
document.getElementById("submit").addEventListener("click", checkQuiz);

//types
document.addEventListener("DOMContentLoaded", function() {
  const nodes = new vis.DataSet([
    { id: 1, label: "Sensory Memory", shape: "circle", color: "#ff6b6b", font: { color: "#fff", size: 20 } },
    { id: 2, label: "Short Term Memory", shape: "circle", color: "#ffd93d" },
    { id: 3, label: "Long Term Memory", shape: "circle", color: "#6bff8a" },
    { id: 4, label: "Implicit Memory", shape: "circle", color: "#ff9e9e" },
    { id: 5, label: "Explicit Memory", shape: "circle", color: "#9ed2ff" },
    { id: 6, label: "Skills\n(Motor & Cognitive)", shape: "box", color: "#ffcccc" },
    { id: 7, label: "Classical Conditioning", shape: "box", color: "#ffcccc" },
    { id: 8, label: "Facts\n(General Knowledge)", shape: "box", color: "#cce5ff" },
    { id: 9, label: "Personally Experienced Events", shape: "box", color: "#cce5ff" }
  ]);

  const edges = new vis.DataSet([
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 3, to: 4 },
    { from: 3, to: 5 },
    { from: 4, to: 6 },
    { from: 4, to: 7 },
    { from: 5, to: 8 },
    { from: 5, to: 9 }
  ]);

  const container = document.getElementById("mindmap");
  const data = { nodes: nodes, edges: edges };
  const options = {
    layout: { hierarchical: { enabled: true, direction: "UD", sortMethod: "hubsize" } },
    physics: { enabled: true },
    nodes: { borderWidth: 2, shadow: true, font: { size: 16 } },
    edges: { arrows: "to", smooth: { type: "dynamic" } },
    interaction: { hover: true, dragNodes: true, zoomView: true }
  };

  new vis.Network(container, data, options);
});
