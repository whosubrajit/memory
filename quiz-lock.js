let quizLocked = false;

function startQuizFlow() {
  quizLocked = true;

  // Hide pact section, show quiz
  document.getElementById("pact-section").style.display = "none";
  document.getElementById("quiz-section").style.display = "block";

  // Start quiz logic
  buildQuiz();
  startTimer();
}

document.addEventListener("DOMContentLoaded", () => {
  const acceptBtn = document.getElementById("accept-btn");
  const submitBtn = document.getElementById("submit");

  if (acceptBtn) {
    acceptBtn.addEventListener("click", startQuizFlow);
  }

  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      quizLocked = false;
    });
  }

  window.onbeforeunload = function (e) {
    if (quizLocked) {
      const message = "You must complete the quiz before leaving.";
      e.preventDefault();
      e.returnValue = message;
      return message;
    }
  };
});

// Intercept internal navigation
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");

    // Only block internal links, not anchors or external URLs
    if (quizLocked && href && !href.startsWith("#") && !href.startsWith("http")) {
      e.preventDefault();
      alert("You can't leave this page until you're done. Life is unfair, right?");
    }
  });
});
