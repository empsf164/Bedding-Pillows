/**
 * NESTORA — LUXURY BEDDING & SLEEP COMFORT
 * Product Comparison Engine (Up to 4 Items)
 */

(function () {
  const COMPARE_STORAGE_KEY = 'nestora_compare_items';
  const MAX_COMPARE = 4;

  function getCompareList() {
    try {
      return JSON.parse(localStorage.getItem(COMPARE_STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveCompareList(items) {
    localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(items));
    updateCompareUI();
  }

  function toggleCompare(productId) {
    let list = getCompareList();
    const index = list.indexOf(productId);
    const product = typeof NESTORA_PRODUCTS !== 'undefined' ? NESTORA_PRODUCTS.find(p => p.id === productId) : null;
    const title = product ? product.name : 'Item';

    if (index > -1) {
      list.splice(index, 1);
      saveCompareList(list);
      if (window.NestoraToast) {
        window.NestoraToast.show({
          title: 'Removed from Comparison',
          message: `${title} was removed.`,
          icon: 'bi-arrow-left-right'
        });
      }
      return false;
    } else {
      if (list.length >= MAX_COMPARE) {
        if (window.NestoraToast) {
          window.NestoraToast.show({
            title: 'Comparison Limit Reached',
            message: `You can compare up to ${MAX_COMPARE} items at a time.`,
            icon: 'bi-exclamation-circle',
            type: 'warning'
          });
        }
        return false;
      }
      list.push(productId);
      saveCompareList(list);
      if (window.NestoraToast) {
        window.NestoraToast.show({
          title: 'Added to Compare',
          message: `${title} added. (${list.length}/${MAX_COMPARE})`,
          icon: 'bi-arrow-left-right'
        });
      }
      return true;
    }
  }

  function removeCompare(productId) {
    let list = getCompareList();
    list = list.filter(id => id !== productId);
    saveCompareList(list);
  }

  function clearCompare() {
    saveCompareList([]);
  }

  function updateCompareUI() {
    const list = getCompareList();
    const badges = document.querySelectorAll('.compare-badge-count');
    badges.forEach(b => {
      b.textContent = list.length;
      b.style.display = list.length > 0 ? '' : 'none';
    });

    // Update floating compare bar
    renderFloatingBar();

    // Render compare page table if on compare.html
    renderComparePage();
  }

  function renderFloatingBar() {
    let bar = document.querySelector('.compare-bar');
    const list = getCompareList();

    if (!bar && list.length > 0) {
      bar = document.createElement('div');
      bar.className = 'compare-bar';
      document.body.appendChild(bar);
    }

    if (!bar) return;

    if (list.length === 0) {
      bar.classList.remove('active');
      return;
    }

    if (typeof NESTORA_PRODUCTS === 'undefined') return;

    const items = NESTORA_PRODUCTS.filter(p => list.includes(p.id));
    bar.innerHTML = `
      <div class="d-flex align-items-center gap-2">
        <span class="fw-semibold small">Compare (${list.length}/${MAX_COMPARE}):</span>
        <div class="compare-bar-items">
          ${items.map(p => `
            <div class="compare-bar-thumb" title="${p.name}">
              <img src="${p.images[0]}" alt="${p.name}">
              <button class="remove-btn" onclick="NestoraCompare.removeCompare('${p.id}')">×</button>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="d-flex align-items-center gap-2 ms-auto">
        <button class="btn btn-sm btn-link text-muted p-0 text-decoration-none" onclick="NestoraCompare.clearCompare()">Clear</button>
        <a href="compare.html" class="btn-nestora btn-nestora-sage btn-nestora-sm">View Table</a>
      </div>
    `;

    bar.classList.add('active');
  }

  function renderComparePage() {
    const container = document.getElementById('compare-table-container');
    const emptyState = document.getElementById('compare-empty-state');
    if (!container) return;

    const list = getCompareList();
    if (list.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (typeof NESTORA_PRODUCTS === 'undefined') return;

    const items = NESTORA_PRODUCTS.filter(p => list.includes(p.id));

    let html = `
      <div class="table-responsive">
        <table class="table table-bordered align-middle nestora-compare-table">
          <thead>
            <tr>
              <th style="min-width: 180px; width: 20%;">Attribute</th>
              ${items.map(p => `
                <th style="min-width: 240px; width: ${80 / items.length}%;">
                  <div class="position-relative text-center pb-2">
                    <button class="btn-close position-absolute top-0 end-0" onclick="NestoraCompare.removeCompare('${p.id}')" aria-label="Remove"></button>
                    <img src="${p.images[0]}" alt="${p.name}" class="rounded mb-2" style="height: 140px; width: 100%; object-fit: cover;">
                    <h5 class="h6 mb-1">${p.name}</h5>
                    <div class="fw-bold text-accent mb-2">$${p.price}</div>
                    <button class="btn-nestora btn-nestora-primary btn-nestora-sm w-100" onclick="NestoraCart.addItem('${p.id}', 1, '${p.sizes[0]}', '${p.colors[0].name}')">
                      Add to Cart
                    </button>
                  </div>
                </th>
              `).join('')}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="fw-bold text-muted small text-uppercase">Category</td>
              ${items.map(p => `<td>${p.categoryName}</td>`).join('')}
            </tr>
            <tr>
              <td class="fw-bold text-muted small text-uppercase">Material</td>
              ${items.map(p => `<td>${p.material}</td>`).join('')}
            </tr>
            <tr>
              <td class="fw-bold text-muted small text-uppercase">Fill / Structure</td>
              ${items.map(p => `<td>${p.fillType}</td>`).join('')}
            </tr>
            <tr>
              <td class="fw-bold text-muted small text-uppercase">Firmness / Feel</td>
              ${items.map(p => `<td>${p.firmness}</td>`).join('')}
            </tr>
            <tr>
              <td class="fw-bold text-muted small text-uppercase">Cooling & Breathability</td>
              ${items.map(p => `<td><span class="badge badge-nestora badge-cooling">${p.cooling}</span></td>`).join('')}
            </tr>
            <tr>
              <td class="fw-bold text-muted small text-uppercase">Size Options</td>
              ${items.map(p => `<td>${p.sizes.join(', ')}</td>`).join('')}
            </tr>
            <tr>
              <td class="fw-bold text-muted small text-uppercase">Care Instructions</td>
              ${items.map(p => `<td class="small">${p.care}</td>`).join('')}
            </tr>
            <tr>
              <td class="fw-bold text-muted small text-uppercase">Craftsmanship Origin</td>
              ${items.map(p => `<td>${p.origin}</td>`).join('')}
            </tr>
            <tr>
              <td class="fw-bold text-muted small text-uppercase">Warranty</td>
              ${items.map(p => `<td>${p.warranty}</td>`).join('')}
            </tr>
            <tr>
              <td class="fw-bold text-muted small text-uppercase">Rating</td>
              ${items.map(p => `<td><span class="text-warning">${p.rating} ★</span> (${p.reviewCount} reviews)</td>`).join('')}
            </tr>
          </tbody>
        </table>
      </div>
    `;

    container.innerHTML = html;
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateCompareUI();

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-compare-id]');
      if (btn) {
        e.preventDefault();
        const id = btn.getAttribute('data-compare-id');
        toggleCompare(id);
      }
    });
  });

  window.NestoraCompare = {
    getCompareList,
    toggleCompare,
    removeCompare,
    clearCompare,
    updateCompareUI
  };
})();
