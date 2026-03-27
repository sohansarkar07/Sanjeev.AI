// Profile Page
export function renderProfile(navigate) {
  const t = window.__t;

  return `
  <div class="page-enter">
    <header style="margin-bottom: var(--space-8); display:flex; align-items:center; gap:var(--space-4);">
      <div class="brand-avatar" style="width:4rem; height:4rem; box-shadow:var(--shadow-elevated);">
        <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Rahul&backgroundColor=e6f0eb" alt="Avatar" style="width:100%; height:100%; object-fit:cover; border-radius:50%;" />
      </div>
      <div>
        <h2 class="page-title" style="margin-bottom:var(--space-1); font-size:1.75rem;">Rahul S.</h2>
        <div style="display:flex; align-items:center; gap:var(--space-2); color:var(--primary); font-size:0.875rem; font-weight:600;">
          <span class="material-symbols-outlined" style="font-size:1.25rem;">verified_user</span>
          ${t('healthId')}: SANJ-8X9P
        </div>
      </div>
    </header>

    <!-- Personal Info -->
    <section style="margin-bottom:var(--space-8);">
      <h3 class="section-title" style="margin-bottom:var(--space-4);">${t('personalInfo')}</h3>
      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:var(--space-3);">
        <div class="card" style="text-align:center; padding:var(--space-4);">
          <span class="material-symbols-outlined" style="color:var(--tertiary); margin-bottom:var(--space-2);">cake</span>
          <p style="font-size:0.75rem; color:var(--on-surface-variant); text-transform:uppercase;">${t('age')}</p>
          <p style="font-weight:700;">${t('age32')}</p>
        </div>
        <div class="card" style="text-align:center; padding:var(--space-4);">
          <span class="material-symbols-outlined" style="color:var(--error); margin-bottom:var(--space-2);">bloodtype</span>
          <p style="font-size:0.75rem; color:var(--on-surface-variant); text-transform:uppercase;">${t('bloodType')}</p>
          <p style="font-weight:700;">O+</p>
        </div>
        <div class="card" style="text-align:center; padding:var(--space-4);">
          <span class="material-symbols-outlined" style="color:var(--primary); margin-bottom:var(--space-2);">scale</span>
          <p style="font-size:0.75rem; color:var(--on-surface-variant); text-transform:uppercase;">${t('weightTitle')}</p>
          <p style="font-weight:700;">${t('weightLabel')}</p>
        </div>
      </div>
    </section>

    <!-- Medical History -->
    <section style="margin-bottom:var(--space-8);">
      <h3 class="section-title" style="margin-bottom:var(--space-4);">${t('medicalHistory')}</h3>
      <div class="alert-doc-card" style="background:var(--surface-container-high); border:none; box-shadow:none;">
        <div class="alert-doc-icon" style="background:white; color:var(--primary);">
          <span class="material-symbols-outlined">description</span>
        </div>
        <h4>${t('medicalHistory')}</h4>
        <p>${t('historyDesc')}</p>
        <button class="btn-secondary" style="margin-top:var(--space-2);">${t('manageButton')}</button>
      </div>
    </section>

    <!-- Settings -->
    <section style="margin-bottom:var(--space-10);">
      <h3 class="section-title" style="margin-bottom:var(--space-4);">${t('settingsPrefs')}</h3>
      <div class="card" style="padding:0; overflow:hidden;">
        
        <div style="display:flex; justify-content:space-between; align-items:center; padding:var(--space-4); border-bottom:1px solid var(--surface-container-high);">
          <div style="display:flex; align-items:center; gap:var(--space-3);">
            <span class="material-symbols-outlined" style="color:var(--on-surface-variant);">dark_mode</span>
            <span style="font-weight:600; font-size:0.875rem;">${t('darkMode')}</span>
          </div>
          <label style="position:relative; display:inline-block; width:3rem; height:1.5rem; background:var(--surface-container-high); border-radius:var(--radius-full); cursor:pointer;">
            <input type="checkbox" style="opacity:0; width:0; height:0;" />
            <span style="position:absolute; top:2px; left:2px; width:1.25rem; height:1.25rem; background:var(--outline); border-radius:50%; box-shadow:0 2px 4px rgba(0,0,0,0.2);"></span>
          </label>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; padding:var(--space-4); border-bottom:1px solid var(--surface-container-high);">
          <div style="display:flex; align-items:center; gap:var(--space-3);">
            <span class="material-symbols-outlined" style="color:var(--primary);">notifications_active</span>
            <span style="font-weight:600; font-size:0.875rem;">${t('notifications')}</span>
          </div>
          <label style="position:relative; display:inline-block; width:3rem; height:1.5rem; background:var(--primary); border-radius:var(--radius-full); cursor:pointer;">
            <span style="position:absolute; top:2px; left:22px; width:1.25rem; height:1.25rem; background:white; border-radius:50%; box-shadow:0 2px 4px rgba(0,0,0,0.2);"></span>
          </label>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; padding:var(--space-4);">
          <div style="display:flex; align-items:center; gap:var(--space-3);">
            <span class="material-symbols-outlined" style="color:var(--on-surface-variant);">shield_lock</span>
            <span style="font-weight:600; font-size:0.875rem;">${t('dataPrivacy')}</span>
          </div>
          <span class="material-symbols-outlined" style="color:var(--outline);">chevron_right</span>
        </div>

      </div>
    </section>

    <!-- Logout -->
    <button id="profile-logout-btn" class="btn-error" style="width:100%; justify-content:center; padding:var(--space-4); border-radius:var(--radius-xl); font-size:1rem;">
      <span class="material-symbols-outlined">logout</span>
      ${t('logout')}
    </button>
  </div>
  `;
}
