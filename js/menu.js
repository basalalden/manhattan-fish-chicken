/* Manhattan Fish & Chicken - Menu Page JavaScript */

document.addEventListener('DOMContentLoaded', function() {
  initMenuTabs();
  initMenuSearch();
});

/* ==================== Menu Tabs ==================== */

function initMenuTabs() {
  const tabs = document.querySelectorAll('.menu-tab');
  const items = document.querySelectorAll('.menu-item');

  if (!tabs.length || !items.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.dataset.category;

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
  const items = document.querySelectorAll('.menu-item');
  const noResults = document.getElementById('no-results');

  if (!searchInput || !items.length) return;

  searchInput.addEventListener('input', MFC.debounce((e) => {
    const query = e.target.value.toLowerCase().trim();
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

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
  cart.load();

  // Add click handlers for "Add to Order" buttons
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = {
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: parseFloat(btn.dataset.price)
      };
      cart.add(item);
    });
  });
});

// Export cart for use in other pages
window.MFCCart = cart;
