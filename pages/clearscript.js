// ClearScript - AI Prescription Clarity Engine
export function renderClearScript(navigate) {
  return `
  <div class="page-enter">
    <header style="margin-bottom: var(--space-8);">
      <h2 class="page-title">ClearScript AI Extract</h2>
      <p class="page-subtitle">Our Three-Layer OCR Engine has digitized your messy prescription.</p>
    </header>

    <!-- Layer 1: High Confidence (>90%) -->
    <div class="card" style="margin-bottom: var(--space-6); border-left: 4px solid var(--primary);">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h4 style="color:var(--primary); font-family:var(--font-headline); font-size:1.125rem;">Lisinopril 10mg</h4>
        <span class="chip" style="background:var(--primary-fixed); color:var(--on-primary-fixed); font-weight:700;">98% Match</span>
      </div>
      <p style="font-size:0.875rem; color:var(--on-surface-variant); margin-top:var(--space-2); display:flex; align-items:center; gap:var(--space-1);">
        <span class="material-symbols-outlined" style="font-size:1.25rem; color:var(--primary);">check_circle</span> 
        Auto-Accepted (Clean read)
      </p>
    </div>

    <!-- Layer 2: Medium Confidence (60-90%) -->
    <div class="card" style="margin-bottom: var(--space-6); border-left: 4px solid var(--tertiary);">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h4 style="color:var(--on-surface); font-family:var(--font-headline); font-size:1.125rem;">Omepr...ole 20mg</h4>
        <span class="chip" style="background:var(--tertiary-fixed); color:var(--on-tertiary-fixed); font-weight:700;">72% Match</span>
      </div>
      <div style="margin-top:var(--space-3); background:var(--surface-container-low); padding:var(--space-4); border-radius:var(--radius-lg);">
        <p style="font-size:0.875rem; color:var(--on-surface-variant); margin-bottom:var(--space-3);">
          AI Suggestion: <strong style="color:var(--primary); font-size:1rem;">Omeprazole 20mg</strong>
        </p>
        <div style="display:flex; gap:var(--space-2);">
          <button class="btn-primary" style="flex:1; padding:var(--space-2) var(--space-3); font-size:0.875rem; justify-content:center;">
            <span class="material-symbols-outlined" style="font-size:1.125rem;">thumb_up</span> Confirm
          </button>
          <button class="btn-secondary" style="flex:1; padding:var(--space-2) var(--space-3); font-size:0.875rem; justify-content:center;">
            <span class="material-symbols-outlined" style="font-size:1.125rem;">edit</span> Edit
          </button>
        </div>
      </div>
    </div>

    <!-- Layer 3: Low Confidence (<60%) -->
    <div class="card" style="margin-bottom: var(--space-8); border-left: 4px solid var(--error);">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h4 style="color:var(--error); font-family:var(--font-headline); font-size:1.125rem; font-style:italic;">[Illegible text] 5mg</h4>
        <span class="chip" style="background:var(--error-container); color:var(--error); font-weight:700;">45% Match</span>
      </div>
      <div style="margin-top:var(--space-3);">
        <p style="font-size:0.875rem; color:var(--on-surface-variant); margin-bottom:var(--space-2); display:flex; align-items:center; gap:var(--space-1);">
          <span class="material-symbols-outlined" style="font-size:1.125rem; color:var(--error);">warning</span>
          Handwriting too messy. Manual fallback required.
        </p>
        <input type="text" placeholder="Type medicine name here..." style="width:100%; padding:var(--space-3); border:2px solid var(--outline-variant); border-radius:var(--radius-lg); font-family:var(--font-body); font-size:1rem; outline:none; transition: border-color 0.2s;" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--outline-variant)'" />
      </div>
    </div>

    <!-- Final Action -->
    <button id="clearscript-confirm" class="btn-primary" style="width:100%; justify-content:center; padding:var(--space-4); font-size:1rem; border-radius:var(--radius-xl); box-shadow:0 8px 24px rgba(1,45,29,0.15);">
      <span class="material-symbols-outlined">analytics</span>
      Run Risk Analysis
    </button>
  </div>
  `;
}
