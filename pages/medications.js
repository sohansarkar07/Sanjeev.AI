// Multi-Doctor merge & Brand->Generic
export function renderMedications(navigate) {
  return `
  <div class="page-enter">
    <header style="margin-bottom: var(--space-8);">
      <h2 class="page-title">Unified Medications</h2>
      <p class="page-subtitle">All your prescriptions from different doctors merged into one clear view.</p>
    </header>

    <!-- Brand -> Generic Converter Toggle -->
    <div style="background:var(--surface-container); border-radius:var(--radius-lg); padding:var(--space-4); display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-8);">
      <div style="display:flex; align-items:center; gap:var(--space-3);">
        <span class="material-symbols-outlined" style="color:var(--primary);">swap_horiz</span>
        <span style="font-weight:600; font-size:0.875rem; color:var(--primary);">Show Generic Names</span>
      </div>
      <label style="position:relative; display:inline-block; width:3rem; height:1.5rem; background:var(--primary); border-radius:var(--radius-full); cursor:pointer;">
        <span style="position:absolute; top:2px; left:22px; width:1.25rem; height:1.25rem; background:white; border-radius:50%; box-shadow:0 2px 4px rgba(0,0,0,0.2);"></span>
      </label>
    </div>

    <!-- Doctor 1 (Merged View) -->
    <div class="card" style="margin-bottom:var(--space-4); border-left:4px solid var(--primary-container);">
      <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-4);">
        <h4 style="font-family:var(--font-headline); color:var(--primary); font-size:1.25rem;">Advil <span style="font-family:var(--font-body); font-weight:400; font-size:0.875rem; color:var(--on-surface-variant);">(Ibuprofen)</span></h4>
        <span class="chip" style="background:var(--tertiary-fixed); color:var(--on-tertiary-fixed); font-size:0.75rem;">Dr. Smith (Cardio)</span>
      </div>
      <p style="font-size:0.875rem; color:var(--on-surface-variant);">200mg • Take 1 after dinner</p>
    </div>

    <!-- Doctor 2 (Merged View) -->
    <div class="card" style="margin-bottom:var(--space-4); border-left:4px solid var(--tertiary);">
      <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-4);">
        <h4 style="font-family:var(--font-headline); color:var(--primary); font-size:1.25rem;">Glucophage <span style="font-family:var(--font-body); font-weight:400; font-size:0.875rem; color:var(--on-surface-variant);">(Metformin)</span></h4>
        <span class="chip" style="background:var(--primary-fixed); color:var(--on-primary-fixed); font-size:0.75rem;">Dr. Gupta (Endo)</span>
      </div>
      <p style="font-size:0.875rem; color:var(--on-surface-variant);">500mg • Take 1 in morning</p>
    </div>

    <!-- AI Unified Alert -->
    <div style="background:rgba(27,67,50,0.05); padding:var(--space-4); border-radius:var(--radius-lg); display:flex; gap:var(--space-3); align-items:flex-start; margin-top:var(--space-6);">
      <span class="material-symbols-outlined" style="color:var(--primary);">check_circle</span>
      <p style="font-size:0.875rem; color:var(--on-surface); line-height:1.5;">
        <strong style="color:var(--primary);">AI Check:</strong> No duplicates found across your 2 different prescribers. The brand-to-generic conversion shows all unique active ingredients.
      </p>
    </div>
  </div>
  `;
}
