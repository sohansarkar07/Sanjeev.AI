export function renderProfile(navigate) {
  const t = window.__t || ((key) => key);
  const isLoggedIn = window.__isLoggedIn || false;

  // 1. Logged Out State (Auth Screen)
  if (!isLoggedIn) {
    return `
    <div class="login-page">
      <div class="login-glass-card">
        <button class="icon-btn" style="position:absolute; top:var(--space-4); right:var(--space-4); color:white;" onclick="window.history.back()">
          <span class="material-symbols-outlined">close</span>
        </button>
        <div style="text-align:center; margin-bottom:var(--space-8);">
          <div class="brand-avatar" style="margin:0 auto var(--space-4); width:4rem; height:4rem;">
            <span class="material-symbols-outlined brand-icon" style="font-size:2rem; font-variation-settings: 'FILL' 1; color: var(--primary-fixed);">spa</span>
          </div>
          <h1 id="auth-title" style="font-family:var(--font-headline); font-size:2rem; color:white; margin-bottom:var(--space-2);">Sanjeev AI</h1>
          <p style="color:var(--surface-container-high); font-size:1rem;">Welcome to the future of mindful healing.</p>
        </div>

        <form id="profile-auth-form">
          <div style="margin-bottom:var(--space-6);">
            <label style="display:block; color:white; font-size:0.875rem; font-weight:600; margin-bottom:var(--space-2);">Select Your Role</label>
            <div class="login-select-wrapper">
              <span class="material-symbols-outlined login-select-icon">person</span>
              <select id="role-select" class="login-input">
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="caregiver">Caregiver</option>
                <option value="pharmacist">Pharmacist</option>
                <option value="hospital">Hospital / Clinic</option>
              </select>
            </div>
          </div>

          <div style="margin-bottom:var(--space-8);">
            <label style="display:block; color:white; font-size:0.875rem; font-weight:600; margin-bottom:var(--space-2);">Access Passkey</label>
            <div class="login-select-wrapper">
              <span class="material-symbols-outlined login-select-icon">lock</span>
              <input type="password" id="passkey-input" class="login-input" placeholder="Enter passkey" value="demo123" />
            </div>
          </div>

          <button id="auth-submit" type="submit" class="btn-primary" style="width:100%; justify-content:center; padding:18px; font-size:1.125rem; background:white; color:var(--primary); font-weight:700; border-radius:var(--radius-xl);">
            <span class="btn-text">Enter Hub</span>
            <span class="material-symbols-outlined">arrow_forward</span>
          </button>
        </form>
        
        <div style="text-align:center; margin-top:var(--space-6);">
          <a href="#" id="auth-mode-btn" data-mode="login" style="color:white; font-size:0.875rem; text-decoration:none;">
            New here? <b style="color:var(--primary-fixed)">Sign up for free</b>
          </a>
        </div>
      </div>
    </div>

    <style>
      .login-page {
        min-height: 100vh;
        background: linear-gradient(135deg, var(--primary) 0%, #011E13 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--space-4);
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        z-index: 1000;
        overflow-y: auto;
      }
      .login-glass-card {
        position: relative;
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: var(--radius-2xl);
        padding: var(--space-8);
        width: 100%;
        max-width: 400px;
        box-shadow: 0 24px 48px rgba(0,0,0,0.4);
      }
      .login-input {
        width: 100%;
        background: rgba(0,0,0,0.2);
        border: 1px solid rgba(255,255,255,0.1);
        color: white;
        padding: 14px 14px 14px 44px;
        border-radius: var(--radius-lg);
        font-family: var(--font-body);
        font-size: 1rem;
        outline: none;
        transition: all 0.2s ease;
        appearance: none;
      }
      .login-input:focus {
        border-color: var(--primary-fixed);
        background: rgba(0,0,0,0.4);
      }
      .login-input::placeholder {
        color: rgba(255,255,255,0.5);
      }
      .login-select-wrapper {
        position: relative;
      }
      .login-select-icon {
        position: absolute;
        left: 14px;
        top: 50%;
        transform: translateY(-50%);
        color: rgba(255,255,255,0.6);
        pointer-events: none;
      }
      .login-input option {
        background: var(--surface);
        color: var(--on-surface);
      }
    </style>
    `;
  }

  // 2. Logged In State (Profile Hub)
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
