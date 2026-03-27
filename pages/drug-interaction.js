// Drug Interaction Checker — Pure Vanilla JS
export function renderDrugInteraction(navigate) {

  // ---- Data ----
  const drugs = [
    { id: 'Fluoxetine', dose: '20mg', doctor: 'Psychiatrist', risk: 'danger' },
    { id: 'Metoprolol', dose: '50mg', doctor: 'Cardiologist', risk: 'danger' },
    { id: 'Celecoxib', dose: '200mg', doctor: 'Rheumatologist', risk: 'caution' },
    { id: 'Metformin', dose: '500mg', doctor: 'Endocrinologist', risk: 'safe' },
  ];

  const interactions = [
    { source: 'Fluoxetine', target: 'Metoprolol', type: 'cascade', explanation: 'Fluoxetine inhibits CYP2D6 enzyme blocking clearance of Metoprolol. Plasma levels rise — accumulation risk.' },
    { source: 'Celecoxib', target: 'Metoprolol', type: 'caution', explanation: 'Celecoxib may reduce antihypertensive effect of Metoprolol and also inhibits CYP2D6.' },
  ];

  const technicalText = 'Fluoxetine inhibits CYP2D6 enzyme blocking clearance of Metoprolol. Plasma levels rise — accumulation risk.';
  const simpleText = 'Fluoxetine stops your body from removing Metoprolol properly. Too much Metoprolol builds up in your blood. This can affect your heart. Tell your doctor immediately.';

  // ---- Risk Badge Helper ----
  function riskBadge(risk) {
    const colors = { danger: '#FF3D5A', caution: '#FFD600', safe: '#00C853' };
    const bg = { danger: '#FFF0F1', caution: '#FFFDE7', safe: '#E8F5E9' };
    return `<span style="display:inline-block;padding:2px 10px;border-radius:20px;font-size:0.65rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:${colors[risk]};background:${bg[risk]};border:1px solid ${colors[risk]}20;">${risk}</span>`;
  }

  // ---- Doctor Options ----
  function doctorDropdown(selected) {
    const docs = ['Psychiatrist','Cardiologist','Rheumatologist','Endocrinologist','General Physician','Neurologist'];
    return `<select style="font-size:0.75rem;color:var(--primary-container);font-weight:600;background:transparent;border:none;outline:none;cursor:pointer;font-family:var(--font-body);">
      ${docs.map(d => `<option ${d===selected?'selected':''}>${d}</option>`).join('')}
    </select>`;
  }

  // ---- Medication List HTML ----
  function medListHTML() {
    return drugs.map((m, i) => `
      <div class="drug-item" style="display:flex;align-items:center;justify-content:space-between;padding:16px 20px;background:var(--surface-container-lowest);border-radius:var(--radius-xl);border:1px solid var(--outline-variant);transition:all 0.2s;">
        <div style="flex:1;">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-weight:700;color:var(--on-surface);">${m.id}</span>
            <span style="font-size:0.8rem;color:var(--on-surface-variant);">${m.dose}</span>
          </div>
          ${doctorDropdown(m.doctor)}
        </div>
        <div style="display:flex;align-items:center;gap:12px;">
          ${riskBadge(m.risk)}
          <button class="drug-remove-btn" data-idx="${i}" style="padding:6px;color:var(--outline);cursor:pointer;border:none;background:none;opacity:0.4;transition:opacity 0.2s;" title="Remove">
            <span class="material-symbols-outlined" style="font-size:1.1rem;">delete</span>
          </button>
        </div>
      </div>
    `).join('');
  }

  // ---- Build Page ----
  return `
  <div class="page-enter" id="drug-interaction-page">
    <header style="margin-bottom:var(--space-8);">
      <h2 class="page-title">Drug Interaction Checker</h2>
      <p class="page-subtitle">Comprehensive safety analysis for patient medication regimens.</p>
    </header>

    <div style="display:grid;grid-template-columns:1fr;gap:var(--space-8);">

      <!-- SECTION 1: Patient Context -->
      <section class="card-white" style="border:1px solid var(--outline-variant);">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:var(--space-4);">
          <span class="material-symbols-outlined" style="color:var(--primary-container);font-size:1.25rem;">person</span>
          <h3 style="font-weight:700;font-size:1.1rem;color:var(--primary);">Patient Context</h3>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);">
          <div>
            <label class="label-caps" style="display:block;margin-bottom:4px;">Age</label>
            <input id="patient-age" type="number" placeholder="e.g. 68" style="width:100%;padding:10px 14px;border-radius:var(--radius-lg);border:1px solid var(--outline-variant);font-family:var(--font-body);font-size:0.95rem;outline:none;transition:border-color 0.2s;" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--outline-variant)'" />
          </div>
          <div style="grid-column:span 2;">
            <label class="label-caps" style="display:block;margin-bottom:4px;">Known Allergies</label>
            <input id="patient-allergies" type="text" placeholder="e.g. Penicillin, Sulfa" style="width:100%;padding:10px 14px;border-radius:var(--radius-lg);border:1px solid var(--outline-variant);font-family:var(--font-body);font-size:0.95rem;outline:none;transition:border-color 0.2s;" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--outline-variant)'" />
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;background:var(--surface-container-low);padding:12px 16px;border-radius:var(--radius-xl);">
            <span style="font-size:0.875rem;font-weight:600;">Kidney Issue</span>
            <label style="position:relative;display:inline-block;width:44px;height:24px;cursor:pointer;">
              <input type="checkbox" id="kidney-toggle" style="opacity:0;width:0;height:0;">
              <span class="toggle-track" style="position:absolute;inset:0;background:var(--outline-variant);border-radius:24px;transition:background 0.3s;"></span>
              <span class="toggle-thumb" style="position:absolute;top:2px;left:2px;width:20px;height:20px;background:#fff;border-radius:50%;transition:transform 0.3s;box-shadow:0 1px 3px rgba(0,0,0,0.2);"></span>
            </label>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;background:var(--surface-container-low);padding:12px 16px;border-radius:var(--radius-xl);">
            <span style="font-size:0.875rem;font-weight:600;">Liver Issue</span>
            <label style="position:relative;display:inline-block;width:44px;height:24px;cursor:pointer;">
              <input type="checkbox" id="liver-toggle" style="opacity:0;width:0;height:0;">
              <span class="toggle-track" style="position:absolute;inset:0;background:var(--outline-variant);border-radius:24px;transition:background 0.3s;"></span>
              <span class="toggle-thumb" style="position:absolute;top:2px;left:2px;width:20px;height:20px;background:#fff;border-radius:50%;transition:transform 0.3s;box-shadow:0 1px 3px rgba(0,0,0,0.2);"></span>
            </label>
          </div>
        </div>
      </section>

      <!-- SECTION 2: Medication List -->
      <section>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-4);">
          <h3 style="font-weight:700;font-size:1.1rem;color:var(--primary);">Medication List</h3>
          <button id="add-drug-btn" class="btn-secondary" style="padding:6px 16px;font-size:0.8rem;">
            <span class="material-symbols-outlined" style="font-size:1rem;">add</span> Add Another
          </button>
        </div>
        <div id="medication-list" style="display:flex;flex-direction:column;gap:var(--space-3);">
          ${medListHTML()}
        </div>
      </section>

      <!-- SECTION 3: Overall Risk Score -->
      <section class="card-white" style="border:1px solid var(--outline-variant);text-align:center;">
        <span class="label-caps" style="letter-spacing:0.2em;">Overall Risk Score</span>
        <div style="font-size:4rem;font-weight:900;color:var(--on-surface);line-height:1;margin:8px 0;">8.2<span style="font-size:1.5rem;color:var(--on-surface-variant);font-weight:500;">/10</span></div>
        <div style="width:100%;height:10px;background:var(--surface-container);border-radius:var(--radius-full);overflow:hidden;margin:12px 0;">
          <div style="width:82%;height:100%;background:linear-gradient(90deg,#00C853,#FFD600 40%,#FF3D5A 80%);border-radius:var(--radius-full);transition:width 1s;"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">
          <span style="color:#00C853;">Low</span>
          <span style="color:#FFD600;">Moderate</span>
          <span style="color:#FF3D5A;">High</span>
          <span style="color:#C62828;">Critical</span>
        </div>
        <div style="margin-top:12px;display:flex;justify-content:center;gap:16px;">
          <span class="chip" style="background:#FFF0F1;color:#FF3D5A;font-weight:700;font-size:0.75rem;">1 cascade path</span>
          <span class="chip" style="background:#FFFDE7;color:#F9A825;font-weight:700;font-size:0.75rem;">1 pairwise</span>
        </div>
      </section>

      <!-- SECTION 5: Cascade Warning Box -->
      <section style="background:#FFF8E1;border:2px solid #FFD600;border-radius:var(--radius-xl);padding:var(--space-6);">
        <div style="display:flex;gap:16px;">
          <div style="flex-shrink:0;width:44px;height:44px;background:#FFF0C2;border-radius:var(--radius-lg);display:flex;align-items:center;justify-content:center;">
            <span class="material-symbols-outlined" style="color:#F57F17;font-size:1.5rem;font-variation-settings:'FILL' 1;">warning</span>
          </div>
          <div style="flex:1;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
              <h4 style="font-weight:800;color:#E65100;font-style:italic;">Hidden Prescription Cascade Detected</h4>
              <span id="evidence-badge" style="background:#FFAB40;color:#fff;font-size:0.6rem;font-weight:800;padding:3px 10px;border-radius:20px;letter-spacing:0.1em;">GRADE B</span>
            </div>
            <p id="cascade-text" style="font-size:0.875rem;color:#795548;line-height:1.7;margin-bottom:16px;">${technicalText}</p>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;border-top:1px solid #FFD60040;padding-top:12px;">
              <div>
                <span style="font-size:0.65rem;text-transform:uppercase;letter-spacing:0.1em;color:#A1887F;font-weight:700;">Inhibitors</span>
                <div style="font-weight:700;font-size:0.875rem;margin-top:2px;">Fluoxetine, Celecoxib</div>
              </div>
              <div>
                <span style="font-size:0.65rem;text-transform:uppercase;letter-spacing:0.1em;color:#A1887F;font-weight:700;">Affected Drug</span>
                <div style="font-weight:700;font-size:0.875rem;margin-top:2px;">Metoprolol</div>
              </div>
            </div>
            <div style="margin-top:12px;">
              <span class="chip" style="background:#E0F2F1;color:#00695C;font-weight:700;">CYP2D6</span>
              <span class="chip" style="margin-left:6px;background:#E8EAF6;color:#283593;font-weight:700;">Inhibition</span>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 4: Safety Map -->
      <section>
        <div style="background:#0D1117;border-radius:var(--radius-2xl);overflow:hidden;border:1px solid #21262D;">
          <div style="padding:20px 24px;border-bottom:1px solid #21262D;display:flex;align-items:center;justify-content:space-between;">
            <div>
              <div style="display:flex;align-items:center;gap:8px;">
                <h3 style="font-weight:800;font-size:1.2rem;background:linear-gradient(90deg,#58A6FF,#3FB9A0);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Safety Map™</h3>
                <span style="font-size:0.6rem;background:#3FB9A020;color:#3FB9A0;padding:3px 10px;border-radius:20px;font-weight:700;">LIVE NETWORK</span>
              </div>
              <p style="font-size:0.75rem;color:#8B949E;margin-top:4px;">Interactive drug interaction network</p>
            </div>
            <div style="display:flex;gap:12px;font-size:0.65rem;color:#8B949E;font-weight:600;">
              <span>⊙ Drag nodes</span>
              <span>⊙ Scroll to zoom</span>
            </div>
          </div>
          <div id="safety-map-container" style="height:420px;position:relative;overflow:hidden;">
            <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#8B949E;font-size:0.875rem;">
              Loading Safety Map...
            </div>
          </div>
          <!-- Legend -->
          <div style="padding:12px 24px;border-top:1px solid #21262D;display:flex;gap:20px;">
            <div style="display:flex;align-items:center;gap:6px;"><div style="width:10px;height:10px;border-radius:50%;background:#FF3D5A;box-shadow:0 0 6px #FF3D5A80;"></div><span style="font-size:0.65rem;color:#8B949E;font-weight:700;">Cascade drug</span></div>
            <div style="display:flex;align-items:center;gap:6px;"><div style="width:10px;height:10px;border-radius:50%;background:#FFD600;"></div><span style="font-size:0.65rem;color:#8B949E;font-weight:700;">Caution drug</span></div>
            <div style="display:flex;align-items:center;gap:6px;"><div style="width:10px;height:10px;border-radius:50%;background:#00C853;"></div><span style="font-size:0.65rem;color:#8B949E;font-weight:700;">Safe drug</span></div>
            <div style="display:flex;align-items:center;gap:6px;"><div style="width:16px;height:2px;background:#FF3D5A;"></div><span style="font-size:0.65rem;color:#8B949E;font-weight:700;">Cascade path</span></div>
          </div>
        </div>
      </section>

      <!-- SECTION 6: Action Buttons -->
      <section style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3);">
        <button id="copy-report-btn" class="btn-secondary" style="justify-content:center;padding:14px;font-weight:700;border-radius:var(--radius-xl);">
          <span class="material-symbols-outlined" style="font-size:1.1rem;">content_copy</span> Copy Report
        </button>
        <button id="export-pdf-btn" class="btn-secondary" style="justify-content:center;padding:14px;font-weight:700;border-radius:var(--radius-xl);">
          <span class="material-symbols-outlined" style="font-size:1.1rem;">picture_as_pdf</span> Export PDF
        </button>
        <button id="alert-doctor-btn" class="btn-error" style="grid-column:span 2;border-radius:var(--radius-xl);">
          <span class="material-symbols-outlined">medical_services</span> Alert Cardiologist & Psychiatrist
        </button>
        <button id="make-simpler-btn" style="grid-column:span 2;background:var(--primary-container);color:var(--on-primary);padding:14px;border-radius:var(--radius-xl);font-weight:700;font-size:0.95rem;display:flex;align-items:center;justify-content:center;gap:8px;transition:opacity 0.2s;cursor:pointer;">
          <span class="material-symbols-outlined" style="font-size:1.1rem;">auto_awesome</span> Make Simpler
        </button>
      </section>

    </div>
  </div>
  `;
}

