// ============================
// SANJEEV AI — Main Application
// ============================

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
};

let currentPage = 'home';

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
  updateNav(page);
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

function bindPageEvents(page) {
  const main = document.getElementById('main-content');

  // Home page: quick action cards & tools navigate
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

  // Scanner: capture -> clearscript
  if (page === 'scanner') {
    main.querySelector('#scanner-capture')?.addEventListener('click', () => {
      navigate('clearscript');
    });
  }

  // ClearScript: confirm -> risk analysis
  if (page === 'clearscript') {
    main.querySelector('#clearscript-confirm')?.addEventListener('click', () => navigate('risk-analysis'));
  }

  // Risk Analysis: back to alert from status
  if (page === 'risk-analysis') {
    // Buttons are informational for now
  }

  // Mood: emoji selection
  if (page === 'mood') {
    const emojiBtns = main.querySelectorAll('.mood-emoji-btn');
    emojiBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        emojiBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
  }

  // Drug Interaction page events
  if (page === 'drug-interaction') {
    // Import and initialize D3 safety map
    import('https://cdn.jsdelivr.net/npm/d3@7/+esm').then(d3 => {
      if (typeof window.__initSafetyMap === 'function') {
        window.__initSafetyMap(d3);
      }
    });
  }
}

// ---- Bottom Nav Binding ----
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    navigate(item.dataset.page);
  });
});

// ---- Initial Load ----
navigate('home');
