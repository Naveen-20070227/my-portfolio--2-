/* ── PAGE LOAD ── */
window.addEventListener("load", () => {
  document.getElementById("navbar").classList.add("visible");
  setTimeout(
    () => document.getElementById("heroH1").classList.add("visible"),
    150,
  );
  setTimeout(() => {
    const p = document.getElementById("heroPortrait");
    const ph = document.getElementById("heroPlaceholder");
    if (p.style.display !== "none") p.classList.add("visible");
    else ph.classList.add("visible");
  }, 300);
  setTimeout(
    () => document.getElementById("heroDesc").classList.add("visible"),
    350,
  );
  setTimeout(
    () => document.getElementById("heroBtn").classList.add("visible"),
    500,
  );
});

/* ── SCROLL OBSERVER ── */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0, rootMargin: "0px 0px -40px 0px" },
);
document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

/* ── MARQUEE ── */
const skillData = [
  {
    name: "HTML",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "FastAPI",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "VS Code",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  },
  { name: "Supabase", icon: "https://cdn.simpleicons.org/supabase" },
  {
    name: "REST API",
    icon: "https://cdn-icons-png.flaticon.com/512/1006/1006363.png",
  },
];
const tile = (s) =>
  `<div class="skill-tile"><img src="${s.icon}" alt="${s.name}" loading="lazy"/><span>${s.name}</span></div>`;
const row1 = document.getElementById("row1");
const row2 = document.getElementById("row2");
const half = Math.ceil(skillData.length / 2);
const s1 = skillData.slice(0, half),
  s2 = skillData.slice(half);
[...s1, ...s1, ...s1].forEach((s) =>
  row1.insertAdjacentHTML("beforeend", tile(s)),
);
[...s2, ...s2, ...s2].forEach((s) =>
  row2.insertAdjacentHTML("beforeend", tile(s)),
);

const marqueeSection = document.getElementById("marquee");
let currentOffset = 0,
  targetOffset = 0,
  rafId = null;

window.addEventListener(
  "scroll",
  () => {
    const rect = marqueeSection.getBoundingClientRect();
    const sTop = window.scrollY + rect.top;
    targetOffset = (window.scrollY - sTop + window.innerHeight) * 0.3;
    if (!rafId) rafId = requestAnimationFrame(animateMarquee);
  },
  { passive: true },
);

function animateMarquee() {
  currentOffset += (targetOffset - currentOffset) * 0.12;
  row1.style.transform = `translateX(${currentOffset - 200}px)`;
  row2.style.transform = `translateX(${-(currentOffset - 200)}px)`;
  if (Math.abs(targetOffset - currentOffset) > 0.5) {
    rafId = requestAnimationFrame(animateMarquee);
  } else {
    rafId = null;
  }
}

/* ── ANIMATED ABOUT TEXT ── */
const aboutPara = document.getElementById("aboutPara");
const rawText = aboutPara.textContent;
aboutPara.innerHTML = rawText
  .split("")
  .map((c) => (c === " " ? " " : `<span class="char">${c}</span>`))
  .join("");
const chars = aboutPara.querySelectorAll(".char");
const totalChars = chars.length;

function updateChars() {
  const rect = aboutPara.getBoundingClientRect();
  const winH = window.innerHeight;
  const progress = Math.min(
    1,
    Math.max(0, (winH * 0.85 - rect.top) / (rect.height + winH * 0.6)),
  );
  const lit = Math.floor(progress * totalChars);
  chars.forEach((c, i) => c.classList.toggle("lit", i < lit));
}
window.addEventListener("scroll", updateChars, { passive: true });
updateChars();

/* ── STICKY CARD SCALE ── */
const cards = document.querySelectorAll(".project-card");
const totalCards = cards.length;

function updateCardScales() {
  cards.forEach((card, i) => {
    const targetScale = 1 - (totalCards - 1 - i) * 0.03;
    const rect = card.getBoundingClientRect();
    const stickyTopPx = parseFloat(getComputedStyle(card).top) || 88;
    if (rect.top <= stickyTopPx + 2) {
      card.style.transform = `scale(${targetScale})`;
      card.style.transformOrigin = "top center";
    } else {
      card.style.transform = "scale(1)";
    }
  });
}
window.addEventListener("scroll", updateCardScales, { passive: true });

/* ── SMOOTH NAV SCROLL ── */
document.querySelectorAll('nav a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