// ---- Safety Map D3 Initialization (called from main.js) ----
window.__initSafetyMap = function(d3) {
  const container = document.getElementById('safety-map-container');
  if (!container) return;
  container.innerHTML = '';

  const width = container.clientWidth;
  const height = container.clientHeight;

  const drugs = [
    { id: 'Fluoxetine', dose: '20mg', doctor: 'Psychiatrist', risk: 'danger' },
    { id: 'Metoprolol', dose: '50mg', doctor: 'Cardiologist', risk: 'danger' },
    { id: 'Celecoxib', dose: '200mg', doctor: 'Rheumatologist', risk: 'caution' },
    { id: 'Metformin', dose: '500mg', doctor: 'Endocrinologist', risk: 'safe' },
  ];

  const links = [
    { source: 'Fluoxetine', target: 'Metoprolol', type: 'cascade' },
    { source: 'Celecoxib', target: 'Metoprolol', type: 'caution' },
  ];

  const colorMap = { danger: '#FF3D5A', caution: '#FFD600', safe: '#00C853' };

  const svg = d3.select(container).append('svg')
    .attr('width', width).attr('height', height)
    .style('background', '#0D1117');

  // Grid
  const grid = svg.append('g').attr('opacity', 0.05);
  for (let x = 0; x < width; x += 40) grid.append('line').attr('x1',x).attr('y1',0).attr('x2',x).attr('y2',height).attr('stroke','#fff');
  for (let y = 0; y < height; y += 40) grid.append('line').attr('x1',0).attr('y1',y).attr('x2',width).attr('y2',y).attr('stroke','#fff');

  const g = svg.append('g');

  // Zoom
  svg.call(d3.zoom().scaleExtent([0.5, 3]).on('zoom', e => g.attr('transform', e.transform)));

  // Arrow markers
  const defs = svg.append('defs');
  defs.append('marker').attr('id','arrow-r').attr('viewBox','0 -5 10 10').attr('refX',42).attr('refY',0).attr('markerWidth',6).attr('markerHeight',6).attr('orient','auto')
    .append('path').attr('d','M0,-5L10,0L0,5').attr('fill','#FF3D5A');
  defs.append('marker').attr('id','arrow-y').attr('viewBox','0 -5 10 10').attr('refX',42).attr('refY',0).attr('markerWidth',6).attr('markerHeight',6).attr('orient','auto')
    .append('path').attr('d','M0,-5L10,0L0,5').attr('fill','#FFD600');

  // Glow filter
  const filter = defs.append('filter').attr('id','glow');
  filter.append('feGaussianBlur').attr('stdDeviation','4').attr('result','coloredBlur');
  const feMerge = filter.append('feMerge');
  feMerge.append('feMergeNode').attr('in','coloredBlur');
  feMerge.append('feMergeNode').attr('in','SourceGraphic');

  const simulation = d3.forceSimulation(drugs)
    .force('link', d3.forceLink(links).id(d => d.id).distance(160))
    .force('charge', d3.forceManyBody().strength(-400))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(55));

  const link = g.append('g').selectAll('line').data(links).join('line')
    .attr('stroke', d => d.type === 'cascade' ? '#FF3D5A' : '#FFD600')
    .attr('stroke-width', 2)
    .attr('stroke-dasharray', d => d.type === 'cascade' ? '6 4' : 'none')
    .attr('stroke-opacity', 0.7)
    .attr('marker-end', d => d.type === 'cascade' ? 'url(#arrow-r)' : 'url(#arrow-y)');

  const node = g.append('g').selectAll('g').data(drugs).join('g')
    .call(d3.drag()
      .on('start', (e) => { if (!e.active) simulation.alphaTarget(0.3).restart(); e.subject.fx = e.subject.x; e.subject.fy = e.subject.y; })
      .on('drag', (e) => { e.subject.fx = e.x; e.subject.fy = e.y; })
      .on('end', (e) => { if (!e.active) simulation.alphaTarget(0); e.subject.fx = null; e.subject.fy = null; })
    )
    .style('cursor', 'grab');

  node.append('circle').attr('r', 36)
    .attr('fill', d => colorMap[d.risk])
    .attr('stroke', '#fff').attr('stroke-width', 2)
    .attr('filter', d => d.risk === 'danger' ? 'url(#glow)' : null);

  node.append('text').text(d => d.id)
    .attr('text-anchor', 'middle').attr('dy', '-0.2em')
    .attr('fill', '#fff').attr('font-size', '10px').attr('font-weight', '700')
    .style('pointer-events', 'none');

  node.append('text').text(d => d.dose)
    .attr('text-anchor', 'middle').attr('dy', '1em')
    .attr('fill', '#ffffffaa').attr('font-size', '8px').attr('font-weight', '500')
    .style('pointer-events', 'none');

  // Click popup
  node.on('click', (event, d) => {
    const existing = container.querySelector('.node-popup');
    if (existing) existing.remove();
    const popup = document.createElement('div');
    popup.className = 'node-popup';
    popup.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:260px;background:#fff;border-radius:16px;padding:20px;box-shadow:0 20px 60px rgba(0,0,0,0.5);z-index:10;font-family:var(--font-body);';
    popup.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:12px;">
        <div>
          <div style="font-size:1.1rem;font-weight:800;">${d.id}</div>
          <div style="font-size:0.75rem;color:#888;">${d.dose} · ${d.doctor}</div>
        </div>
        <button onclick="this.closest('.node-popup').remove()" style="border:none;background:none;cursor:pointer;font-size:1.2rem;color:#aaa;">✕</button>
      </div>
      <div style="margin-bottom:12px;">${riskBadgeHTML(d.risk)} <span style="font-size:0.6rem;background:#E8EAF6;color:#5C6BC0;padding:2px 8px;border-radius:12px;font-weight:700;margin-left:4px;">Grade B</span></div>
      <div style="margin-bottom:8px;">
        <span style="font-size:0.6rem;text-transform:uppercase;letter-spacing:0.1em;color:#aaa;font-weight:700;">Interacts with</span>
        <div style="font-weight:700;font-size:0.8rem;margin-top:2px;">${d.risk !== 'safe' ? 'Metoprolol, Celecoxib' : 'No interactions'}</div>
      </div>
      <div>
        <span style="font-size:0.6rem;text-transform:uppercase;letter-spacing:0.1em;color:#aaa;font-weight:700;">Clinical Insight</span>
        <p style="font-size:0.75rem;color:#555;margin-top:4px;line-height:1.6;">${d.risk === 'danger' ? 'This drug blocks the enzyme that removes other medications from your body.' : d.risk === 'caution' ? 'May reduce effectiveness of other medications.' : 'No significant interactions detected.'}</p>
      </div>
    `;
    container.appendChild(popup);
  });

  function riskBadgeHTML(risk) {
    const c = { danger: '#FF3D5A', caution: '#FFD600', safe: '#00C853' };
    const bg = { danger: '#FFF0F1', caution: '#FFFDE7', safe: '#E8F5E9' };
    return `<span style="display:inline-block;padding:2px 10px;border-radius:20px;font-size:0.6rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:${c[risk]};background:${bg[risk]};border:1px solid ${c[risk]}20;">${risk} risk</span>`;
  }

  simulation.on('tick', () => {
    link.attr('x1', d => d.source.x).attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
    node.attr('transform', d => `translate(${d.x},${d.y})`);
  });

  // ---- Toggle Events ----
  document.querySelectorAll('#kidney-toggle, #liver-toggle').forEach(toggle => {
    toggle.addEventListener('change', function() {
      const track = this.nextElementSibling;
      const thumb = track.nextElementSibling;
      if (this.checked) {
        track.style.background = 'var(--primary-container)';
        thumb.style.transform = 'translateX(20px)';
      } else {
        track.style.background = 'var(--outline-variant)';
        thumb.style.transform = 'translateX(0)';
      }
    });
  });

  // ---- Make Simpler ----
  let isSimple = false;
  const technicalText = 'Fluoxetine inhibits CYP2D6 enzyme blocking clearance of Metoprolol. Plasma levels rise — accumulation risk.';
  const simpleText = 'Fluoxetine stops your body from removing Metoprolol properly. Too much Metoprolol builds up in your blood. This can affect your heart. Tell your doctor immediately.';

  document.getElementById('make-simpler-btn')?.addEventListener('click', () => {
    isSimple = !isSimple;
    const textEl = document.getElementById('cascade-text');
    const btn = document.getElementById('make-simpler-btn');
    if (textEl) textEl.textContent = isSimple ? simpleText : technicalText;
    if (btn) btn.innerHTML = `<span class="material-symbols-outlined" style="font-size:1.1rem;">auto_awesome</span> ${isSimple ? 'Restore Medical Terms' : 'Make Simpler'}`;
  });

  // ---- Copy Report ----
  document.getElementById('copy-report-btn')?.addEventListener('click', () => {
    const report = `Sanjeev AI — Drug Interaction Report\nDate: ${new Date().toLocaleDateString()}\nRisk Score: 8.2/10 (HIGH)\n\nMedications:\n- Fluoxetine 20mg (Psychiatrist) [DANGER]\n- Metoprolol 50mg (Cardiologist) [DANGER]\n- Celecoxib 200mg (Rheumatologist) [CAUTION]\n- Metformin 500mg (Endocrinologist) [SAFE]\n\nCascade Detected:\nFluoxetine inhibits CYP2D6 enzyme blocking clearance of Metoprolol.\nInhibitors: Fluoxetine, Celecoxib\nAffected: Metoprolol\nEvidence Grade: B`;
    navigator.clipboard.writeText(report).then(() => alert('Report copied to clipboard!'));
  });

  // ---- Export PDF (simple text-based) ----
  document.getElementById('export-pdf-btn')?.addEventListener('click', () => {
    const w = window.open('', '_blank');
    w.document.write(`<html><head><title>Sanjeev AI Report</title><style>body{font-family:Inter,sans-serif;padding:40px;max-width:600px;margin:0 auto;}h1{color:#012d1d;font-size:1.5rem;}h2{color:#1b4332;font-size:1.1rem;margin-top:24px;}.risk{color:#FF3D5A;font-weight:700;}.med{padding:8px 0;border-bottom:1px solid #eee;}</style></head><body>
      <h1>Sanjeev AI — Drug Interaction Report</h1>
      <p>Generated: ${new Date().toLocaleString()}</p>
      <h2>Overall Risk: <span class="risk">8.2 / 10 (HIGH)</span></h2>
      <h2>Medications</h2>
      <div class="med">Fluoxetine 20mg — Psychiatrist — <span style="color:#FF3D5A;">DANGER</span></div>
      <div class="med">Metoprolol 50mg — Cardiologist — <span style="color:#FF3D5A;">DANGER</span></div>
      <div class="med">Celecoxib 200mg — Rheumatologist — <span style="color:#FFD600;">CAUTION</span></div>
      <div class="med">Metformin 500mg — Endocrinologist — <span style="color:#00C853;">SAFE</span></div>
      <h2>Cascade Warning</h2>
      <p>Fluoxetine inhibits CYP2D6 enzyme blocking clearance of Metoprolol. Plasma levels rise — accumulation risk.</p>
      <p><strong>Inhibitors:</strong> Fluoxetine, Celecoxib</p>
      <p><strong>Affected:</strong> Metoprolol</p>
      <p><strong>Evidence Grade:</strong> B</p>
      <script>window.print();</script></body></html>`);
  });

  // ---- Alert Doctor ----
  document.getElementById('alert-doctor-btn')?.addEventListener('click', () => {
    alert('🚨 Alert sent to Cardiologist and Psychiatrist!\n\nCascade interaction detected between Fluoxetine and Metoprolol.\nRisk Score: 8.2/10\nImmediate review recommended.');
  });
};
