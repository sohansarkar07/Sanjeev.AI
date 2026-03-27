// Caregiver Dashboard
export function renderCaregiver(navigate) {
  const t = window.__t;

  return `
  <div class="page-enter">
    <header style="margin-bottom: var(--space-8);">
      <div style="display:flex; align-items:center; justify-content:space-between;">
        <div>
          <h2 class="page-title" style="font-size:2rem;">${t('cgTitle')}</h2>
          <p class="page-subtitle">${t('cgSub')}</p>
        </div>
        <div style="background:var(--secondary-container); padding:var(--space-2) var(--space-4); border-radius:var(--radius-full); display:flex; align-items:center; gap:var(--space-2);">
          <span class="material-symbols-outlined" style="color:var(--primary);">group</span>
          <span style="font-weight:600; font-size:0.875rem; color:var(--primary);">Rahul</span>
        </div>
      </div>
    </header>

    <!-- Caregiver Top Alerts -->
    <div class="alert-warning-card" style="margin-bottom: var(--space-8); cursor: pointer;" id="caregiver-sos-alert">
      <div class="glow"></div>
      <div class="alert-header">
        <div class="alert-icon-wrap"><span class="material-symbols-outlined">warning</span></div>
        <div>
          <h3>${t('cgMissedDose')}</h3>
          <p class="severity">${t('sevMedium')}</p>
        </div>
      </div>
      <div class="alert-body">
        <p>${t('missedDesc')}</p>
      </div>
    </div>

    <!-- Compliance Tracker -->
    <section style="margin-bottom: var(--space-10);">
      <h3 class="section-title" style="margin-bottom:var(--space-4);">${t('weeklyCompliance')}</h3>
      <div class="card" style="display:flex; justify-content:space-between; align-items:flex-end; padding:var(--space-6);">
        <div style="text-align:center;">
          <div style="height:4rem; width:1rem; background:var(--primary); border-radius:var(--radius-full); margin:0 auto;"></div>
          <p style="font-size:0.75rem; font-weight:600; margin-top:var(--space-2);">MON</p>
        </div>
        <div style="text-align:center;">
          <div style="height:4rem; width:1rem; background:var(--primary); border-radius:var(--radius-full); margin:0 auto;"></div>
          <p style="font-size:0.75rem; font-weight:600; margin-top:var(--space-2);">TUE</p>
        </div>
        <div style="text-align:center;">
          <div style="height:4rem; width:1rem; background:var(--primary); border-radius:var(--radius-full); margin:0 auto;"></div>
          <p style="font-size:0.75rem; font-weight:600; margin-top:var(--space-2);">WED</p>
        </div>
        <div style="text-align:center;">
          <div style="height:2rem; width:1rem; background:var(--tertiary); border-radius:var(--radius-full); margin:0 auto;"></div>
          <p style="font-size:0.75rem; font-weight:600; margin-top:var(--space-2);">THU</p>
        </div>
        <div style="text-align:center;">
          <div style="height:0rem; width:1rem; background:var(--error-container); border-radius:var(--radius-full); margin:0 auto;"></div>
          <p style="font-size:0.75rem; font-weight:600; margin-top:var(--space-2); color:var(--error);">${t('today')}</p>
        </div>
      </div>
    </section>

    <!-- Emergency Contacts -->
    <section>
      <h3 class="section-title" style="margin-bottom:var(--space-4);">${t('emergencyCare')}</h3>
      <div style="display:grid; grid-template-columns: 1fr; gap:var(--space-4);">
        <button class="btn-error" style="border-radius:var(--radius-xl); font-size:1rem; justify-content:flex-start;">
          <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">emergency_home</span>
          ${t('triggerSos')}
        </button>
        <button class="btn-secondary" style="border-radius:var(--radius-xl); font-size:1rem; padding:var(--space-5); justify-content:flex-start;">
          <span class="material-symbols-outlined">call</span>
          ${t('callPrimary')}
        </button>
      </div>
    </section>
  </div>
  `;
}
