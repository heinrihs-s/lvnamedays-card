class NamedaysCard extends HTMLElement {
  constructor() {
    super();
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
    // Get today's date components
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const headerText = `(${dd}.${mm}) vārda dienas svin:`;

    // Minimal HTML and CSS without additional design elements
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: sans-serif;
          padding: 16px;
          color: #333;
        }
        .header {
          font-size: 1.2em;
          margin-bottom: 8px;
        }
      </style>
      <div>
        <div class="header">${headerText}</div>
        <div id="namedays">Loading namedays...</div>
      </div>
    `;
  }

  loadData() {
    // Adjust the path as needed for your repository structure
    fetch('/hacsfiles/namedays-card/namedays.json')
      .then(response => response.json())
      .then(data => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const key = `${mm}-${dd}`;
        const names = data[key] ? data[key].join(', ') : 'Nav vārda dienu';
        const namedaysEl = this.shadowRoot.getElementById('namedays');
        if (namedaysEl) {
          namedaysEl.textContent = names;
        }
      })
      .catch(err => {
        console.error('Error fetching namedays:', err);
        const namedaysEl = this.shadowRoot.getElementById('namedays');
        if (namedaysEl) {
          namedaysEl.textContent = 'Error loading namedays';
        }
      });
  }
}

customElements.define('namedays-card', NamedaysCard);
