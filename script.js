// --- Mobile nav toggle ---
const navToggle = document.getElementById("navToggle");
const nav = document.querySelector(".nav");

navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close nav when clicking a link (mobile)
document.querySelectorAll(".nav__link").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

// --- Reveal on scroll ---
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("visible");
  });
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));

// --- Active nav highlight (based on section in view) ---
const sections = [...document.querySelectorAll("section[id]")];
const navLinks = [...document.querySelectorAll(".nav__link")];

const io2 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.getAttribute("id");
    navLinks.forEach(a => {
      a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
    });
  });
}, { rootMargin: "-40% 0px -55% 0px" });

sections.forEach(s => io2.observe(s));

// --- Footer year ---
document.getElementById("year").textContent = new Date().getFullYear();

// --- Simple post modals ---
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");

const posts = {
  post1: {
    title: "Building my first portfolio site",
    body: `
      <p>Today I built the base layout: a sticky navbar, hero section, and cards.</p>
      <p>What I focused on:</p>
      <ul>
        <li>Keeping spacing consistent</li>
        <li>Small hover effects that feel smooth</li>
        <li>A readable color palette (space theme, not neon overload)</li>
      </ul>
      <p>Next: add images, real links, and a proper posts page.</p>
    `
  },
  post2: {
    title: "CSS tricks I keep reusing",
    body: `
      <ul>
        <li><strong>Cards:</strong> border + blur + gentle shadow</li>
        <li><strong>Chips/tags:</strong> rounded pills for quick info</li>
        <li><strong>Hover:</strong> tiny translateY makes everything feel alive</li>
      </ul>
      <p>Consistency beats complexity.</p>
    `
  }
};

document.querySelectorAll("[data-modal]").forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.getAttribute("data-modal");
    const post = posts[key];
    if (!post) return;

    modalTitle.textContent = post.title;
    modalContent.innerHTML = post.body;

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  });
});

function hideModal(){
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

closeModal?.addEventListener("click", hideModal);
modal?.addEventListener("click", (e) => {
  if (e.target === modal) hideModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") hideModal();
});


