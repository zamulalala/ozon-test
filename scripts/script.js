document.addEventListener("DOMContentLoaded", function () {
  // Логика для прогресс-бара
  const progressInput = document.getElementById("progress-input");
  const circle = document.querySelector(".progress__circle-outer");
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  function initializeCircle() {
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;
  }

  function setProgress(value) {
    const offset = circumference - (value / 100) * circumference;
    circle.style.strokeDashoffset = offset;
    progressInput.setAttribute("aria-valuenow", value);
  }

  function handleInputEvent() {
    const value = Math.min(Math.max(progressInput.value, 0), 100);
    setProgress(value);
  }

  initializeCircle();
  progressInput.addEventListener("input", handleInputEvent);
  setProgress(progressInput.value);

  // Логика для кастомных чекбоксов
  const checkboxes = document.querySelectorAll(".custom-checkbox");

  checkboxes.forEach(function (checkbox) {
    const input = checkbox.querySelector("input");
    if (input.checked) {
      checkbox.classList.add("checked");
      checkbox.setAttribute("aria-checked", "true");
    }

    input.addEventListener("change", function () {
      const isChecked = input.checked;
      checkbox.classList.toggle("checked", isChecked);
      checkbox.setAttribute("aria-checked", isChecked);
    });
  });

  // Логика для анимации прогресс-бара
  const animateCheckbox = document.getElementById("progress-animate");
  const progressCircle = document.querySelector(".progress__circle-outer");

  animateCheckbox.addEventListener("change", function () {
    progressCircle.classList.toggle(
      "progress__circle-outer--rotate",
      animateCheckbox.checked
    );
  });

  // Логика для скрытия прогресс-бара
  const hideCheckbox = document.getElementById("progress-hide");
  const progressBar = document.querySelector(".progress__ring");

  hideCheckbox.addEventListener("change", function () {
    progressBar.classList.toggle(
      "progress__ring--hidden",
      hideCheckbox.checked
    );
  });

  // API для управления состоянием блока Progress
  window.ProgressAPI = {
    setProgress(value) {
      value = Math.min(Math.max(value, 0), 100);
      progressInput.value = value;
      setProgress(value);
    },
    toggleAnimation(state) {
      animateCheckbox.checked = state;
      progressCircle.classList.toggle("progress__circle-outer--rotate", state);
    },
    toggleVisibility(state) {
      hideCheckbox.checked = state;
      progressBar.classList.toggle("progress__ring--hidden", state);
    },
    getProgress() {
      return parseInt(progressInput.value, 10);
    },
    isAnimating() {
      return animateCheckbox.checked;
    },
    isVisible() {
      return !hideCheckbox.checked;
    },
  };
});
