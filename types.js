// Wait for DOM
document.addEventListener("DOMContentLoaded", function() {
  const nodes = document.querySelectorAll(".node");

  nodes.forEach(node => {
    node.addEventListener("click", () => {
      const nextId = node.dataset.next;
      if (!nextId) return;

      const nextNode = document.getElementById(nextId);
      if (nextNode) {
        nextNode.classList.remove("hidden");
        nextNode.style.opacity = 0;
        nextNode.style.display = "block";

        // Fade in
        setTimeout(() => {
          nextNode.style.transition = "opacity 0.5s";
          nextNode.style.opacity = 1;
        }, 50);

        // Scroll into view smoothly
        nextNode.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });
});
