// ClearScript Validation
export function renderClearScript(navigate) {
  const t = window.__t;

  return `
  <div class="page-enter">
    <header style="margin-bottom:var(--space-6);">
      <h2 class="page-title">${t('clearscriptTitle')}</h2>
      <p class="page-subtitle">${t('clearscriptSub')}</p>
    </header>

    <div class="clearscript-container">
      <div class="ocr-layers card-white" style="margin-bottom:var(--space-6);">
        <div class="ocr-layer">
          <div class="ocr-layer-header" style="display:flex; justify-content:space-between; align-items:center;">
            <span class="chip" style="background:#E8F5E9; color:#2E7D32;">&gt;90% Match</span>
            <span class="material-symbols-outlined" style="color:#2E7D32;">check_circle</span>
          </div>
          <p class="ocr-layer-desc">${t('autoAccepted')}</p>
          <div class="ocr-extracted-text">
            <h4>Metformin</h4>
            <span class="label-caps">500mg • Twice Daily</span>
          </div>
        </div>

        <div class="ocr-layer" style="margin-top:var(--space-4); border-top:1px dashed var(--outline-variant); padding-top:var(--space-4);">
          <div class="ocr-layer-header" style="display:flex; justify-content:space-between; align-items:center;">
            <span class="chip" style="background:#FFF3E0; color:#E65100;">60-90% Match</span>
            <span class="material-symbols-outlined" style="color:#E65100;">warning</span>
          </div>
          <p class="ocr-layer-desc" style="color:var(--on-surface-variant); font-size:0.875rem;">${t('aiSuggestion')} <strong>Sertraline</strong> (instead of 'Sertra')</p>
          <div style="display:flex; gap:var(--space-2); margin-top:var(--space-2);">
            <button class="btn-primary" style="padding:6px 12px; font-size:0.75rem;">${t('confirm')}</button>
            <button class="btn-secondary" style="padding:6px 12px; font-size:0.75rem;">${t('edit')}</button>
          </div>
        </div>

        <div class="ocr-layer" style="margin-top:var(--space-4); border-top:1px dashed var(--outline-variant); padding-top:var(--space-4);">
          <div class="ocr-layer-header" style="display:flex; justify-content:space-between; align-items:center;">
            <span class="chip" style="background:#FFEBEE; color:#C62828;">&lt;60% Match</span>
            <span class="material-symbols-outlined" style="color:#C62828;">error</span>
          </div>
          <p class="ocr-layer-desc" style="color:#C62828; font-size:0.875rem;">${t('manualFallback')}</p>
          <input type="text" placeholder="Type medicine name clearly" class="manual-input" style="width:100%; padding:10px; margin-top:8px; border:1px solid #FFCDD2; border-radius:4px;" />
        </div>
      </div>

      <button id="clearscript-confirm" class="btn-primary" style="width:100%; justify-content:center; padding:16px;">
        <span class="material-symbols-outlined">analytics</span> ${t('runRiskAnalysis')}
      </button>
    </div>
  </div>
  `;
}
