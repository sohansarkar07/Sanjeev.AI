// Risk Analysis
export function renderRiskAnalysis(navigate) {
  return `
  <div class="page-enter">
    <header style="margin-bottom: var(--space-10);">
      <h2 class="page-title">Analysis Results</h2>
      <p class="page-subtitle">We have analyzed your scanned medications against your health profile and existing regimen.</p>
    </header>

    <div class="risk-bento">
      <!-- Status Card -->
      <div class="risk-status-card">
        <div class="status-header">
          <span class="material-symbols-outlined">warning</span>
          <span class="status-title">Caution</span>
        </div>
        <p style="color:var(--on-surface-variant); line-height:1.6;">
          Potential risks detected in your current combination. Professional medical review is recommended before continuing dosage.
        </p>
      </div>

      <!-- Interaction Card -->
      <div class="risk-interaction-card">
        <div class="deco-circle"></div>
        <span class="label-caps" style="display:block; margin-bottom:var(--space-4);">Conflict Alert</span>
        <div class="pills">
          <div class="pill-icon pill-icon--a"><span class="material-symbols-outlined">pill</span></div>
          <div class="pill-icon pill-icon--b"><span class="material-symbols-outlined">pill</span></div>
        </div>
        <div class="interaction-title">Interaction Detected: Drug A + Drug B</div>
        <div class="interaction-desc">
          <p>These two medications together may cause drowsiness. Avoid driving while on both.</p>
        </div>
      </div>

      <!-- Cascade Note -->
      <div class="risk-cascade-card">
        <div class="risk-cascade-icon">
          <span class="material-symbols-outlined">medical_information</span>
        </div>
        <div>
          <h4>Prescription Cascade Note</h4>
          <p>"Drug B appears to be treating a side effect of Drug A. This pattern often suggests a 'cascade' where new drugs are added to manage effects of the first, rather than addressing the root cause. Please consult your doctor."</p>
        </div>
      </div>

      <!-- Action Bar -->
      <div class="risk-action-bar">
        <div style="flex:1;">
          <h4>Take Action</h4>
          <p>Schedule a consultation with your primary physician to discuss these findings or find a holistic or safer alternative for better balance.</p>
        </div>
        <div class="risk-action-buttons">
          <button class="btn-action-primary">
            <span class="material-symbols-outlined">call</span>
            Contact Doctor
          </button>
          <button class="btn-action-ghost">
            <span class="material-symbols-outlined">share</span>
            Share Report
          </button>
        </div>
      </div>
    </div>

    <!-- Detailed Guidance -->
    <section class="risk-guidance">
      <h3 class="section-title">Detailed Guidance</h3>
      <div class="risk-guidance-grid">
        <div class="risk-guidance-card">
          <h5>
            <span class="material-symbols-outlined">eco</span>
            Physiological Alignment
          </h5>
          <p>The stimulating nature of Drug A may be causing the restlessness that Drug B is attempting to calm. Discussing a dosage adjustment with an expert could help.</p>
        </div>
        <div class="risk-guidance-card">
          <h5>
            <span class="material-symbols-outlined">schedule</span>
            Timing Optimization
          </h5>
          <p>To minimize interaction risks, take Drug A with your heaviest meal at noon, and consult if Drug B can be taken at night to align with your natural resting period.</p>
        </div>
      </div>
    </section>
  </div>
  `;
}
