// Prescription Scanner
export function renderScanner(navigate) {
  return `
  <div class="page-enter scanner-page">
    <!-- Camera Viewfinder -->
    <div class="scanner-viewfinder">
      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1nFcHhAUUEFuWj1ykkVKgagZB14a8UGCjUHYwnjKpF1m3fc09VzP3uykXFYl8BjhBqcjryaP5D4uprXkrye8mHhAMFogCd1PgIihL3rsvIKJ-v7dK9IFZyZ2K-vg1q2KG5x1shc_CjsEq47a9yE-ZK62KA2bePhX-fJK-mYYosXMTozxPw2D4RPFluoqXoqdJeGx6eA_uRYG1NMMdLapV06P2kLhKK-Kh7GcTrJyrqA8YWCqwOzJX7VqmqeX60Jo9fWRLH2i4cw" alt="Camera Viewfinder" />
      <div class="scanner-overlay">
        <div class="scanner-frame">
          <div class="corner-tl"><span class="material-symbols-outlined">eco</span></div>
          <div class="corner-br"><span class="material-symbols-outlined">eco</span></div>
          <div class="scanner-scan-line"></div>
          <p>Align your prescription within the frame</p>
        </div>

        <div class="scanner-controls">
          <button class="scanner-btn-circle scanner-btn-circle--glass">
            <span class="material-symbols-outlined">flash_on</span>
          </button>
          <button class="scanner-btn-circle scanner-btn-circle--capture" id="scanner-capture">
            <span class="material-symbols-outlined">photo_camera</span>
          </button>
          <button class="scanner-btn-circle scanner-btn-circle--glass">
            <span class="material-symbols-outlined">history</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Upload -->
    <div class="scanner-upload">
      <button class="btn-secondary" style="width:100%; justify-content:center;">
        <span class="material-symbols-outlined">upload_file</span>
        Upload from Gallery
      </button>
    </div>

    <!-- Privacy -->
    <div class="scanner-privacy">
      <span class="material-symbols-outlined">security</span>
      <span>Privacy Protected • AI Analysis</span>
    </div>
  </div>
  `;
}
