/**
 * NESTORA — LUXURY BEDDING & SLEEP COMFORT
 * Wishlist Engine (Synced with LocalStorage)
 */

(function () {
  const WISHLIST_STORAGE_KEY = 'nestora_wishlist_items';

  function getWishlist() {
    try {
      return JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveWishlist(items) {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    updateWishlistUI();
  }

  function toggleItem(productId) {
    let list = getWishlist();
    const index = list.indexOf(productId);
    const product = typeof NESTORA_PRODUCTS !== 'undefined' ? NESTORA_PRODUCTS.find(p => p.id === productId) : null;
    const title = product ? product.name : 'Item';

    if (index > -1) {
      list.splice(index, 1);
      saveWishlist(list);
      if (window.NestoraToast) {
        window.NestoraToast.show({
          title: 'Removed from Saved Items',
          message: `${title} was removed from your wishlist.`,
          icon: 'bi-heart'
        });
      }
      return false;
    } else {
      list.push(productId);
      saveWishlist(list);
      if (window.NestoraToast) {
        window.NestoraToast.show({
          title: 'Saved to Wishlist',
          message: `${title} was added to your curated favorites.`,
          icon: 'bi-heart-fill'
        });
      }
      return true;
    }
  }

  function isInWishlist(productId) {
    return getWishlist().includes(productId);
  }

  function updateWishlistUI() {
    const list = getWishlist();
    const badges = document.querySelectorAll('.wishlist-badge-count');
    badges.forEach(b => {
      b.textContent = list.length;
      b.style.display = list.length > 0 ? '' : 'none';
    });

    // Update heart icons on cards
    document.querySelectorAll('[data-wishlist-id]').forEach(btn => {
      const id = btn.getAttribute('data-wishlist-id');
      const inList = list.includes(id);
      if (inList) {
        btn.classList.add('active');
        const icon = btn.querySelector('i');
        if (icon) icon.className = 'bi bi-heart-fill text-danger';
      } else {
        btn.classList.remove('active');
        const icon = btn.querySelector('i');
        if (icon) icon.className = 'bi bi-heart';
      }
    });

    // Render Wishlist Page if present
    renderWishlistPage();
  }

  function renderWishlistPage() {
    const container = document.getElementById('wishlist-grid-container');
    const emptyState = document.getElementById('wishlist-empty-state');
    const guestBanner = document.getElementById('wishlist-guest-banner');

    if (guestBanner && window.NestoraAuth) {
      const user = window.NestoraAuth.getUser();
      guestBanner.style.display = user.isLoggedIn ? 'none' : 'block';
    }

    if (!container) return;

    const list = getWishlist();
    if (list.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    if (typeof NESTORA_PRODUCTS === 'undefined') return;

    const items = NESTORA_PRODUCTS.filter(p => list.includes(p.id));
    container.innerHTML = items.map(p => `
      <div class="col-6 col-md-4 col-lg-3">
        <div class="product-card">
          <div class="product-card-media">
            <img src="${p.images[0]}" alt="${p.name}" class="primary-img" loading="lazy">
            <div class="product-card-actions">
              <button class="card-action-btn active" data-wishlist-id="${p.id}" onclick="NestoraWishlist.toggleItem('${p.id}')" aria-label="Remove from Wishlist">
                <i class="bi bi-heart-fill text-danger"></i>
              </button>
            </div>
          </div>
          <div class="product-card-body">
            <span class="product-card-category">${p.categoryName}</span>
            <h4 class="product-card-title">
              <a href="product-details.html?id=${p.id}">${p.name}</a>
            </h4>
            <div class="product-card-footer">
              <div class="product-card-price">
                <span class="current">$${p.price}</span>
              </div>
              <button class="btn-nestora btn-nestora-primary btn-nestora-sm" onclick="NestoraCart.addItem('${p.id}', 1, '${p.sizes[0]}', '${p.colors[0].name}')">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateWishlistUI();

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-wishlist-id]');
      if (btn) {
        e.preventDefault();
        const id = btn.getAttribute('data-wishlist-id');
        toggleItem(id);
      }
    });
  });

  window.NestoraWishlist = {
    getWishlist,
    toggleItem,
    isInWishlist,
    updateWishlistUI
  };
})();
