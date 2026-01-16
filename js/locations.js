/* Manhattan Fish & Chicken - Locations Page JavaScript */

document.addEventListener('DOMContentLoaded', function() {
  initLocationFilter();
  initDirectionsLinks();
});

// Store locations data
const locations = [
  {
    id: 'harlem',
    name: 'Harlem',
    address: '123 W 125th Street',
    city: 'New York, NY 10027',
    phone: '(212) 555-0123',
    hours: {
      weekday: '10:00 AM - 11:00 PM',
      weekend: '10:00 AM - 12:00 AM',
      sunday: '11:00 AM - 10:00 PM'
    },
    coordinates: { lat: 40.8089, lng: -73.9482 },
    features: ['Dine-In', 'Takeout', 'Delivery', 'Market'],
    doordash: 'https://www.doordash.com/store/manhattan-fish-chicken-harlem',
    ubereats: 'https://www.ubereats.com/store/manhattan-fish-chicken-harlem',
    grubhub: 'https://www.grubhub.com/restaurant/manhattan-fish-chicken-harlem'
  },
  {
    id: 'bronx',
    name: 'Bronx',
    address: '456 E Fordham Road',
    city: 'Bronx, NY 10458',
    phone: '(718) 555-0124',
    hours: {
      weekday: '10:00 AM - 10:00 PM',
      weekend: '10:00 AM - 11:00 PM',
      sunday: '11:00 AM - 9:00 PM'
    },
    coordinates: { lat: 40.8614, lng: -73.8879 },
    features: ['Dine-In', 'Takeout', 'Delivery'],
    doordash: 'https://www.doordash.com/store/manhattan-fish-chicken-bronx',
    ubereats: 'https://www.ubereats.com/store/manhattan-fish-chicken-bronx',
    grubhub: 'https://www.grubhub.com/restaurant/manhattan-fish-chicken-bronx'
  },
  {
    id: 'brooklyn',
    name: 'Brooklyn',
    address: '789 Flatbush Avenue',
    city: 'Brooklyn, NY 11226',
    phone: '(718) 555-0125',
    hours: {
      weekday: '10:00 AM - 11:00 PM',
      weekend: '10:00 AM - 12:00 AM',
      sunday: '11:00 AM - 10:00 PM'
    },
    coordinates: { lat: 40.6501, lng: -73.9597 },
    features: ['Dine-In', 'Takeout', 'Delivery', 'Market', 'Parking'],
    doordash: 'https://www.doordash.com/store/manhattan-fish-chicken-brooklyn',
    ubereats: 'https://www.ubereats.com/store/manhattan-fish-chicken-brooklyn',
    grubhub: 'https://www.grubhub.com/restaurant/manhattan-fish-chicken-brooklyn'
  },
  {
    id: 'queens',
    name: 'Queens',
    address: '321 Jamaica Avenue',
    city: 'Queens, NY 11432',
    phone: '(718) 555-0126',
    hours: {
      weekday: '10:00 AM - 11:00 PM',
      weekend: '10:00 AM - 11:00 PM',
      sunday: '11:00 AM - 10:00 PM'
    },
    coordinates: { lat: 40.7043, lng: -73.7920 },
    features: ['Dine-In', 'Takeout', 'Delivery', 'Drive-Thru'],
    doordash: 'https://www.doordash.com/store/manhattan-fish-chicken-queens',
    ubereats: 'https://www.ubereats.com/store/manhattan-fish-chicken-queens',
    grubhub: 'https://www.grubhub.com/restaurant/manhattan-fish-chicken-queens'
  }
];

/* ==================== Location Filter ==================== */

function initLocationFilter() {
  const filterBtns = document.querySelectorAll('.location-filter-btn');
  const locationCards = document.querySelectorAll('.location-card[data-location]');

  if (!filterBtns.length || !locationCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter cards
      locationCards.forEach(card => {
        const location = card.dataset.location;
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
    const distance = getDistance(userLat, userLng, loc.coordinates.lat, loc.coordinates.lng);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = loc;
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
          const card = document.querySelector(`[data-location="${location.id}"]`);
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
