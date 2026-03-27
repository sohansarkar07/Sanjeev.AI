// Risk Analysis
export function renderRiskAnalysis(navigate) {
  const t = window.__t;

  return `
  <div class="page-enter">
    <header style="margin-bottom: var(--space-10);">
      <h2 class="page-title">${t('riskTitle')}</h2>
      <p class="page-subtitle">${t('riskSub')}</p>
    </header>

    <div class="risk-bento">
      <!-- Status Card -->
      <div class="risk-status-card">
        <div class="status-header">
          <span class="material-symbols-outlined">warning</span>
          <span class="status-title">${t('cautionTitle')}</span>
        </div>
        <p style="color:var(--on-surface-variant); line-height:1.6;">
          ${t('cautionDesc')}
        </p>
      </div>

      <!-- Interaction Card -->
      <div class="risk-interaction-card">
        <div class="deco-circle"></div>
        <span class="label-caps" style="display:block; margin-bottom:var(--space-4);">${t('conflictAlert')}</span>
        <div class="pills">
          <div class="pill-icon pill-icon--a"><span class="material-symbols-outlined">pill</span></div>
          <div class="pill-icon pill-icon--b"><span class="material-symbols-outlined">pill</span></div>
        </div>
        <div class="interaction-title">${t('conflictTitle')}</div>
        <div class="interaction-desc">
          <p>${t('conflictDesc')}</p>
        </div>
      </div>

      <!-- Cascade Note -->
      <div class="risk-cascade-card">
        <div class="risk-cascade-icon">
          <span class="material-symbols-outlined">medical_information</span>
        </div>
        <div>
          <h4>${t('cascadeNote')}</h4>
          <p>${t('cascadeDesc')}</p>
        </div>
      </div>

      <!-- Action Bar -->
      <div class="risk-action-bar">
        <div style="flex:1;">
          <h4>${t('takeAction')}</h4>
          <p>${t('takeActionDesc')}</p>
        </div>
        <div class="risk-action-buttons">
          <button class="btn-action-primary">
            <span class="material-symbols-outlined">call</span>
            ${t('contactDoctor')}
          </button>
          <button class="btn-action-ghost">
            <span class="material-symbols-outlined">share</span>
            ${t('shareReport')}
          </button>
        </div>
      </div>
    </div>

    <!-- Detailed Guidance -->
    <section class="risk-guidance">
      <h3 class="section-title">${t('guidanceTitle')}</h3>
      <div class="risk-guidance-grid">
        <div class="risk-guidance-card">
          <h5>
            <span class="material-symbols-outlined">eco</span>
            ${t('physioTitle')}
          </h5>
          <p>${t('physioDesc')}</p>
        </div>
        <div class="risk-guidance-card">
          <h5>
            <span class="material-symbols-outlined">schedule</span>
            ${t('timingTitle')}
          </h5>
          <p>${t('timingDesc')}</p>
        </div>
      </div>
    </section>
  </div>
  `;
}
