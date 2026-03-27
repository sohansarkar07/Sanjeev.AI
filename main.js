// ============================
// SANJEEV AI — Main Application
// ============================

import { t, setLanguage, getLanguage } from './translate.js';
import { renderHome } from './pages/home.js';
import { renderScanner } from './pages/scanner.js';
import { renderTimeline } from './pages/timeline.js';
import { renderMood } from './pages/mood.js';
import { renderRiskAnalysis } from './pages/risk-analysis.js';
import { renderAlert } from './pages/alert.js';
import { renderCaregiver } from './pages/caregiver.js';
import { renderSymptoms } from './pages/symptoms.js';
import { renderMedications } from './pages/medications.js';
import { renderReport } from './pages/report.js';
import { renderClearScript } from './pages/clearscript.js';
import { renderDrugInteraction } from './pages/drug-interaction.js';
import { renderLogin } from './pages/login.js';

// Expose t() globally so pages can use it
window.__t = t;

// ---- Router ----
const pages = {
  home: renderHome,
  scanner: renderScanner,
  clearscript: renderClearScript,
  timeline: renderTimeline,
  mood: renderMood,
  'risk-analysis': renderRiskAnalysis,
  alert: renderAlert,
  caregiver: renderCaregiver,
  symptoms: renderSymptoms,
  medications: renderMedications,
  report: renderReport,
  'drug-interaction': renderDrugInteraction,
  login: renderLogin,
};

let currentPage = 'login';

function navigate(page) {
  currentPage = page;
  const main = document.getElementById('main-content');
  const renderer = pages[page];
  if (renderer) {
    main.innerHTML = '';
    const content = renderer(navigate);
    if (typeof content === 'string') {
      main.innerHTML = content;
    } else {
      main.appendChild(content);
    }
    main.querySelector('.page-enter') || main.firstElementChild?.classList.add('page-enter');
    bindPageEvents(page);
  }
  
  // Hide top & bottom nav for login
  const topbar = document.getElementById('topbar');
  const bottomNav = document.getElementById('bottom-nav');
  if (page === 'login') {
    if (topbar) topbar.style.display = 'none';
    if (bottomNav) bottomNav.style.display = 'none';
  } else {
    if (topbar) topbar.style.display = 'block';
    if (bottomNav) bottomNav.style.display = 'flex';
  }

  updateNav(page);
  updateStaticText();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateNav(page) {
  const navMap = { home: 'home', scanner: 'scanner', clearscript: 'scanner', timeline: 'timeline', mood: 'mood', 'risk-analysis': 'scanner', alert: 'scanner', caregiver: 'home', symptoms: 'home', medications: 'home', report: 'home', 'drug-interaction': 'home' };
  const activeTab = navMap[page] || page;
  document.querySelectorAll('.nav-item').forEach(item => {
    const itemPage = item.dataset.page;
    item.classList.toggle('active', itemPage === activeTab);
  });
}

// Updates static elements (header, nav labels) that live in index.html
function updateStaticText() {
  // Brand name
  const brand = document.querySelector('.brand-name');
  if (brand) brand.textContent = t('brandName');

  // Bottom nav labels
  document.querySelectorAll('.nav-item').forEach(item => {
    const label = item.querySelector('.nav-label');
    if (!label) return;
    const page = item.dataset.page;
    const map = { home: 'navHome', scanner: 'navScanner', timeline: 'navTimeline', mood: 'navMood' };
    if (map[page]) label.textContent = t(map[page]);
  });
}

function bindPageEvents(page) {
  const main = document.getElementById('main-content');

  // Home page
  if (page === 'home') {
    main.querySelector('#action-scan')?.addEventListener('click', () => navigate('scanner'));
    main.querySelector('#action-mood')?.addEventListener('click', () => navigate('mood'));
    main.querySelector('#action-alerts')?.addEventListener('click', () => navigate('alert'));
    main.querySelector('#tool-caregiver')?.addEventListener('click', () => navigate('caregiver'));
    main.querySelector('#tool-symptoms')?.addEventListener('click', () => navigate('symptoms'));
    main.querySelector('#tool-meds')?.addEventListener('click', () => navigate('medications'));
    main.querySelector('#tool-report')?.addEventListener('click', () => navigate('report'));
    main.querySelector('#tool-interaction')?.addEventListener('click', () => navigate('drug-interaction'));
  }

  // Scanner
  if (page === 'scanner') {
    main.querySelector('#scanner-capture')?.addEventListener('click', () => navigate('clearscript'));
  }

  // Login
  if (page === 'login') {
    const form = main.querySelector('#login-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const role = main.querySelector('#role-select').value;
        // Depending on role we could navigate differently, but let's go 'home' for demo
        navigate('home');
      });
    }
  }

  // ClearScript
  if (page === 'clearscript') {
    main.querySelector('#clearscript-confirm')?.addEventListener('click', () => navigate('risk-analysis'));
  }

  // Mood
  if (page === 'mood') {
    const emojiBtns = main.querySelectorAll('.mood-emoji-btn');
    emojiBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        emojiBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
  }

  // Drug Interaction
  if (page === 'drug-interaction') {
    import('https://cdn.jsdelivr.net/npm/d3@7/+esm').then(d3 => {
      if (typeof window.__initSafetyMap === 'function') {
        window.__initSafetyMap(d3);
      }
    });
  }
}

// ---- Language Selector ----
const langSelect = document.querySelector('select[aria-label="Language Selector"]');
if (langSelect) {
  langSelect.addEventListener('change', (e) => {
    setLanguage(e.target.value);
    // Re-render current page with new language
    navigate(currentPage);
  });
}

// ---- Bottom Nav Binding ----
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    navigate(item.dataset.page);
  });
});

// ---- Initial Load ----
navigate('login');
