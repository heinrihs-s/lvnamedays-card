class NamedaysCard extends HTMLElement {
  setConfig(config) {
    // You can use configuration options if needed.
    this.config = config;
  }

  connectedCallback() {
    this.innerHTML = `<div id="content" style="padding:16px;">Loading namedays...</div>`;
    this.loadData();
  }

  loadData() {
    fetch('/local/namedays.json')
      .then(response => response.json())
      .then(data => {
        const today = new Date();
        const month = ('0' + (today.getMonth() + 1)).slice(-2);
        const day = ('0' + today.getDate()).slice(-2);
        const key = `${month}-${day}`;
        const names = data[key] ? data[key].join(', ') : 'No namedays today';
        this.querySelector('#content').innerHTML = `<h2>Today's Namedays</h2><p>${names}</p>`;
      })
      .catch(error => {
        this.querySelector('#content').innerHTML = `<p>Error loading namedays</p>`;
        console.error('Error fetching namedays:', error);
      });
  }
}

customElements.define('namedays-card', NamedaysCard);
