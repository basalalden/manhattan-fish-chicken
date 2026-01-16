/* Manhattan Fish & Chicken - Market Page JavaScript */

let marketProducts = [];

document.addEventListener('DOMContentLoaded', function() {
  loadMarketData();
});

/* ==================== Load Market Data ==================== */

async function loadMarketData() {
  const loading = document.getElementById('market-loading');
  const grid = document.getElementById('market-grid');

  try {
    const basePath = window.location.origin;
    const response = await fetch(`${basePath}/data/market.json`);
    const data = await response.json();
    marketProducts = data.products || [];

    // Hide loading, render products
    if (loading) loading.style.display = 'none';
    renderMarketProducts(marketProducts);

    // Initialize filter after rendering
    initMarketFilter();

  } catch (error) {
    console.error('Error loading market products:', error);
    if (loading) loading.innerHTML = '<p>Error loading products. Please refresh the page.</p>';
  }
}

/* ==================== Render Market Products ==================== */

function renderMarketProducts(products) {
  const grid = document.getElementById('market-grid');
  if (!grid) return;

  grid.innerHTML = products.map(product => `
    <div class="market-item" data-category="${product.category}">
      <div class="market-item-image">
        ${product.image
          ? `<img src="${product.image}" alt="${product.name}" loading="lazy">`
          : `<div style="background: var(--secondary); display: flex; align-items: center; justify-content: center; height: 100%;"><span style="font-size: 3rem;">${getCategoryEmoji(product.category)}</span></div>`
        }
        ${product.badge ? `<span class="market-badge">${product.badge}</span>` : ''}
      </div>
      <div class="market-item-content">
        <h4 class="market-item-name">${product.name}</h4>
        <p class="market-item-description">${product.description}</p>
        <div class="market-item-footer">
          <span class="market-item-price">$${product.price}<span class="market-item-unit">${product.unit}</span></span>
          <a href="tel:+12125550123" class="btn btn-primary btn-sm">Call to Order</a>
        </div>
      </div>
    </div>
  `).join('');
}

function getCategoryEmoji(category) {
  const emojis = {
    fish: '🐟',
    seafood: '🦐',
    poultry: '🍗',
    groceries: '🛒'
  };
  return emojis[category] || '🍽️';
}

/* ==================== Market Filter ==================== */

function initMarketFilter() {
  const tabs = document.querySelectorAll('.market-tab');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.dataset.category;
      const items = document.querySelectorAll('.market-item');

      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Filter items
      items.forEach(item => {
        const itemCategory = item.dataset.category;

        if (category === 'all' || itemCategory === category) {
          item.style.display = '';
          item.classList.add('animate-fade-in');
        } else {
          item.style.display = 'none';
          item.classList.remove('animate-fade-in');
        }
      });
    });
  });
}

// Export for use elsewhere
window.MFCMarket = marketProducts;
