document.addEventListener("DOMContentLoaded", () => {
  const themeToggleButton = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
  }
  themeToggleButton.setAttribute("aria-pressed", String(savedTheme === "light"));
  themeToggleButton.setAttribute(
    "aria-label",
    savedTheme === "light" ? "Switch to dark theme" : "Switch to light theme",
  );

  themeToggleButton.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light");
    themeToggleButton.setAttribute("aria-pressed", String(isLight));
    themeToggleButton.setAttribute(
      "aria-label",
      isLight ? "Switch to dark theme" : "Switch to light theme",
    );
    localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
  });
});
