// Home Dashboard
export function renderHome(navigate) {
  const circumference = 2 * Math.PI * 58; // ~364.4
  const score = 85;
  const offset = circumference * (1 - score / 100);

  return `
  <div class="page-enter">
    <!-- Hero Section -->
    <section class="home-hero">
      <div class="home-hero-text">
        <h2 class="page-title">Namaste, Rahul</h2>
        <p class="page-subtitle">Your path to balance begins with mindful healing today.</p>
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
            <span class="gauge-label">Safety</span>
          </div>
        </div>
        <span class="gauge-title">Medication Safety Score</span>
      </div>
    </section>

    <!-- Quick Actions -->
    <section class="quick-actions">
      <div class="action-card action-card--scan" id="action-scan">
        <span class="material-symbols-outlined">document_scanner</span>
        <div>
          <h4>Scan Prescription</h4>
          <p>AI-powered analysis of all your prescriptions and medicines.</p>
        </div>
      </div>
      <div class="action-card action-card--mood card" id="action-mood">
        <span class="material-symbols-outlined">wb_sunny</span>
        <div>
          <h4>Check Mood</h4>
          <p>Log your daily emotional and physical vitality balance.</p>
        </div>
      </div>
      <div class="action-card action-card--alerts card" id="action-alerts">
        <span class="alert-dot"></span>
        <span class="material-symbols-outlined">notifications_active</span>
        <div>
          <h4>View Alerts</h4>
          <p>2 active interactions detected in your current protocol.</p>
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
          <span class="label-caps">Your Next Dose</span>
          <h3 class="next-dose-name">Metformin (500mg)</h3>
          <div class="next-dose-meta">
            <span class="chip">
              <span class="material-symbols-outlined" style="font-size:1.125rem">schedule</span> 08:30 AM
            </span>
            <span class="chip" style="background:var(--secondary-container)">
              <span class="material-symbols-outlined" style="font-size:1.125rem">water_drop</span> with warm water
            </span>
          </div>
        </div>
      </div>
      <button class="btn-primary" style="box-shadow: 0 8px 24px rgba(1,45,29,0.1);">MARK AS TAKEN</button>
    </section>

    <!-- Essential Tools Grid -->
    <section style="margin-bottom:var(--space-10);">
      <h3 class="section-title" style="margin-bottom:var(--space-4);">Holistic Health Tools</h3>
      <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:var(--space-4);">
        <div class="card" id="tool-symptoms" style="cursor:pointer; padding:var(--space-4); text-align:center;">
          <span class="material-symbols-outlined" style="color:var(--primary); font-size:2rem; margin-bottom:var(--space-2);">record_voice_over</span>
          <h5 style="font-weight:700; color:var(--primary); font-size:0.875rem;">Symptom Check</h5>
        </div>
        <div class="card" id="tool-meds" style="cursor:pointer; padding:var(--space-4); text-align:center;">
          <span class="material-symbols-outlined" style="color:var(--primary); font-size:2rem; margin-bottom:var(--space-2);">join</span>
          <h5 style="font-weight:700; color:var(--primary); font-size:0.875rem;">Merged Meds</h5>
        </div>
        <div class="card" id="tool-caregiver" style="cursor:pointer; padding:var(--space-4); text-align:center;">
          <span class="material-symbols-outlined" style="color:var(--primary); font-size:2rem; margin-bottom:var(--space-2);">family_home</span>
          <h5 style="font-weight:700; color:var(--primary); font-size:0.875rem;">Caregiver Hub</h5>
        </div>
        <div class="card" id="tool-report" style="cursor:pointer; padding:var(--space-4); text-align:center;">
          <span class="material-symbols-outlined" style="color:var(--primary); font-size:2rem; margin-bottom:var(--space-2);">insert_chart</span>
          <h5 style="font-weight:700; color:var(--primary); font-size:0.875rem;">Weekly Report</h5>
        </div>
      </div>
    </section>

    <!-- Insights Banner -->
    <section class="insights-banner">
      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG5AMcOSnCys69_lYg7aO1ZjK8H1KQJaSFz9L2wwjsR3wj_E8K2NmRUhLHXkZf-zG9K58hD0kI6RMXOqcXAUrCusYPB4hbZnHuWiq5ncEmsF_kXkBOq3W9Rvz30_6T2RdVGEuS27T8-B4VsDwrPlDA9u1mk6295cId4NsM0CszOQtImq_ptOtznJT6AcskPr7vLvCSTT3o52X7ivQyOVuZ7wivAOBXoIAZKvzG-hmKoTyyumwdXO5VKglYHrlDqLRiUBcrGt9THg" alt="Herbs and medicine flat lay" />
      <div class="insights-banner-overlay">
        <span class="tag">Weekly Wisdom</span>
        <h3>The Alchemy of Brahmi for Mental Clarity</h3>
        <p>Learn how to pair herbal boosters with your morning meditation.</p>
      </div>
    </section>
  </div>
  `;
}
