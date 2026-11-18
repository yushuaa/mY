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

// ===== Music player =====
document.addEventListener("DOMContentLoaded", () => {
  const card = document.getElementById("music-card");
  if (!card) return;

  const audio = document.getElementById("music-audio");
  const toggle = document.getElementById("music-toggle");
  const shapes = toggle.querySelectorAll("polygon");

  // Titik polygon: [bar kiri, bar kanan] — segitiga play terbelah jadi dua bar pause
  const PLAY = [
    [17.3, 14.2, 23, 17.4, 23, 22.6, 17.3, 25.8],
    [23, 17.4, 27.6, 20, 27.6, 20, 23, 22.6],
  ];
  const PAUSE = [
    [14.5, 14, 17.5, 14, 17.5, 26, 14.5, 26],
    [22.5, 14, 25.5, 14, 25.5, 26, 22.5, 26],
  ];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let progress = 0; // 0 = ikon play, 1 = ikon pause
  let raf = 0;

  const render = (t) => {
    shapes.forEach((shape, i) => {
      const pts = PLAY[i].map((v, k) => (v + (PAUSE[i][k] - v) * t).toFixed(2));
      shape.setAttribute("points", pts.join(" "));
    });
  };

  const morphTo = (target) => {
    cancelAnimationFrame(raf);
    if (reduceMotion) {
      progress = target;
      render(progress);
      return;
    }
    const from = progress;
    const start = performance.now();
    const duration = 240;
    const step = (now) => {
      const k = Math.min((now - start) / duration, 1);
      progress = from + (target - from) * (1 - Math.pow(1 - k, 3));
      render(progress);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  };

  const setPlaying = (on) => {
    card.classList.toggle("is-playing", on);
    toggle.setAttribute("aria-label", on ? "Pause music" : "Play music");
    morphTo(on ? 1 : 0);
  };

  toggle.addEventListener("click", () => {
    if (audio.paused) {
      setPlaying(true);
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("pause", () => setPlaying(false));
  audio.addEventListener("ended", () => setPlaying(false));
  audio.addEventListener("error", () => setPlaying(false));
});
