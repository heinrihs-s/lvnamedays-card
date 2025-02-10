class NamedaysCard extends HTMLElement {
  constructor() {
    super();
    // Attach a shadow root so our styles don't leak out.
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
    // Define our card structure and styles using a template literal.
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
          <!-- You can use an image or an SVG icon here -->
          <img class="icon" src="https://cdn-icons-png.flaticon.com/512/747/747376.png" alt="Calendar Icon" />
          <h2>Today's Namedays</h2>
        </div>
        <div class="card-content">
          <p id="namedays">Loading namedays...</p>
        </div>
      </ha-card>
    `;
  }

  loadData() {
    // Note: Adjust the fetch path if your repository structure is different.
    fetch('/hacsfiles/namedays-card/namedays.json')
      .then(response => response.json())
      .then(data => {
        const today = new Date();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const key = `${mm}-${dd}`;
        const names = data[key] ? data[key].join(', ') : 'No namedays today';

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
