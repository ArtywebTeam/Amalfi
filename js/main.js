/**
 * PIZZERIA AMALFI - MAIN APPLICATION LOGIC
 * Reconstructed with Vanilla JavaScript
 * Features:
 *  - Instant Bilingual Switching (IT / EN) with LocalStorage persistence
 *  - Dark / Light Theme Toggling with LocalStorage persistence
 *  - Custom Pizza Cursor & Flour Dust Trail Effect (pointer: fine)
 *  - Dynamic Review Quotes Rendering
 */

// --- Content Dictionaries ---
const translations = {
  it: {
    nav: ["Identità", "Specialità", "Galleria", "Recensioni", "Dove siamo"],
    heroEyebrow: "Pizzeria da asporto · Dal 1980",
    heroTitle: "L’arte della pizza in Val Trompia.",
    heroBody: "Impasti leggeri, farciture generose e l’accoglienza sincera di una pizzeria di famiglia.",
    call: "Ordina al telefono",
    explore: "Scopri le specialità",
    identityKicker: "Amalfi, dal 1980",
    identityTitle: "Una pizza che sa di casa.",
    identityBody: "A Gardone Val Trompia, Amalfi porta avanti una storia familiare fatta di impasti curati, ingredienti scelti e una gentilezza che i clienti ricordano. Una pizzeria da asporto semplice, autentica e amata in Valle.",
    badge: "4,4 su Google",
    specialtiesKicker: "Il nostro modo di fare pizza",
    specialtiesTitle: "Scegli la tua esperienza.",
    specialtiesBody: "Dalla pizza verace alla pizza al metro: formati diversi, la stessa attenzione all’impasto e alla cottura.",
    formats: [
      "Pizza verace",
      "Pizza al metro",
      "Impasto al kamut",
      "Focacce",
      "Panini pizza",
      "Consegna a domicilio"
    ],
    galleryKicker: "Appena sfornata",
    galleryTitle: "La pizza parla da sé.",
    galleryBody: "Crosta dorata, mozzarella filante e farciture abbondanti. Uno sguardo vero alle pizze preparate ogni sera.",
    reviewsKicker: "La voce della Valle",
    reviewsTitle: "Amata da chi torna.",
    callNow: "Chiamaci ora",
    visitKicker: "Vieni a trovarci",
    visitTitle: "La tua pizza, questa sera.",
    address: "Via Matteotti 65, Gardone Val Trompia (BS)",
    hours: "Ogni giorno",
    time: "18:00 — 21:30",
    directions: "Apri indicazioni",
    finalTitle: "Stasera scegli Amalfi.",
    finalBody: "Chiama, ordina e passa a ritirare la tua pizza appena sfornata.",
    facebook: "Seguici su Facebook",
    footer: "Pizzeria Amalfi · Dal 1980 · Gardone Val Trompia"
  },
  en: {
    nav: ["Our story", "Specialities", "Gallery", "Reviews", "Visit"],
    heroEyebrow: "Takeaway pizzeria · Since 1980",
    heroTitle: "The art of pizza in the heart of the Valley.",
    heroBody: "Light dough, generous toppings and the genuine welcome of a family-run pizzeria.",
    call: "Call to order",
    explore: "Explore specialities",
    identityKicker: "Amalfi, since 1980",
    identityTitle: "Pizza that feels like home.",
    identityBody: "In Gardone Val Trompia, Amalfi carries on a family story of carefully prepared dough, selected ingredients and kindness customers remember. A straightforward, authentic takeaway loved across the Valley.",
    badge: "4.4 on Google",
    specialtiesKicker: "Our way with pizza",
    specialtiesTitle: "Choose your experience.",
    specialtiesBody: "From authentic round pizza to pizza by the metre: different formats, the same care for dough and baking.",
    formats: [
      "Authentic pizza",
      "Pizza by the metre",
      "Kamut dough",
      "Focaccia",
      "Pizza sandwiches",
      "Home delivery"
    ],
    galleryKicker: "Fresh from the oven",
    galleryTitle: "The pizza speaks for itself.",
    galleryBody: "Golden crust, melting mozzarella and generous toppings. A real look at the pizzas prepared every evening.",
    reviewsKicker: "The Valley’s verdict",
    reviewsTitle: "Loved by those who return.",
    callNow: "Call us now",
    visitKicker: "Come and see us",
    visitTitle: "Your pizza, tonight.",
    address: "65 Via Matteotti, Gardone Val Trompia (BS)",
    hours: "Every day",
    time: "6:00 PM — 9:30 PM",
    directions: "Get directions",
    finalTitle: "Choose Amalfi tonight.",
    finalBody: "Call, order and collect your pizza fresh from the oven.",
    facebook: "Follow us on Facebook",
    footer: "Pizzeria Amalfi · Since 1980 · Gardone Val Trompia"
  }
};

