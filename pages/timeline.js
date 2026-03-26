// Timeline View
export function renderTimeline(navigate) {
  return `
  <div class="page-enter">
    <header style="margin-bottom: var(--space-12);">
      <h2 class="page-title">Your Health Journey</h2>
      <p class="page-subtitle">Mapping your holistic progress and identifying vital correlations for your well-being.</p>
    </header>

    <div class="timeline-layout">
      <!-- Timeline Track -->
      <div class="timeline-track">
        <div class="timeline-line"></div>

        <!-- Item 1 -->
        <div class="timeline-item">
          <div class="timeline-dot timeline-dot--primary"></div>
          <div class="timeline-card">
            <span class="timeline-date">March 12, 2024</span>
            <h3>Started Drug X</h3>
            <p>Initial prescription: 50mg daily. Aimed at managing metabolic energy levels.</p>
          </div>
        </div>

        <!-- Item 2 -->
        <div class="timeline-item">
          <div class="timeline-dot timeline-dot--tertiary"></div>
          <div class="timeline-card">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div>
                <span class="timeline-date">March 30, 2024</span>
                <h3>Mood Check-in: Low</h3>
                <p>Reported persistent lethargy and decreased motivation levels.</p>
              </div>
              <span class="material-symbols-outlined" style="color:var(--tertiary); font-size: 1.5rem; flex-shrink:0;">wb_sunny</span>
            </div>
          </div>
        </div>

        <!-- Item 3 -->
        <div class="timeline-item">
          <div class="timeline-dot timeline-dot--primary"></div>
          <div class="timeline-card">
            <span class="timeline-date">April 05, 2024</span>
            <h3>Started Drug Y</h3>
            <p>Supplementary dosage added to counteract metabolic fluctuations.</p>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <aside>
        <div style="position: sticky; top: 6rem; display: flex; flex-direction: column; gap: var(--space-6);">
          <!-- AI Insight -->
          <div class="ai-insight-card">
            <div class="ai-insight-deco">
              <span class="material-symbols-outlined">psychology</span>
            </div>
            <div class="ai-insight-inner">
              <div class="ai-insight-badge">
                <span class="material-symbols-outlined">auto_awesome</span>
                <span>AI Analysis</span>
              </div>
              <h4>Mood changes correlate with Drug X start date.</h4>
              <div class="ai-insight-observation">
                <p>Observation: <strong>18 days after</strong> starting Drug X, a notable shift in emotional baseline was detected.</p>
              </div>
              <button class="ai-insight-btn">View Full Report</button>
            </div>
          </div>

          <!-- Health Metrics -->
          <div class="dosha-widget">
            <span class="label-caps">Health Metrics</span>
            <div class="dosha-bars">
              <div class="dosha-bar">
                <div class="dosha-bar-fill" style="height:75%; background:var(--primary);"></div>
                <span class="dosha-bar-label">STRESS</span>
              </div>
              <div class="dosha-bar">
                <div class="dosha-bar-fill" style="height:50%; background:var(--tertiary);"></div>
                <span class="dosha-bar-label">ENERGY</span>
              </div>
              <div class="dosha-bar">
                <div class="dosha-bar-fill" style="height:66%; background:var(--primary-container);"></div>
                <span class="dosha-bar-label">RECOVERY</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
  `;
}
