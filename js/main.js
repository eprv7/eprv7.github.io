// Simple mobile nav toggle
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('#nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }
})();

// Initialize map with Leaflet
(function () {
  const mapEl = document.getElementById('map');
  if (!mapEl) {
    console.log('Map element not found');
    return;
  }

  // Wait for full DOM and Leaflet
  window.addEventListener('load', function() {
    if (typeof L === 'undefined') {
      console.error('Leaflet not loaded');
      return;
    }

    try {
      const places = [
        { coords: [45.5222818, -73.6200633], icon: '🪐', popup: '<b>Campus MIL</b><br>Conference venue' },
        { coords: [45.5606668, -73.55057], icon: '🌠', popup: '<b>Planétarium de Montréal</b><br>Opening reception' },
        { coords: [45.50669, -73.6137493], icon: '🛏️', popup: '<b>UdeM Residences (Next to CEPSUM)</b><br>Budget lodging' }
      ];

      const map = L.map('map', {
        center: places[0].coords,
        zoom: 12
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);

      // Custom icon function
      function createCustomIcon(emoji) {
        return L.divIcon({
          html: `<div class="custom-marker-icon">${emoji}</div>`,
          className: '',
          iconSize: [44, 44],
          iconAnchor: [22, 22]
        });
      }

      places.forEach(place => {
        L.marker(place.coords, { icon: createCustomIcon(place.icon) })
          .addTo(map)
          .bindPopup(place.popup);
      });

      // Fit view to all markers with gentle padding
      const bounds = L.latLngBounds(places.map(p => p.coords));
      map.fitBounds(bounds, { padding: [30, 30], maxZoom: 14 });

      console.log('Map initialized successfully');
    } catch (e) {
      console.error('Error initializing map:', e);
    }
  });
})();
