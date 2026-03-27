// Timeline View
export function renderTimeline(navigate) {
  const t = window.__t;

  return `
  <div class="page-enter">
    <header style="margin-bottom: var(--space-12);">
      <h2 class="page-title">${t('tlTitle')}</h2>
      <p class="page-subtitle">${t('tlSub')}</p>
    </header>

    <div class="timeline-layout">
      <!-- Timeline Track -->
      <div class="timeline-track">
        <div class="timeline-line"></div>

        <!-- Item 1 -->
        <div class="timeline-item">
          <div class="timeline-dot timeline-dot--primary"></div>
          <div class="timeline-card">
            <span class="timeline-date">${t('tlItem1Date')}</span>
            <h3>${t('tlItem1Title')}</h3>
            <p>${t('tlItem1Desc')}</p>
          </div>
        </div>

        <!-- Item 2 -->
        <div class="timeline-item">
          <div class="timeline-dot timeline-dot--tertiary"></div>
          <div class="timeline-card">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div>
                <span class="timeline-date">${t('tlItem2Date')}</span>
                <h3>${t('tlItem2Title')}</h3>
                <p>${t('tlItem2Desc')}</p>
              </div>
              <span class="material-symbols-outlined" style="color:var(--tertiary); font-size: 1.5rem; flex-shrink:0;">wb_sunny</span>
            </div>
          </div>
        </div>

        <!-- Item 3 -->
        <div class="timeline-item">
          <div class="timeline-dot timeline-dot--primary"></div>
          <div class="timeline-card">
            <span class="timeline-date">${t('tlItem3Date')}</span>
            <h3>${t('tlItem3Title')}</h3>
            <p>${t('tlItem3Desc')}</p>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <aside>
        <div style="position: sticky; top: 6rem; display: flex; flex-direction: column; gap: var(--space-6);">
          <!-- AI Insight -->
          <div class="ai-insight-card">
            <div class="ai-insight-deco">
              <span class="material-symbols-outlined">psychology</span>
            </div>
            <div class="ai-insight-inner">
              <div class="ai-insight-badge">
                <span class="material-symbols-outlined">auto_awesome</span>
                <span>${t('tlAiAnalysis')}</span>
              </div>
              <h4>${t('tlAiTitle')}</h4>
              <div class="ai-insight-observation">
                <p>${t('tlAiDesc')}</p>
              </div>
              <button class="ai-insight-btn">${t('tlViewReport')}</button>
            </div>
          </div>

          <!-- Health Metrics -->
          <div class="dosha-widget">
            <span class="label-caps">${t('tlMetricsTitle')}</span>
            <div class="dosha-bars">
              <div class="dosha-bar">
                <div class="dosha-bar-fill" style="height:75%; background:var(--primary);"></div>
                <span class="dosha-bar-label">${t('tlStress')}</span>
              </div>
              <div class="dosha-bar">
                <div class="dosha-bar-fill" style="height:50%; background:var(--tertiary);"></div>
                <span class="dosha-bar-label">${t('tlEnergy')}</span>
              </div>
              <div class="dosha-bar">
                <div class="dosha-bar-fill" style="height:66%; background:var(--primary-container);"></div>
                <span class="dosha-bar-label">${t('tlRecovery')}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
  `;
}
