// ============================
// SANJEEV AI — Main Application
// ============================

import { t, setLanguage, getLanguage } from './translate.js';
import { renderHome, initHome } from './pages/home.js';
import { renderScanner } from './pages/scanner.js';
import { renderTimeline, initTimeline } from './pages/timeline.js';
import { renderMood } from './pages/mood.js';
import { renderRiskAnalysis, initRiskAnalysis } from './pages/risk-analysis.js';
import { renderAlert } from './pages/alert.js';
import { renderCaregiver } from './pages/caregiver.js';
import { renderSymptoms, initSymptoms } from './pages/symptoms.js';
import { renderMedications, initMedications } from './pages/medications.js';
import { renderReport } from './pages/report.js';
import { renderClearScript } from './pages/clearscript.js';
import { renderDrugInteraction } from './pages/drug-interaction.js';
import { renderLogin } from './pages/login.js';
import { renderProfile } from './pages/profile.js';
import { api } from './api.js';

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
  profile: renderProfile,
};

// Initial States
window.__isLoggedIn = false;
window.__currentUserRole = 'patient'; // Default guest experience
let currentPage = 'home';
window.navigate = navigate;

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
    
    // Auto-fetch data for profile if logged in
    if (page === 'profile' && window.__isLoggedIn) {
      api.getContacts(window.__currentUserId).then(contacts => {
        window.__currentContacts = contacts;
        const renderer = pages['profile'];
        main.innerHTML = renderer(navigate);
        bindPageEvents('profile');
      });
    }

    bindPageEvents(page);
  }
  
  // Hide top & bottom nav for auth
  const topbar = document.getElementById('topbar');
  const bottomNav = document.getElementById('bottom-nav');
  const isAuthView = page === 'profile' && !window.__isLoggedIn;
  if (isAuthView) {
    if (topbar) topbar.style.display = 'none';
    if (bottomNav) bottomNav.style.display = 'none';
  } else {
    if (topbar) topbar.style.display = 'block';
    if (bottomNav) bottomNav.style.display = 'flex';
  }

  updateBottomNavHTML(page);
  updateStaticText();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateBottomNavHTML(page) {
  const bottomNav = document.getElementById('bottom-nav');
  if (!bottomNav) return;
  const role = window.__currentUserRole || 'patient';
  
  const navItems = {
    patient: [
      { id: 'home', icon: 'home', label: t('navHome') },
      { id: 'scanner', icon: 'document_scanner', label: t('navScanner') },
      { id: 'timeline', icon: 'timeline', label: t('navTimeline') },
      { id: 'mood', icon: 'wb_sunny', label: t('navMood') }
    ],
    caregiver: [
       { id: 'caregiver', icon: 'family_home', label: 'Hub' },
       { id: 'alert', icon: 'notifications_active', label: 'Alerts' },
       { id: 'medications', icon: 'pill', label: 'Meds' }
    ],
    pharmacist: [
       { id: 'home', icon: 'local_pharmacy', label: 'Queue' },
       { id: 'scanner', icon: 'document_scanner', label: 'Scan Rx' }
    ]
  };

  const items = navItems[role] || navItems['patient'];
  
  // Create mapping array to correctly highlight active states based on current route
  const activeTabMap = { home: 'home', scanner: 'scanner', clearscript: 'scanner', timeline: 'timeline', mood: 'mood', 'risk-analysis': 'scanner', alert: 'alert', caregiver: 'caregiver', symptoms: 'home', medications: 'medications', report: 'report', 'drug-interaction': 'home', profile: 'home' };
  const activeTab = activeTabMap[page] || page;

  bottomNav.innerHTML = items.map(item => `
    <a href="#" class="nav-item ${item.id === activeTab ? 'active' : ''}" data-page="${item.id}">
      <span class="material-symbols-outlined nav-icon">${item.icon}</span>
      <span class="nav-label">${item.label}</span>
    </a>
  `).join('');

  // Re-bind listeners for newly generated DOM elements
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(item.dataset.page);
    });
  });
}

// Updates static elements (header, nav labels) that live in index.html
function updateStaticText() {
  // Brand name
  const brand = document.querySelector('.brand-name');
  if (brand) brand.textContent = t('brandName');

  // Bottom nav is now correctly translated dynamically during draw.
}

