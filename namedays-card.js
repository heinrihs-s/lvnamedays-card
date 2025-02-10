class NamedaysCard extends HTMLElement {
  setConfig(config) {
    this.config = config;
  }

  connectedCallback() {
    this.render();
    this.loadData();
  }

  render() {
    this.innerHTML = `
      <ha-card header="Namedays">
        <div id="content" style="padding: 16px;">Loading namedays...</div>
      </ha-card>
    `;
  }

  loadData() {
    // IMPORTANT: fetch from the HACS path
    fetch('/hacsfiles/namedays-card/namedays.json')
      .then(response => response.json())
      .then(data => {
        const today = new Date();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const key = `${mm}-${dd}`;

        const names = data[key] ? data[key].join(', ') : 'No namedays today';
        this.querySelector('#content').innerHTML = `
          <p>Today's Namedays: <strong>${names}</strong></p>
        `;
      })
      .catch(err => {
        console.error('Error fetching namedays:', err);
        this.querySelector('#content').innerHTML = `<p>Error loading namedays</p>`;
      });
  }
}

customElements.define('namedays-card', NamedaysCard);
