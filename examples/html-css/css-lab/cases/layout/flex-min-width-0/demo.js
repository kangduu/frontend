const toggleButton = document.querySelector("#toggleExpansion");
const cards = [...document.querySelectorAll(".alert-card")];

if (toggleButton) {
  let expansionLocked = true;

  toggleButton.hidden = false;
  toggleButton.addEventListener("click", () => {
    expansionLocked = !expansionLocked;

    cards.forEach((card) => {
      card.classList.toggle("force-hover", expansionLocked);
    });

    toggleButton.setAttribute("aria-pressed", String(expansionLocked));
    toggleButton.textContent = expansionLocked
      ? "取消锁定展开"
      : "锁定展开状态";
  });
}