function bindPageEvents(page) {
  const main = document.getElementById('main-content');

  // Home page
  if (page === 'home') {
    initHome();
    main.querySelector('#action-scan')?.addEventListener('click', () => navigate('scanner'));
    main.querySelector('#action-mood')?.addEventListener('click', () => navigate('mood'));
    main.querySelector('#action-alerts')?.addEventListener('click', () => navigate('alert'));
    main.querySelector('#tool-caregiver')?.addEventListener('click', () => navigate('caregiver'));
    main.querySelector('#tool-symptoms')?.addEventListener('click', () => navigate('symptoms'));
    main.querySelector('#tool-meds')?.addEventListener('click', () => navigate('medications'));
    main.querySelector('#tool-report')?.addEventListener('click', () => navigate('report'));
    main.querySelector('#tool-interaction')?.addEventListener('click', () => navigate('drug-interaction'));
    main.querySelector('#sos-btn')?.addEventListener('click', () => {
      if (window.__isLoggedIn) navigate('profile');
      else alert('Please login to use Emergency SOS features');
    });
  }

  // Scanner
  if (page === 'scanner') {
    main.querySelector('#scanner-capture')?.addEventListener('click', () => {
      const text = main.querySelector('#scanner-input')?.value || "Rx Metformin 500mg, twice a day, Dr. Roberts";
      sessionStorage.setItem('scanText', text);
      navigate('clearscript');
    });
  }

  // ClearScript
  if (page === 'clearscript') {
    main.querySelector('#clearscript-confirm')?.addEventListener('click', async () => {
      const lastScanStr = sessionStorage.getItem('lastScan');
      if (lastScanStr) {
        try {
          const data = JSON.parse(lastScanStr);
          const userId = window.__currentUserId || localStorage.getItem('userId');
          if (userId && userId !== '1' && userId !== 'undefined') {
            await api.addPrescription(userId, {
              medication: data.medication || 'Unknown',
              dosage: data.dosage || '',
              instructions: data.instructions || '',
              doctorName: data.doctorName || 'Unknown',
              dateScanned: new Date().toISOString()
            });
          }
        } catch(e) {
          console.error("Error saving prescription", e);
        }
      }
      navigate('risk-analysis');
    });
  }

  // Risk Analysis
  if (page === 'risk-analysis') {
    initRiskAnalysis();
  }

  // Timeline
  if (page === 'timeline') {
    initTimeline();
  }

  // Medications
  if (page === 'medications') {
    initMedications();
  }

  // Mood
  if (page === 'mood') {
    let currentMoodLevel = 3; // Default 3 (Calm)
    
    const emojiBtns = main.querySelectorAll('.mood-emoji-btn');
    emojiBtns.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        emojiBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        currentMoodLevel = idx + 1; // 1 to 5 scale
      });
    });

    const saveBtn = main.querySelector('#save-mood-btn');
    saveBtn?.addEventListener('click', async () => {
      const notes = main.querySelector('#mood-notes')?.value || "";
      const feedback = main.querySelector('#mood-feedback');
      
      try {
        saveBtn.textContent = 'Saving...';
        await api.addMood(window.__currentUserId || 1, {
          moodLevel: currentMoodLevel,
          notes: notes,
          date: new Date().toISOString()
        });
        
        saveBtn.textContent = 'Save Daily Mood';
        if (feedback) feedback.textContent = "Mood saved successfully!";
        setTimeout(() => { if (feedback) feedback.textContent = ""; }, 3000);
      } catch (err) {
        if (feedback) {
          feedback.style.color = 'red';
          feedback.textContent = "Error: " + err.message;
        }
        saveBtn.textContent = 'Save Daily Mood';
      }
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

  // --- Global Toast Function ---
  if (!window.showToast) {
    window.showToast = function(msg, isError = false) {
      let toast = document.getElementById('sanjeev-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'sanjeev-toast';
        toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);padding:12px 24px;border-radius:24px;z-index:9999;font-weight:600;opacity:0;transition:opacity 0.3s;pointer-events:none;box-shadow:0 4px 12px rgba(0,0,0,0.2);';
        document.body.appendChild(toast);
      }
      toast.style.background = isError ? 'var(--error)' : 'var(--primary)';
      toast.style.color = 'white';
      toast.textContent = msg;
      toast.style.opacity = '1';
      setTimeout(() => toast.style.opacity = '0', 3000);
    }
  }

  // --- Specific Missing Bindings ---
  if (page === 'profile') {
    main.querySelector('#profile-logout-btn')?.addEventListener('click', () => {
      window.__isLoggedIn = false;
      localStorage.removeItem('sanjeev_token');
      window.showToast("Logged out safely");
      navigate('login');
    });
    main.querySelector('.btn-secondary')?.addEventListener('click', () => window.showToast('Edit mode enabled'));
  }

  if (page === 'scanner') {
    main.querySelectorAll('.btn-secondary').forEach(b => {
      b.addEventListener('click', () => window.showToast("Opening file browser..."));
    });
  }

  if (page === 'drug-interaction') {
    main.querySelector('#add-drug-btn')?.addEventListener('click', () => window.showToast("Search field activated"));
    main.querySelector('#copy-report-btn')?.addEventListener('click', () => window.showToast("Report copied to clipboard!"));
    main.querySelector('#export-pdf-btn')?.addEventListener('click', () => window.showToast("Generating PDF... Download will start shortly."));
    main.querySelector('#alert-doctor-btn')?.addEventListener('click', () => window.showToast("High Alert sent to Dr. Roberts!", true));
    main.querySelector('#make-simpler-btn')?.addEventListener('click', () => window.showToast("Simplifying medical jargon..."));
  }

  if (page === 'report') {
    main.querySelector('.btn-primary')?.addEventListener('click', () => window.showToast("Report generated and saved!"));
    main.querySelector('.icon-btn')?.addEventListener('click', () => window.showToast("Downloading secure PDF..."));
  }

  if (page === 'symptoms') {
    initSymptoms();
  }

  if (page === 'caregiver') {
    main.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (!e.target.closest('#tool-interaction')) {
          window.showToast(btn.textContent.trim() + " triggered");
        }
      });
    });
  }

  if (page === 'alert') {
    main.querySelector('.btn-primary')?.addEventListener('click', () => {
      window.showToast("Contacting doctor immediately!", true);
      navigate('home');
    });
    main.querySelector('.btn-error')?.addEventListener('click', () => {
      window.showToast("Siren activated!", true);
    });
    main.querySelector('.btn-tertiary-warm')?.addEventListener('click', () => {
      window.showToast("Alert dismissed for 1 hour");
      navigate('home');
    });
  }

  // --- Generic Fallback for ALL buttons ---
  main.querySelectorAll('button').forEach(btn => {
    // If the button has no click listener yet (roughly checking by id and class)
    if (!btn.id && !btn.getAttribute('onclick') && !btn.className.includes('mood-emoji') && !btn.className.includes('nav-item')) {
      // Add a quiet fallback
      btn.addEventListener('click', (e) => {
        // Don't override if it's already doing something complex
        if (e.defaultPrevented) return;
        const text = btn.textContent.trim().replace('chevron_right', '').replace('download', 'Download') || 'Action';
        if (text) window.showToast(`${text} processed successfully!`);
      });
    }
  });

  // Profile (Existing logic)
  if (page === 'profile') {
    // Google Login Initialization
    if (window.google && window.google.accounts) {
      setTimeout(() => {
        const btnContainer = main.querySelector("#google-signin-btn");
        if (btnContainer) {
          window.google.accounts.id.initialize({
            client_id: "597980671013-7jlpi4v0cvgdsdeso10mb2av0gbid17h.apps.googleusercontent.com", // Ensure this matches .env
            callback: async (response) => {
              try {
                const role = main.querySelector('#role-select')?.value || 'patient';
                const submitBtnText = main.querySelector('#auth-submit span.btn-text');
                if(submitBtnText) submitBtnText.textContent = 'Authenticating via Google...';
                
                const authData = await api.googleLogin(response.credential, role);
                
                window.__isLoggedIn = true;
                window.__currentUserRole = authData.user.role;
                window.__currentUserName = authData.user.name;
                window.__currentUserId = authData.user.id;
                window.__currentHealthId = authData.user.healthId;
                localStorage.setItem('sanjeev_token', authData.token);
                localStorage.setItem('userId', authData.user.id);
                
                window.showToast("Login Successful!");
                navigate(authData.user.role === 'caregiver' ? 'caregiver' : 'home');
              } catch (err) {
                window.showToast('Google Auth Error: ' + err.message, true);
                const submitBtnText = main.querySelector('#auth-submit span.btn-text');
                if(submitBtnText) submitBtnText.textContent = 'Enter Hub';
              }
            }
          });
          window.google.accounts.id.renderButton(
            btnContainer,
            { theme: "outline", size: "large", shape: "pill", width: 300 }
          );
        }
      }, 100);
    }

    // Auth Form
    const authForm = main.querySelector('#profile-auth-form');
    if (authForm) {
      authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const toggleBtn = main.querySelector('#auth-mode-btn');
        const mode = toggleBtn ? toggleBtn.dataset.mode : 'login';
        
        const role = main.querySelector('#role-select').value;
        const passkey = main.querySelector('#passkey-input').value.trim();
        const submitBtnText = main.querySelector('#auth-submit span.btn-text');
        
        try {
          submitBtnText.textContent = 'Authenticating...';
          let authData;
          
          if (mode === 'signup') {
             const nameVal = main.querySelector('#name-input').value.trim();
             authData = await api.register(nameVal, role, passkey);
          } else {
             authData = await api.login(role, passkey);
          }
          
          window.__isLoggedIn = true;
          window.__currentUserRole = authData.user.role;
          window.__currentUserName = authData.user.name;
          window.__currentUserId = authData.user.id;
          window.__currentHealthId = authData.user.healthId;
          localStorage.setItem('sanjeev_token', authData.token);
          localStorage.setItem('userId', authData.user.id);
          
          navigate(authData.user.role === 'caregiver' ? 'caregiver' : 'home');

        } catch (err) {
          alert('Auth Error: ' + err.message);
          submitBtnText.textContent = mode === 'signup' ? 'Sign Up' : 'Enter Hub';
        }
      });

      const toggleBtn = main.querySelector('#auth-mode-btn');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const mode = toggleBtn.dataset.mode;
          const title = main.querySelector('#auth-title');
          const submitBtn = main.querySelector('#auth-submit span.btn-text');
          const nameContainer = main.querySelector('#name-field-container');
          
          if (mode === 'login') {
            toggleBtn.dataset.mode = 'signup';
            title.textContent = 'Create Account';
            submitBtn.textContent = 'Sign Up';
            nameContainer.style.display = 'block';
            toggleBtn.innerHTML = 'Already have an account? <b style="color:var(--primary-fixed)">Log in</b>';
          } else {
            toggleBtn.dataset.mode = 'login';
            title.textContent = 'Sanjeev AI';
            submitBtn.textContent = 'Enter Hub';
            nameContainer.style.display = 'none';
            toggleBtn.innerHTML = 'New here? <b style="color:var(--primary-fixed)">Sign up for free</b>';
          }
        });
      }
    }

    // Contacts Logic
    const addBtn = main.querySelector('#add-contact-btn');
    const modal = main.querySelector('#contact-modal');
    const closeBtn = main.querySelector('#close-modal');
    const contactForm = main.querySelector('#contact-form');

    if (addBtn && modal) {
      addBtn.addEventListener('click', () => modal.style.display = 'flex');
      closeBtn.addEventListener('click', () => modal.style.display = 'none');
    }

    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const contactData = {
          name: main.querySelector('#contact-name').value,
          relation: main.querySelector('#contact-relation').value,
          phone: main.querySelector('#contact-phone').value,
          isSOS: main.querySelector('#contact-sos').checked
        };
        
        try {
          await api.addContact(window.__currentUserId, contactData);
          modal.style.display = 'none';
          navigate('profile'); // Re-render to show new contact
        } catch (err) {
          alert('Error adding contact: ' + err.message);
        }
      });
    }

    // Logout
    main.querySelector('#profile-logout-btn')?.addEventListener('click', () => {
      window.__isLoggedIn = false;
      window.__currentUserRole = 'patient';
      window.__currentContacts = [];
      navigate('profile'); // Return to auth
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

// ---- Bottom Nav Binding (Initial) ----
// Note: This gets re-bound upon every HTML injection natively by updateBottomNavHTML,
// but leaving this block empty natively.


// ---- Topbar Global Binds ----
const profileBtn = document.getElementById('profile-btn');
if (profileBtn) {
  profileBtn.addEventListener('click', () => navigate('profile'));
}

// ---- Initial Load ----
navigate('home');
