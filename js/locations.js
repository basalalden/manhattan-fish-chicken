/* Manhattan Fish & Chicken - Locations Page JavaScript */

let locations = [];

document.addEventListener('DOMContentLoaded', function() {
  loadLocationsData();
});

/* ==================== Load Locations Data ==================== */

async function loadLocationsData() {
  const loading = document.getElementById('locations-loading');
  const grid = document.getElementById('locations-grid');

  try {
    const basePath = window.location.origin;
    const response = await fetch(`${basePath}/_data/locations.json`);
    const data = await response.json();
    locations = data.locations || [];

    // Hide loading, render locations
    if (loading) loading.style.display = 'none';
    renderLocations(locations);

    // Initialize filter and directions after rendering
    initLocationFilter();
    initDirectionsLinks();

  } catch (error) {
    console.error('Error loading locations:', error);
    if (loading) loading.innerHTML = '<p>Error loading locations. Please refresh the page.</p>';
  }
}

/* ==================== Render Locations ==================== */

function renderLocations(locs) {
  const grid = document.getElementById('locations-grid');
  if (!grid) return;

  grid.innerHTML = locs.map(loc => `
    <div class="location-card glass-card" data-location="${loc.name.toLowerCase().replace(/\s+/g, '-')}" data-features="${(loc.features || []).join(',')}">
      <div class="location-card-header">
        <h3>${loc.name}</h3>
        ${loc.features?.includes('Market') ? '<span class="badge badge-primary">+ Market</span>' : ''}
      </div>

      <div class="location-info">
        <div class="location-info-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <div>
            <p>${loc.address}</p>
            <p>${loc.city}</p>
          </div>
        </div>

        <div class="location-info-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <a href="tel:${loc.phone.replace(/[^0-9]/g, '')}">${loc.phone}</a>
        </div>

        <div class="location-info-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <div class="location-hours">
            <p><strong>Mon-Fri:</strong> ${loc.hours_weekday}</p>
            <p><strong>Sat:</strong> ${loc.hours_weekend}</p>
            <p><strong>Sun:</strong> ${loc.hours_sunday}</p>
          </div>
        </div>
      </div>

      <div class="location-features">
        ${(loc.features || []).map(f => `<span class="feature-tag">${f}</span>`).join('')}
      </div>

      <div class="location-actions">
        <a href="order.html?location=${loc.name.toLowerCase().replace(/\s+/g, '-')}" class="btn btn-primary">Order from Here</a>
        <button class="btn btn-secondary get-directions-btn" data-address="${loc.address}, ${loc.city}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
          Directions
        </button>
      </div>

      <div class="location-delivery">
        <p>Order delivery via:</p>
        <div class="delivery-links">
          ${loc.doordash ? `<a href="${loc.doordash}" target="_blank" rel="noopener" class="delivery-badge">DoorDash</a>` : ''}
          ${loc.ubereats ? `<a href="${loc.ubereats}" target="_blank" rel="noopener" class="delivery-badge">UberEats</a>` : ''}
          ${loc.grubhub ? `<a href="${loc.grubhub}" target="_blank" rel="noopener" class="delivery-badge">Grubhub</a>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

/* ==================== Location Filter ==================== */

function initLocationFilter() {
  const filterBtns = document.querySelectorAll('.location-filter-btn');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      const locationCards = document.querySelectorAll('.location-card[data-location]');

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter cards
      locationCards.forEach(card => {
        const features = card.dataset.features?.split(',') || [];

        if (filter === 'all' || features.includes(filter)) {
          card.style.display = '';
          card.classList.add('animate-fade-in');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==================== Directions Links ==================== */

function initDirectionsLinks() {
  document.querySelectorAll('.get-directions-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const address = btn.dataset.address;
      if (address) {
        // Open in Google Maps
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
        window.open(mapsUrl, '_blank');
      }
    });
  });
}

/* ==================== Get Nearest Location ==================== */

function getNearestLocation(userLat, userLng) {
  let nearest = null;
  let minDistance = Infinity;

  locations.forEach(loc => {
    if (loc.coordinates) {
      const distance = getDistance(userLat, userLng, loc.coordinates.lat, loc.coordinates.lng);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = loc;
      }
    }
  });

  return { location: nearest, distance: minDistance };
}

function getDistance(lat1, lng1, lat2, lng2) {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function toRad(deg) {
  return deg * (Math.PI / 180);
}

// Find nearest location button handler
function findNearestLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { location, distance } = getNearestLocation(
          position.coords.latitude,
          position.coords.longitude
        );

        if (location) {
          MFC.showToast(`Nearest location: ${location.name} (${distance.toFixed(1)} miles)`, 'success');

          // Scroll to and highlight the card
          const card = document.querySelector(`[data-location="${location.name.toLowerCase().replace(/\s+/g, '-')}"]`);
          if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.style.boxShadow = '0 0 0 4px var(--primary)';
            setTimeout(() => {
              card.style.boxShadow = '';
            }, 3000);
          }
        }
      },
      (error) => {
        MFC.showToast('Unable to get your location. Please enable location services.', 'error');
      }
    );
  } else {
    MFC.showToast('Geolocation is not supported by your browser.', 'error');
  }
}

// Export for use in HTML
window.findNearestLocation = findNearestLocation;
window.MFCLocations = locations;