const reviews = [
  {
    name: "Celeste Tamburini",
    quote: "Pizza veramente buona, servizio super. Miglior pizza in Valle.",
    en: "Truly excellent pizza and superb service. The best pizza in the Valley."
  },
  {
    name: "Daniele Boglioni",
    quote: "Personale gentilissimo, materie prime al top e pizze sempre ottime!",
    en: "Wonderful staff, top-quality ingredients and consistently excellent pizzas!"
  },
  {
    name: "Lucia Zubani",
    quote: "Ingredienti di prima qualità. I proprietari sono sempre sorridenti, gentilissimi e disponibili.",
    en: "First-class ingredients. The owners are always smiling, kind and helpful."
  },
  {
    name: "Alex Marchetti",
    quote: "Per me rimane la migliore in tutto. La pizza sempre buona.",
    en: "For me it remains the very best. The pizza is always delicious."
  }
];

// --- State Management ---
let currentLang = localStorage.getItem("amalfi-lang") || "it";
let isDark = localStorage.getItem("amalfi-theme") === "dark";

// --- DOM Elements ---
const langToggleBtn = document.getElementById("lang-toggle-btn");
const themeToggleBtn = document.getElementById("theme-toggle-btn");
const reviewsContainer = document.getElementById("reviews-track");
const pizzaPointer = document.getElementById("pizza-pointer");

// --- SVGs for Icons ---
const sunIconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
const moonIconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;

// --- Render Content by Language ---
function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("amalfi-lang", lang);
  document.documentElement.lang = lang;

  const t = translations[lang];

  // Update Navigation Links
  const navLinks = document.querySelectorAll("[data-nav-idx]");
  navLinks.forEach((link, idx) => {
    if (t.nav[idx]) {
      link.textContent = t.nav[idx];
    }
  });

  // Update Simple i18n text nodes
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key] !== undefined) {
      el.textContent = t[key];
    }
  });

  // Update Specialities Formats
  document.querySelectorAll("[data-format-idx]").forEach(el => {
    const idx = parseInt(el.getAttribute("data-format-idx"), 10);
    if (t.formats[idx]) {
      el.textContent = t.formats[idx];
    }
  });

  // Update Language Toggle Button Label
  if (langToggleBtn) {
    langToggleBtn.textContent = lang === "it" ? "EN" : "IT";
  }

  // Re-render Reviews with active language
  renderReviews();
}

// --- Render Reviews Track ---
function renderReviews() {
  if (!reviewsContainer) return;
  reviewsContainer.innerHTML = "";

  reviews.forEach(item => {
    const quoteText = currentLang === "it" ? item.quote : item.en;

    const card = document.createElement("article");
    card.className = "majolica-card review-card";
    card.innerHTML = `
      <div>
        <svg class="review-quote-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
        </svg>
        <p class="review-text">“${quoteText}”</p>
      </div>
      <div class="review-footer">
        <strong class="review-author">${item.name}</strong>
        <span class="review-stars">
          ${Array(5).fill(`<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`).join("")}
        </span>
      </div>
    `;
    reviewsContainer.appendChild(card);
  });
}

// --- Theme Management ---
function applyTheme(dark) {
  isDark = dark;
  localStorage.setItem("amalfi-theme", dark ? "dark" : "light");
  document.documentElement.classList.toggle("dark", dark);

  if (themeToggleBtn) {
    themeToggleBtn.innerHTML = dark ? sunIconSvg : moonIconSvg;
    themeToggleBtn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  }
}

// --- Interactive Pizza Cursor & Flour Dust ---
function initPizzaCursor() {
  if (!window.matchMedia("(pointer: fine)").matches) return;

  document.body.classList.add("pizza-cursor-active");
  let lastParticleTime = 0;

  window.addEventListener("mousemove", e => {
    if (pizzaPointer) {
      pizzaPointer.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }

    const now = Date.now();
    if (now - lastParticleTime > 65) {
      const dust = document.createElement("i");
      dust.className = "flour-dust";
      dust.style.left = `${e.clientX}px`;
      dust.style.top = `${e.clientY}px`;
      document.body.appendChild(dust);

      setTimeout(() => {
        dust.remove();
      }, 650);

      lastParticleTime = now;
    }
  });
}

// --- Event Listeners ---
document.addEventListener("DOMContentLoaded", () => {
  // Apply stored language and theme
  applyLanguage(currentLang);
  applyTheme(isDark);

  // Initialize Custom Cursor
  initPizzaCursor();

  // Language Toggle Button Click
  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", () => {
      applyLanguage(currentLang === "it" ? "en" : "it");
    });
  }

  // Theme Toggle Button Click
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      applyTheme(!isDark);
    });
  }
});
