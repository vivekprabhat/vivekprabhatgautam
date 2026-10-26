/* ==========================================
   VPG WEBSITE — INTERACTIVE JAVASCRIPT
   Edit the arrays below to update your content.
   ========================================== */

const episodes = [
  {
    number: "EP. 01",
    category: "CREATIVITY · AI",
    graphic: "3D × AI",
    title: "3D Animation & Graphic Design in the AI Era",
    description: "Creative careers, AI tools, opportunities and the future of digital artists.",
    url: "https://www.youtube.com/@VivekPrabhatGautam"
  },
  {
    number: "EP. 02",
    category: "AI · BUSINESS",
    graphic: "AI + ML",
    title: "How AI Can Change Your Business, Career & Income",
    description: "Explore how students and businesses can discover opportunities with AI.",
    url: "https://www.youtube.com/@VivekPrabhatGautam"
  },
  {
    number: "FEATURED",
    category: "STUDENTS · FUTURE",
    graphic: "AI × MATH",
    title: "The Future of Students in the AI Era",
    description: "A conversation about mathematics, jobs, entrepreneurship and learning with AI.",
    url: "https://www.youtube.com/@VivekPrabhatGautam"
  }
];

/*
  Replace these demo resources with your actual e-books.
  Put your real hosted checkout URLs in the "url" fields.
  Do not link a paid PDF directly here; use a provider that
  confirms payment and delivers the file securely.
*/
const ebooks = [
  {
    category: "CREATOR TOOLKIT",
    title: "The Creator's Starter Guide",
    description: "A practical resource for planning content and building a consistent creative workflow.",
    cover: "CREATE WITH PURPOSE",
    coverClass: "",
    price: "Coming soon",
    url: ""
  },
  {
    category: "AI & PRODUCTIVITY",
    title: "AI Tools for Everyday Work",
    description: "A beginner-friendly guide to useful AI workflows for learning and creating.",
    cover: "WORK SMARTER WITH AI",
    coverClass: "cover-two",
    price: "Coming soon",
    url: ""
  },
  {
    category: "PERSONAL GROWTH",
    title: "From Idea to Action",
    description: "A simple framework for organising ideas, taking action and learning as you build.",
    cover: "IDEA → ACTION",
    coverClass: "cover-three",
    price: "Coming soon",
    url: ""
  }
];

/* Helper: safely display text inside HTML templates. */
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

/* Helper: allow only HTTP/HTTPS links. */
function validURL(value) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

/* Render podcast episode cards. */
const episodeGrid = document.getElementById("episodeGrid");
const episodeCount = document.getElementById("episodeCount");

if (episodeGrid) {
  episodeGrid.innerHTML = episodes.map(episode => {
    const url = validURL(episode.url);

    return `
      <article class="episode-card">
        <div class="episode-art">
          <span>${escapeHTML(episode.graphic)}</span>
        </div>

        <div class="episode-body">
          <p class="card-kicker">
            ${escapeHTML(episode.number)} / ${escapeHTML(episode.category)}
          </p>

          <h4>${escapeHTML(episode.title)}</h4>
          <p>${escapeHTML(episode.description)}</p>

          <a class="card-link"
             href="${url || "#podcast"}"
             ${url ? 'target="_blank" rel="noopener noreferrer"' : ""}>
            Watch / listen <span>↗</span>
          </a>
        </div>
      </article>
    `;
  }).join("");

  if (episodeCount) {
    episodeCount.textContent = String(episodes.length).padStart(2, "0");
  }
}

/* Render digital product cards. */
const ebookGrid = document.getElementById("ebookGrid");

if (ebookGrid) {
  ebookGrid.innerHTML = ebooks.map(book => `
    <article class="ebook-card">
      <div class="ebook-cover ${escapeHTML(book.coverClass)}">
        <strong>${escapeHTML(book.cover)}</strong>
        <small>VIVEK PRABHAT GAUTAM · DIGITAL EDITION</small>
      </div>

      <div class="ebook-body">
        <p class="card-kicker">${escapeHTML(book.category)}</p>
        <h3>${escapeHTML(book.title)}</h3>
        <p>${escapeHTML(book.description)}</p>

        <div class="ebook-purchase">
          <span class="ebook-price">${escapeHTML(book.price)}</span>
          <button class="ebook-buy" type="button"
            data-checkout="${escapeHTML(book.url)}">
            Get e-book ↗
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

/* Mobile navigation menu. */
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const opened = nav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(opened));
    menuToggle.setAttribute(
      "aria-label",
      opened ? "Close navigation" : "Open navigation"
    );
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", event => {
    if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* Light/dark theme toggle. */
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-mode");

    themeToggle.textContent = isLight ? "☀" : "◐";
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", isLight ? "#f5f6fa" : "#080b14");
  });
}

/* E-book buttons open the provider checkout, if configured. */
if (ebookGrid) {
  ebookGrid.addEventListener("click", event => {
    const button = event.target.closest("[data-checkout]");
    if (!button) return;

    const checkoutURL = validURL(button.dataset.checkout.trim());

    if (!checkoutURL) {
      showToast("This e-book is not available yet. Add a real checkout link in script.js.");
      return;
    }

    window.open(checkoutURL, "_blank", "noopener,noreferrer");
  });
}

/* Contact form: prepare a message in the visitor's email app.
   Change this to an email address you actually use. */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    const recipient = "hello@vivekprabhatgautam.in";
    const subject = encodeURIComponent(`Website enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href =
      `mailto:${recipient}?subject=${subject}&body=${body}`;
  });
}

/* Small on-screen notifications. */
let toastTimeout;

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

/* Reveal sections as the visitor scrolls. */
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

/* Dynamic footer year. */
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}