/* Manhattan Fish & Chicken - Order Page JavaScript */

document.addEventListener('DOMContentLoaded', function() {
  initLocationSelector();
  initOrderTypeToggle();
  updateDeliveryLinks();
});

// Get location from URL params
function getLocationFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('location');
}

/* ==================== Location Selector ==================== */

function initLocationSelector() {
  const locationSelect = document.getElementById('order-location');
  const initialLocation = getLocationFromURL();

  if (locationSelect && initialLocation) {
    locationSelect.value = initialLocation;
    updateDeliveryLinks();
  }

  if (locationSelect) {
    locationSelect.addEventListener('change', () => {
      updateDeliveryLinks();

      // Update URL without refresh
      const url = new URL(window.location);
      if (locationSelect.value) {
        url.searchParams.set('location', locationSelect.value);
      } else {
        url.searchParams.delete('location');
      }
      window.history.replaceState({}, '', url);
    });
  }
}

/* ==================== Order Type Toggle ==================== */

function initOrderTypeToggle() {
  const toggleBtns = document.querySelectorAll('.order-toggle-btn');
  const pickupSection = document.getElementById('pickup-section');
  const deliverySection = document.getElementById('delivery-section');

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.type;

      // Update active button
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show/hide sections
      if (type === 'pickup') {
        if (pickupSection) pickupSection.style.display = 'block';
        if (deliverySection) deliverySection.style.display = 'none';
      } else {
        if (pickupSection) pickupSection.style.display = 'none';
        if (deliverySection) deliverySection.style.display = 'block';
      }
    });
  });
}

/* ==================== Update Delivery Links ==================== */

function updateDeliveryLinks() {
  const locationSelect = document.getElementById('order-location');
  const location = locationSelect?.value || 'harlem';

  // Update delivery partner links based on selected location
  const deliveryLinks = {
    harlem: {
      doordash: 'https://www.doordash.com/store/manhattan-fish-chicken-harlem',
      ubereats: 'https://www.ubereats.com/store/manhattan-fish-chicken-harlem',
      grubhub: 'https://www.grubhub.com/restaurant/manhattan-fish-chicken-harlem'
    },
    bronx: {
      doordash: 'https://www.doordash.com/store/manhattan-fish-chicken-bronx',
      ubereats: 'https://www.ubereats.com/store/manhattan-fish-chicken-bronx',
      grubhub: 'https://www.grubhub.com/restaurant/manhattan-fish-chicken-bronx'
    },
    brooklyn: {
      doordash: 'https://www.doordash.com/store/manhattan-fish-chicken-brooklyn',
      ubereats: 'https://www.ubereats.com/store/manhattan-fish-chicken-brooklyn',
      grubhub: 'https://www.grubhub.com/restaurant/manhattan-fish-chicken-brooklyn'
    },
    queens: {
      doordash: 'https://www.doordash.com/store/manhattan-fish-chicken-queens',
      ubereats: 'https://www.ubereats.com/store/manhattan-fish-chicken-queens',
      grubhub: 'https://www.grubhub.com/restaurant/manhattan-fish-chicken-queens'
    }
  };

  const links = deliveryLinks[location] || deliveryLinks.harlem;

  // Update link hrefs
  const doordashLink = document.querySelector('[data-delivery="doordash"]');
  const ubereatsLink = document.querySelector('[data-delivery="ubereats"]');
  const grubhubLink = document.querySelector('[data-delivery="grubhub"]');

  if (doordashLink) doordashLink.href = links.doordash;
  if (ubereatsLink) ubereatsLink.href = links.ubereats;
  if (grubhubLink) grubhubLink.href = links.grubhub;

  // Update phone numbers
  const phones = {
    harlem: '(212) 555-0123',
    bronx: '(718) 555-0124',
    brooklyn: '(718) 555-0125',
    queens: '(718) 555-0126'
  };

  const phoneDisplay = document.getElementById('location-phone');
  const phoneLink = document.getElementById('location-phone-link');

  if (phoneDisplay) phoneDisplay.textContent = phones[location] || phones.harlem;
  if (phoneLink) phoneLink.href = `tel:+1${(phones[location] || phones.harlem).replace(/\D/g, '')}`;

  // Update address
  const addresses = {
    harlem: '123 W 125th Street, New York, NY 10027',
    bronx: '456 E Fordham Road, Bronx, NY 10458',
    brooklyn: '789 Flatbush Avenue, Brooklyn, NY 11226',
    queens: '321 Jamaica Avenue, Queens, NY 11432'
  };

  const addressDisplay = document.getElementById('location-address');
  if (addressDisplay) addressDisplay.textContent = addresses[location] || addresses.harlem;
}
