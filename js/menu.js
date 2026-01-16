/* Manhattan Fish & Chicken - Menu Page JavaScript */

let menuItems = [];

document.addEventListener('DOMContentLoaded', function() {
  loadMenuData();
});

/* ==================== Load Menu Data ==================== */

async function loadMenuData() {
  const loading = document.getElementById('menu-loading');
  const grid = document.getElementById('menu-grid');

  try {
    const basePath = window.location.origin;
    const response = await fetch(`${basePath}/_data/menu.json`);
    const data = await response.json();
    menuItems = data.items || [];

    // Hide loading, render menu
    if (loading) loading.style.display = 'none';
    renderMenuItems(menuItems);

    // Initialize tabs and search after rendering
    initMenuTabs();
    initMenuSearch();
    cart.load();

  } catch (error) {
    console.error('Error loading menu:', error);
    if (loading) loading.innerHTML = '<p>Error loading menu. Please refresh the page.</p>';
  }
}

/* ==================== Render Menu Items ==================== */

function renderMenuItems(items) {
  const grid = document.getElementById('menu-grid');
  if (!grid) return;

  grid.innerHTML = items.map(item => `
    <div class="menu-item" data-category="${item.category}">
      <div class="menu-item-image">
        ${item.image
          ? `<img src="${item.image}" alt="${item.name}" loading="lazy">`
          : `<div style="background: var(--secondary); display: flex; align-items: center; justify-content: center; height: 100%;"><span style="font-size: 2rem;">${getCategoryEmoji(item.category)}</span></div>`
        }
      </div>
      <div class="menu-item-content">
        <div class="menu-item-header">
          <h4 class="menu-item-name">${item.name}</h4>
          <span class="menu-item-price">$${item.price}</span>
        </div>
        <p class="menu-item-description">${item.description}</p>
        ${item.badge ? `
          <div class="menu-item-tags">
            <span class="menu-tag" style="background: var(--primary-light); color: var(--primary);">${item.badge}</span>
          </div>
        ` : ''}
      </div>
    </div>
  `).join('');
}

function getCategoryEmoji(category) {
  const emojis = {
    chicken: '🍗',
    fish: '🐟',
    seafood: '🦐',
    combos: '🍱',
    sides: '🍟',
    drinks: '🥤'
  };
  return emojis[category] || '🍽️';
}

/* ==================== Menu Tabs ==================== */

function initMenuTabs() {
  const tabs = document.querySelectorAll('.menu-tab');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.dataset.category;
      const items = document.querySelectorAll('.menu-item');

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

      // Update URL without refresh
      const url = new URL(window.location);
      if (category === 'all') {
        url.searchParams.delete('category');
      } else {
        url.searchParams.set('category', category);
      }
      window.history.replaceState({}, '', url);
    });
  });

  // Check URL for initial category
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get('category');
  if (initialCategory) {
    const targetTab = document.querySelector(`.menu-tab[data-category="${initialCategory}"]`);
    if (targetTab) {
      targetTab.click();
    }
  }
}

/* ==================== Menu Search ==================== */

function initMenuSearch() {
  const searchInput = document.getElementById('menu-search');
  const noResults = document.getElementById('no-results');

  if (!searchInput) return;

  searchInput.addEventListener('input', MFC.debounce((e) => {
    const query = e.target.value.toLowerCase().trim();
    const items = document.querySelectorAll('.menu-item');
    let visibleCount = 0;

    items.forEach(item => {
      const name = item.querySelector('.menu-item-name')?.textContent.toLowerCase() || '';
      const description = item.querySelector('.menu-item-description')?.textContent.toLowerCase() || '';
      const category = item.dataset.category?.toLowerCase() || '';

      const matches = name.includes(query) || description.includes(query) || category.includes(query);

      if (matches || query === '') {
        item.style.display = '';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });

    // Show/hide no results message
    if (noResults) {
      noResults.style.display = visibleCount === 0 && query !== '' ? 'block' : 'none';
    }

    // Reset tabs to "All" when searching
    if (query !== '') {
      const allTab = document.querySelector('.menu-tab[data-category="all"]');
      if (allTab && !allTab.classList.contains('active')) {
        document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
        allTab.classList.add('active');
      }
    }
  }, 200));
}

/* ==================== Add to Order ==================== */

// Simple cart functionality (can be expanded)
const cart = {
  items: [],

  add(item) {
    const existing = this.items.find(i => i.id === item.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.items.push({ ...item, quantity: 1 });
    }
    this.save();
    this.updateUI();
    MFC.showToast(`${item.name} added to cart!`, 'success');
  },

  remove(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
    this.updateUI();
  },

  updateQuantity(id, quantity) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.quantity = Math.max(0, quantity);
      if (item.quantity === 0) {
        this.remove(id);
      } else {
        this.save();
        this.updateUI();
      }
    }
  },

  getTotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  getCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  save() {
    localStorage.setItem('mfc_cart', JSON.stringify(this.items));
  },

  load() {
    const saved = localStorage.getItem('mfc_cart');
    if (saved) {
      this.items = JSON.parse(saved);
    }
    this.updateUI();
  },

  updateUI() {
    const countBadge = document.getElementById('cart-count');
    if (countBadge) {
      const count = this.getCount();
      countBadge.textContent = count;
      countBadge.style.display = count > 0 ? 'flex' : 'none';
    }

    const totalDisplay = document.getElementById('cart-total');
    if (totalDisplay) {
      totalDisplay.textContent = MFC.formatCurrency(this.getTotal());
    }
  },

  clear() {
    this.items = [];
    this.save();
    this.updateUI();
  }
};

// Export cart for use in other pages
window.MFCCart = cart;
