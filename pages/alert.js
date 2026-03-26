// Alert Screen
export function renderAlert(navigate) {
  return `
  <div class="page-enter" style="max-width: 36rem; margin: 0 auto;">
    <!-- Header -->
    <header style="margin-bottom: var(--space-8);">
      <h2 class="page-title" style="font-size:1.875rem;">Safety Alert</h2>
      <p style="color:var(--on-surface-variant); font-weight:500;">Critical Medication Analysis</p>
    </header>

    <!-- Primary Warning Card -->
    <div class="alert-warning-card">
      <div class="glow"></div>
      <div class="alert-header">
        <div class="alert-icon-wrap">
          <span class="material-symbols-outlined">warning</span>
        </div>
        <div>
          <h3>Dangerous Interaction Detected</h3>
          <p class="severity">Severity: Critical</p>
        </div>
      </div>
      <div class="alert-body">
        <p>Drug C and Drug D together pose a severe cardiac risk. Do not take them together.</p>
      </div>
    </div>

    <!-- Details Grid -->
    <div class="alert-details-grid">
      <div class="alert-detail-card">
        <span class="material-symbols-outlined">cardiology</span>
        <h4>Cardiac Impact</h4>
        <p>Potential for QT interval prolongation and severe arrhythmia.</p>
      </div>
      <div class="alert-detail-card">
        <span class="material-symbols-outlined">history</span>
        <h4>Detection Time</h4>
        <p>Interaction identified via scan 2 minutes ago.</p>
      </div>
    </div>

    <!-- Immediate Actions -->
    <div class="alert-actions">
      <button class="btn-primary" style="width:100%; padding: var(--space-5); font-size:1.125rem; font-weight:700; border-radius: var(--radius-xl); justify-content:center;">
        <span class="material-symbols-outlined">call</span>
        Notify Doctor Now
      </button>
      <button class="btn-error">
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">emergency_home</span>
        Emergency SOS
      </button>
    </div>

    <!-- Documentation -->
    <div class="alert-doc-card">
      <div class="alert-doc-icon">
        <span class="material-symbols-outlined">picture_as_pdf</span>
      </div>
      <h4>Clinical Documentation</h4>
      <p>Download a formal pharmacological report to share with your healthcare provider immediately.</p>
      <button class="btn-tertiary-warm" style="background: var(--tertiary); color: var(--on-tertiary);">
        Generate Safety Report for Doctor
      </button>
    </div>
  </div>
  `;
}
