// Home Dashboard
export function renderHome(navigate) {
  const t = window.__t;
  const circumference = 2 * Math.PI * 58;
  const score = 85;
  const offset = circumference * (1 - score / 100);

  return `
  <div class="page-enter">
    <!-- Hero Section -->
    <section class="home-hero">
      <div class="home-hero-text">
        <h2 class="page-title">${t('greeting')}</h2>
        <p class="page-subtitle">${t('greetingSub')}</p>
      </div>
      <div class="safety-gauge">
        <div class="deco">
          <span class="material-symbols-outlined">shield_with_heart</span>
        </div>
        <div style="position:relative; width:8rem; height:8rem; display:flex; align-items:center; justify-content:center;">
          <svg class="gauge-svg" viewBox="0 0 128 128">
            <circle class="gauge-bg" cx="64" cy="64" r="58" />
            <circle class="gauge-fill" cx="64" cy="64" r="58" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" />
          </svg>
          <div class="gauge-center">
            <span class="gauge-value">${score}</span>
            <span class="gauge-label">${t('safety')}</span>
          </div>
        </div>
        <span class="gauge-title">${t('medSafetyScore')}</span>
      </div>
    </section>

    <!-- Quick Actions -->
    <section class="quick-actions">
      <div class="action-card action-card--scan" id="action-scan">
        <span class="material-symbols-outlined">document_scanner</span>
        <div>
          <h4>${t('scanPrescription')}</h4>
          <p>${t('scanDesc')}</p>
        </div>
      </div>
      <div class="action-card action-card--mood card" id="action-mood">
        <span class="material-symbols-outlined">wb_sunny</span>
        <div>
          <h4>${t('checkMood')}</h4>
          <p>${t('moodDesc')}</p>
        </div>
      </div>
      <div class="action-card action-card--alerts card" id="action-alerts">
        <span class="alert-dot"></span>
        <span class="material-symbols-outlined">notifications_active</span>
        <div>
          <h4>${t('viewAlerts')}</h4>
          <p>${t('alertsDesc')}</p>
        </div>
      </div>
    </section>

    <!-- Next Dose -->
    <section class="next-dose">
      <div class="next-dose-info">
        <div class="next-dose-icon">
          <span class="material-symbols-outlined">pill</span>
        </div>
        <div>
          <span class="label-caps">${t('yourNextDose')}</span>
          <h3 class="next-dose-name">Metformin (500mg)</h3>
          <div class="next-dose-meta">
            <span class="chip">
              <span class="material-symbols-outlined" style="font-size:1.125rem">schedule</span> 08:30 AM
            </span>
            <span class="chip" style="background:var(--secondary-container)">
              <span class="material-symbols-outlined" style="font-size:1.125rem">water_drop</span> ${t('withWarmWater')}
            </span>
          </div>
        </div>
      </div>
      <button class="btn-primary" style="box-shadow: 0 8px 24px rgba(1,45,29,0.1);">${t('markAsTaken')}</button>
    </section>

    <!-- Essential Tools Grid -->
    <section style="margin-bottom:var(--space-10);">
      <h3 class="section-title" style="margin-bottom:var(--space-4);">${t('holisticTools')}</h3>
      <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:var(--space-4);">
        <div class="card" id="tool-symptoms" style="cursor:pointer; padding:var(--space-4); text-align:center;">
          <span class="material-symbols-outlined" style="color:var(--primary); font-size:2rem; margin-bottom:var(--space-2);">record_voice_over</span>
          <h5 style="font-weight:700; color:var(--primary); font-size:0.875rem;">${t('symptomCheck')}</h5>
        </div>
        <div class="card" id="tool-meds" style="cursor:pointer; padding:var(--space-4); text-align:center;">
          <span class="material-symbols-outlined" style="color:var(--primary); font-size:2rem; margin-bottom:var(--space-2);">join</span>
          <h5 style="font-weight:700; color:var(--primary); font-size:0.875rem;">${t('mergedMeds')}</h5>
        </div>
        <div class="card" id="tool-caregiver" style="cursor:pointer; padding:var(--space-4); text-align:center;">
          <span class="material-symbols-outlined" style="color:var(--primary); font-size:2rem; margin-bottom:var(--space-2);">family_home</span>
          <h5 style="font-weight:700; color:var(--primary); font-size:0.875rem;">${t('caregiverHub')}</h5>
        </div>
        <div class="card" id="tool-report" style="cursor:pointer; padding:var(--space-4); text-align:center;">
          <span class="material-symbols-outlined" style="color:var(--primary); font-size:2rem; margin-bottom:var(--space-2);">insert_chart</span>
          <h5 style="font-weight:700; color:var(--primary); font-size:0.875rem;">${t('weeklyReport')}</h5>
        </div>
        <div class="card" id="tool-interaction" style="cursor:pointer; padding:var(--space-4); text-align:center;">
          <span class="material-symbols-outlined" style="color:var(--primary); font-size:2rem; margin-bottom:var(--space-2);">hub</span>
          <h5 style="font-weight:700; color:var(--primary); font-size:0.875rem;">${t('interactionMap')}</h5>
        </div>
      </div>
    </section>

    <!-- Insights Banner -->
    <section class="insights-banner">
      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG5AMcOSnCys69_lYg7aO1ZjK8H1KQJaSFz9L2wwjsR3wj_E8K2NmRUhLHXkZf-zG9K58hD0kI6RMXOqcXAUrCusYPB4hbZnHuWiq5ncEmsF_kXkBOq3W9Rvz30_6T2RdVGEuS27T8-B4VsDwrPlDA9u1mk6295cId4NsM0CszOQtImq_ptOtznJT6AcskPr7vLvCSTT3o52X7ivQyOVuZ7wivAOBXoIAZKvzG-hmKoTyyumwdXO5VKglYHrlDqLRiUBcrGt9THg" alt="Herbs and medicine flat lay" />
      <div class="insights-banner-overlay">
        <span class="tag">${t('weeklyWisdom')}</span>
        <h3>${t('insightTitle')}</h3>
        <p>${t('insightDesc')}</p>
      </div>
    </section>
  </div>
  `;
}
