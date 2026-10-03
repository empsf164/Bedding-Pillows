/**
 * NESTORA — LUXURY BEDDING & SLEEP COMFORT
 * Global Search Overlay Engine
 */

(function () {
  let searchOverlay = null;

  function ensureSearchOverlay() {
    searchOverlay = document.getElementById('nestora-search-overlay');
    return searchOverlay;
  }

  function openSearch() {
    const overlay = ensureSearchOverlay();
    if (overlay) {
      overlay.classList.add('active');
      const input = overlay.querySelector('.search-input');
      if (input) {
        setTimeout(() => input.focus(), 100);
      }
      document.body.style.overflow = 'hidden';
    }
  }

  function closeSearch() {
    const overlay = ensureSearchOverlay();
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function performSearch(query) {
    const cleanQuery = (query || '').trim().toLowerCase();
    const resultsGrid = document.getElementById('search-results-output');
    const defaultView = document.getElementById('search-default-suggestions');

    if (!resultsGrid) return;

    if (!cleanQuery) {
      resultsGrid.innerHTML = '';
      if (defaultView) defaultView.style.display = 'block';
      return;
    }

    if (defaultView) defaultView.style.display = 'none';

    if (typeof NESTORA_PRODUCTS === 'undefined') return;

    const matches = NESTORA_PRODUCTS.filter(p => {
      return p.name.toLowerCase().includes(cleanQuery) ||
        p.categoryName.toLowerCase().includes(cleanQuery) ||
        p.description.toLowerCase().includes(cleanQuery) ||
        p.material.toLowerCase().includes(cleanQuery) ||
        p.collectionName.toLowerCase().includes(cleanQuery);
    });

    if (matches.length === 0) {
      resultsGrid.innerHTML = `
        <div class="col-12 text-center py-4">
          <p class="text-muted">No bedding or pillow matches found for "<strong>${escapeHtml(query)}</strong>".</p>
          <p class="small text-muted">Try searching for "linen sheets", "cooling pillow", "hotel duvet", or "organic cotton".</p>
        </div>
      `;
      return;
    }

    resultsGrid.innerHTML = matches.map(p => `
      <div class="col-12 col-sm-6">
        <a href="product-details.html?id=${p.id}" class="search-result-item text-decoration-none">
          <img src="${p.images[0]}" alt="${p.name}">
          <div class="search-result-info">
            <span class="text-uppercase text-muted" style="font-size: 0.68rem; letter-spacing: 0.05em;">${p.categoryName}</span>
            <h5 class="text-truncate">${p.name}</h5>
            <div class="price">$${p.price}</div>
          </div>
        </a>
      </div>
    `).join('');
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Search Open Triggers
    document.querySelectorAll('.btn-search-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openSearch();
      });
    });

    // Search Close Triggers
    document.querySelectorAll('.btn-close-search').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeSearch();
      });
    });

    const overlay = document.getElementById('nestora-search-overlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeSearch();
      });
    }

    // Live search input handler with debounce
    const searchInput = document.getElementById('search-input-field');
    if (searchInput) {
      let debounceTimer = null;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          performSearch(e.target.value);
        }, 200);
      });

      // Allow pressing ESC to close search
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
          closeSearch();
        }
      });
    }

    // Quick tag chips in search overlay
    document.querySelectorAll('.search-tag-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.getAttribute('data-tag') || chip.innerText;
        if (searchInput) {
          searchInput.value = text;
          performSearch(text);
        }
      });
    });
  });

  window.NestoraSearch = {
    openSearch,
    closeSearch,
    performSearch
  };
})();
