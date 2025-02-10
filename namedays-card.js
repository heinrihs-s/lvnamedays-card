class NamedaysCard extends HTMLElement {
  constructor() {
    super();
    // Use Shadow DOM to encapsulate styles
    this.attachShadow({ mode: "open" });
  }

  setConfig(config) {
    this.config = config;
  }

  connectedCallback() {
    this.render();
    this.loadData();
  }

  render() {
    // Calculate today's date components
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    // Build the header text with the requested format
    const headerText = `Šodien (${dd}.${mm}) vārda dienu svin:`;

    this.shadowRoot.innerHTML = `
      <style>
        ha-card {
          display: block;
          font-family: var(--ha-card-font-family, "Roboto", "Noto", sans-serif);
          border-radius: var(--ha-card-border-radius, 12px);
          box-shadow: var(--ha-card-box-shadow, 0 2px 4px rgba(0,0,0,0.2));
          background: var(--ha-card-background, #fff);
          color: var(--primary-text-color, #333);
        }
        .card-header {
          display: flex;
          align-items: center;
          padding: 16px;
          border-bottom: 1px solid var(--divider-color, #e0e0e0);
        }
        .card-header h2 {
          margin: 0;
          font-size: 1.2em;
          flex-grow: 1;
        }
        .card-header .icon {
          width: 24px;
          height: 24px;
          margin-right: 8px;
        }
        .card-content {
          padding: 16px;
          font-size: 1em;
          line-height: 1.4;
        }
        .namedays-list {
          font-weight: bold;
          color: var(--accent-color, #007bff);
        }
      </style>
      <ha-card>
        <div class="card-header">
          <!-- Icon can be changed or removed if desired -->
          <img class="icon" src="https://cdn-icons-png.flaticon.com/512/747/747376.png" alt="Calendar Icon" />
          <h2>${headerText}</h2>
        </div>
        <div class="card-content">
          <p id="namedays">Loading namedays...</p>
        </div>
      </ha-card>
    `;
  }

  loadData() {
    // Adjust the path if your repository structure is different
    fetch('/hacsfiles/namedays-card/namedays.json')
      .then(response => response.json())
      .then(data => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        // Our JSON keys are in "MM-DD" format
        const key = `${mm}-${dd}`;
        const names = data[key] ? data[key].join(', ') : 'Nav vārda dienu';
        const namedaysEl = this.shadowRoot.getElementById('namedays');
        if (namedaysEl) {
          namedaysEl.innerHTML = `<span class="namedays-list">${names}</span>`;
        }
      })
      .catch(err => {
        console.error('Error fetching namedays:', err);
        const namedaysEl = this.shadowRoot.getElementById('namedays');
        if (namedaysEl) {
          namedaysEl.innerHTML = 'Error loading namedays';
        }
      });
  }
}

customElements.define('namedays-card', NamedaysCard);
