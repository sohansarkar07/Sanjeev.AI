// Symptom Checker & Voice Input
export function renderSymptoms(navigate) {
  return `
  <div class="page-enter">
    <header style="margin-bottom: var(--space-8);">
      <h2 class="page-title">Symptom Checker</h2>
      <p class="page-subtitle">Describe how you feel, and our AI will check if it's related to your current medications.</p>
    </header>

    <!-- Voice Input Highlight -->
    <div style="background:var(--surface-container-low); border-radius:var(--radius-2xl); padding:var(--space-8); text-align:center; margin-bottom:var(--space-8);">
      <button class="scanner-btn-circle--capture" style="width:5rem; height:5rem; border-radius:var(--radius-full); background:var(--primary); color:white; border:none; box-shadow:0 8px 32px rgba(1,45,29,0.2); margin:0 auto var(--space-4); display:flex; align-items:center; justify-content:center; cursor:pointer;">
        <span class="material-symbols-outlined" style="font-size:2.5rem; font-variation-settings: 'FILL' 1;">mic</span>
      </button>
      <h3 style="font-size:1.25rem; font-family:var(--font-headline); color:var(--primary); margin-bottom:var(--space-2);">Tap to Speak</h3>
      <p style="color:var(--on-surface-variant); font-size:0.875rem;">Hands-free voice input available in English, Hindi, and Bengali.</p>
    </div>

    <!-- AI Chat Simulation -->
    <div class="card" style="margin-bottom:var(--space-8);">
      <div style="background:var(--surface-container-highest); padding:var(--space-4); border-radius:var(--radius-xl) var(--radius-xl) var(--radius-xl) 0; max-width:80%; margin-bottom:var(--space-4);">
        <p style="font-size:0.875rem;">I've been feeling a bit dizzy and my mouth is very dry since morning.</p>
      </div>
      <div style="display:flex; justify-content:flex-end;">
        <div style="background:var(--primary-fixed); padding:var(--space-4); border-radius:var(--radius-xl) var(--radius-xl) 0 var(--radius-xl); max-width:90%; border-left:4px solid var(--primary);">
          <div style="display:flex; align-items:center; gap:var(--space-2); margin-bottom:var(--space-2);">
            <span class="material-symbols-outlined" style="color:var(--primary); font-size:1.25rem;">psychology</span>
            <span style="font-weight:700; color:var(--primary); font-size:0.875rem;">AI Drug Correlation Found</span>
          </div>
          <p style="font-size:0.875rem; color:var(--on-primary-fixed); line-height:1.6;">
            Dizziness and dry mouth are common known side effects of the <strong style="color:var(--primary);">Lisinopril</strong> you started recently. 
          </p>
        </div>
      </div>
    </div>

    <!-- Alert Doctor Action -->
    <button class="btn-primary" style="width:100%; justify-content:center; padding:var(--space-4); font-size:1rem; border-radius:var(--radius-xl);">
      <span class="material-symbols-outlined">send_to_mobile</span>
      Flag Symptom to Doctor
    </button>
  </div>
  `;
}
