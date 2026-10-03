/**
 * NESTORA — LUXURY BEDDING & SLEEP COMFORT
 * Product Filtering & Sorting Engine (Shop & Category Pages)
 */

(function () {
  let activeFilters = {
    category: 'all',
    collection: 'all',
    material: 'all',
    size: 'all',
    firmness: 'all',
    maxPrice: 350,
    search: '',
    sort: 'featured'
  };

  function initFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('category')) activeFilters.category = params.get('category').toLowerCase();
    if (params.get('collection')) activeFilters.collection = params.get('collection').toLowerCase();
    if (params.get('material')) activeFilters.material = params.get('material').toLowerCase();
    if (params.get('search')) activeFilters.search = params.get('search').toLowerCase();
    if (params.get('sort')) activeFilters.sort = params.get('sort');

    syncFormInputs();
    renderFilteredProducts();
  }

  function syncFormInputs() {
    // Sync Category Checkboxes / Radios
    document.querySelectorAll('[data-filter-category]').forEach(input => {
      const cat = input.getAttribute('data-filter-category');
      input.checked = (cat === activeFilters.category);
    });

    // Sync Price Slider
    const priceSlider = document.getElementById('filter-price-slider');
    const priceDisplay = document.getElementById('filter-price-display');
    if (priceSlider && priceDisplay) {
      priceSlider.value = activeFilters.maxPrice;
      priceDisplay.textContent = `$${activeFilters.maxPrice}`;
    }

    // Sync Sort Dropdown
    const sortSelect = document.getElementById('shop-sort-select');
    if (sortSelect) {
      sortSelect.value = activeFilters.sort;
    }
  }

  function applyFilter(key, value) {
    activeFilters[key] = value;
    renderFilteredProducts();
  }

  function resetFilters() {
    activeFilters = {
      category: 'all',
      collection: 'all',
      material: 'all',
      size: 'all',
      firmness: 'all',
      maxPrice: 350,
      search: '',
      sort: 'featured'
    };
    syncFormInputs();
    renderFilteredProducts();
  }

  function renderFilteredProducts() {
    const gridContainer = document.getElementById('shop-products-grid');
    const countEl = document.getElementById('shop-product-count');
    const activeFiltersContainer = document.getElementById('shop-active-filter-chips');

    if (!gridContainer || typeof NESTORA_PRODUCTS === 'undefined') return;

    let items = [...NESTORA_PRODUCTS];

    // Filter Category
    if (activeFilters.category !== 'all') {
      items = items.filter(p => p.category.toLowerCase() === activeFilters.category.toLowerCase() || (activeFilters.category === 'bedding' && ['sheets', 'duvet', 'comforters', 'quilts', 'blankets'].includes(p.category)));
    }

    // Filter Collection
    if (activeFilters.collection !== 'all') {
      items = items.filter(p => p.collection.toLowerCase() === activeFilters.collection.toLowerCase());
    }

    // Filter Material
    if (activeFilters.material !== 'all') {
      items = items.filter(p => p.material.toLowerCase().includes(activeFilters.material.toLowerCase()));
    }

    // Filter Size
    if (activeFilters.size !== 'all') {
      items = items.filter(p => p.sizes.some(s => s.toLowerCase().includes(activeFilters.size.toLowerCase())));
    }

    // Filter Firmness
    if (activeFilters.firmness !== 'all') {
      items = items.filter(p => p.firmness.toLowerCase().includes(activeFilters.firmness.toLowerCase()));
    }

    // Filter Max Price
    if (activeFilters.maxPrice) {
      items = items.filter(p => p.price <= activeFilters.maxPrice);
    }

    // Filter Search
    if (activeFilters.search) {
      items = items.filter(p => p.name.toLowerCase().includes(activeFilters.search) || p.description.toLowerCase().includes(activeFilters.search));
    }

    // Sort
    if (activeFilters.sort === 'price-low') {
      items.sort((a, b) => a.price - b.price);
    } else if (activeFilters.sort === 'price-high') {
      items.sort((a, b) => b.price - a.price);
    } else if (activeFilters.sort === 'rating') {
      items.sort((a, b) => b.rating - a.rating);
    } else if (activeFilters.sort === 'newest') {
      items.sort((a, b) => (b.badgeType === 'new' ? 1 : 0) - (a.badgeType === 'new' ? 1 : 0));
    } else if (activeFilters.sort === 'bestsellers') {
      items.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    // Update Counter
    if (countEl) {
      countEl.textContent = `Showing ${items.length} product${items.length === 1 ? '' : 's'}`;
    }

    // Update Active Filter Pills
    if (activeFiltersContainer) {
      let pillsHtml = '';
      if (activeFilters.category !== 'all') {
        pillsHtml += `<span class="badge bg-secondary p-2 me-2 mb-2">Category: ${activeFilters.category} <button type="button" class="btn-close btn-close-white btn-sm ms-1" onclick="NestoraFilters.applyFilter('category', 'all')"></button></span>`;
      }
      if (activeFilters.collection !== 'all') {
        pillsHtml += `<span class="badge bg-secondary p-2 me-2 mb-2">Collection: ${activeFilters.collection} <button type="button" class="btn-close btn-close-white btn-sm ms-1" onclick="NestoraFilters.applyFilter('collection', 'all')"></button></span>`;
      }
      if (activeFilters.material !== 'all') {
        pillsHtml += `<span class="badge bg-secondary p-2 me-2 mb-2">Material: ${activeFilters.material} <button type="button" class="btn-close btn-close-white btn-sm ms-1" onclick="NestoraFilters.applyFilter('material', 'all')"></button></span>`;
      }
      if (activeFilters.maxPrice < 350) {
        pillsHtml += `<span class="badge bg-secondary p-2 me-2 mb-2">Under $${activeFilters.maxPrice} <button type="button" class="btn-close btn-close-white btn-sm ms-1" onclick="NestoraFilters.applyFilter('maxPrice', 350)"></button></span>`;
      }
      if (pillsHtml) {
        pillsHtml += `<button class="btn btn-sm btn-link text-muted" onclick="NestoraFilters.resetFilters()">Clear All</button>`;
      }
      activeFiltersContainer.innerHTML = pillsHtml;
    }

    // Render Grid
    if (items.length === 0) {
      gridContainer.innerHTML = `
        <div class="col-12 text-center py-5">
          <i class="bi bi-funnel text-muted" style="font-size: 3rem;"></i>
          <h4 class="mt-3">No Products Match Your Filters</h4>
          <p class="text-muted">Try clearing selected filters or resetting price range.</p>
          <button class="btn-nestora btn-nestora-primary btn-nestora-sm mt-2" onclick="NestoraFilters.resetFilters()">Reset All Filters</button>
        </div>
      `;
      return;
    }

    gridContainer.innerHTML = items.map(p => `
      <div class="col-12 col-sm-6 col-lg-4 mb-4">
        <div class="product-card">
          <div class="product-card-media">
            <img src="${p.images[0]}" alt="${p.name}" class="primary-img" loading="lazy">
            ${p.images[1] ? `<img src="${p.images[1]}" alt="${p.name} alternate view" class="hover-img" loading="lazy">` : ''}
            
            <div class="product-card-badges">
              ${p.badge ? `<span class="badge-nestora badge-${p.badgeType}">${p.badge}</span>` : ''}
            </div>

            <div class="product-card-actions">
              <button class="card-action-btn" data-wishlist-id="${p.id}" aria-label="Add to Wishlist">
                <i class="bi bi-heart"></i>
              </button>
              <button class="card-action-btn" data-compare-id="${p.id}" aria-label="Compare Product">
                <i class="bi bi-arrow-left-right"></i>
              </button>
              <button class="card-action-btn" data-quickview-id="${p.id}" aria-label="Quick View">
                <i class="bi bi-eye"></i>
              </button>
            </div>

            <div class="product-card-quickadd">
              <button class="btn-nestora btn-nestora-primary btn-nestora-sm w-100 shadow" onclick="NestoraCart.addItem('${p.id}', 1, '${p.sizes[0]}', '${p.colors[0]?.name}')">
                <i class="bi bi-bag-plus me-1"></i> Quick Add ($${p.price})
              </button>
            </div>
          </div>

          <div class="product-card-body">
            <span class="product-card-category">${p.categoryName}</span>
            <h4 class="product-card-title">
              <a href="product-details.html?id=${p.id}">${p.name}</a>
            </h4>
            <div class="product-card-desc">${p.shortDesc}</div>
            
            <div class="product-card-rating">
              <span class="stars">${getRatingStars(p.rating)}</span>
              <span>(${p.reviewCount})</span>
            </div>

            <div class="product-card-footer">
              <div class="product-card-price">
                <span class="current">$${p.price}</span>
                ${p.originalPrice ? `<span class="original">$${p.originalPrice}</span>` : ''}
              </div>
              <div class="swatch-group">
                ${p.colors.slice(0, 4).map(c => `<span class="swatch-dot" style="background-color: ${c.code};" title="${c.name}"></span>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Re-sync wishlist heart buttons
    if (window.NestoraWishlist) {
      window.NestoraWishlist.updateWishlistUI();
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initFromURL();

    // Price Slider Listener
    const priceSlider = document.getElementById('filter-price-slider');
    const priceDisplay = document.getElementById('filter-price-display');
    if (priceSlider && priceDisplay) {
      priceSlider.addEventListener('input', (e) => {
        priceDisplay.textContent = `$${e.target.value}`;
      });
      priceSlider.addEventListener('change', (e) => {
        applyFilter('maxPrice', parseInt(e.target.value, 10));
      });
    }

    // Sort Dropdown Listener
    const sortSelect = document.getElementById('shop-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        applyFilter('sort', e.target.value);
      });
    }

    // Category / Collection Radio or Checkbox listeners
    document.querySelectorAll('[data-filter-category]').forEach(input => {
      input.addEventListener('change', (e) => {
        if (e.target.checked) applyFilter('category', e.target.getAttribute('data-filter-category'));
      });
    });

    document.querySelectorAll('[data-filter-collection]').forEach(input => {
      input.addEventListener('change', (e) => {
        if (e.target.checked) applyFilter('collection', e.target.getAttribute('data-filter-collection'));
      });
    });

    document.querySelectorAll('[data-filter-material]').forEach(input => {
      input.addEventListener('change', (e) => {
        if (e.target.checked) applyFilter('material', e.target.getAttribute('data-filter-material'));
      });
    });

    document.querySelectorAll('[data-filter-firmness]').forEach(input => {
      input.addEventListener('change', (e) => {
        if (e.target.checked) applyFilter('firmness', e.target.getAttribute('data-filter-firmness'));
      });
    });
  });

  window.NestoraFilters = {
    applyFilter,
    resetFilters,
    renderFilteredProducts
  };
})();
