// Prescription Scanner
export function renderScanner(navigate) {
  const t = window.__t;
  
  return `
  <div class="page-enter">
    <header style="margin-bottom:var(--space-6);">
      <h2 class="page-title">${t('scannerTitle')}</h2>
      <p class="page-subtitle">${t('scannerSub')}</p>
    </header>

    <div class="scanner-container">
      <div class="scanner-frame">
        <span class="scanner-corner" style="top:10%; left:10%;"></span>
        <span class="scanner-corner" style="top:10%; right:10%; transform:rotate(90deg);"></span>
        <span class="scanner-corner" style="bottom:10%; left:10%; transform:rotate(-90deg);"></span>
        <span class="scanner-corner" style="bottom:10%; right:10%; transform:rotate(180deg);"></span>
      </div>
      <div class="scanner-overlay">
        <p style="background:rgba(0,0,0,0.6); padding:4px 12px; border-radius:20px; font-size:0.875rem;">${t('alignPrescription')}</p>
      </div>
    </div>

    <div style="margin-top:var(--space-8); display:flex; flex-direction:column; gap:var(--space-4);">
      <button class="btn-primary" id="scanner-capture" style="justify-content:center; padding:16px;">
        <span class="material-symbols-outlined">camera</span> ${t('captureBtn')}
      </button>
      <button class="btn-secondary" style="justify-content:center; padding:16px;">
        <span class="material-symbols-outlined">photo_library</span> ${t('uploadBtn')}
      </button>
    </div>

    <div style="margin-top:var(--space-6); text-align:center;">
      <span class="chip" style="background:var(--surface-container); color:var(--on-surface-variant);">
        <span class="material-symbols-outlined">lock</span> ${t('privacyNote')}
      </span>
    </div>
  </div>
  `;
}
