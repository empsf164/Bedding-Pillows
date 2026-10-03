/**
 * NESTORA — LUXURY BEDDING & SLEEP COMFORT
 * Quick View Modal Component
 */

(function () {
  let modalInstance = null;

  function ensureModal() {
    let backdrop = document.querySelector('.quick-view-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'nestora-modal-backdrop quick-view-backdrop';
      backdrop.innerHTML = `
        <div class="nestora-modal-dialog">
          <button type="button" class="modal-close-btn btn-close-quickview" aria-label="Close modal">
            <i class="bi bi-x-lg"></i>
          </button>
          <div class="p-4 p-md-5" id="quick-view-dialog-content">
            <!-- Dynamic Content -->
          </div>
        </div>
      `;
      document.body.appendChild(backdrop);

      backdrop.querySelector('.btn-close-quickview').addEventListener('click', closeQuickView);
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeQuickView();
      });
    }
    return backdrop;
  }

  function openQuickView(productId) {
    const product = typeof NESTORA_PRODUCTS !== 'undefined' ? NESTORA_PRODUCTS.find(p => p.id === productId) : null;
    if (!product) return;

    const backdrop = ensureModal();
    const content = document.getElementById('quick-view-dialog-content');

    let selectedSize = product.sizes[0];
    let selectedColor = product.colors && product.colors[0] ? product.colors[0].name : 'Natural';

    content.innerHTML = `
      <div class="row g-4 align-items-center">
        <div class="col-md-6">
          <div class="position-relative rounded overflow-hidden mb-3">
            <img id="qv-main-image" src="${product.images[0]}" alt="${product.name}" class="w-100 rounded" style="aspect-ratio: 1/1; object-fit: cover;">
          </div>
          <div class="d-flex gap-2">
            ${product.images.map((img, i) => `
              <img src="${img}" alt="${product.name}" class="rounded cursor-pointer qv-thumb ${i === 0 ? 'border border-2 border-dark' : ''}" style="width: 60px; height: 60px; object-fit: cover; cursor: pointer;" onclick="document.getElementById('qv-main-image').src='${img}'; document.querySelectorAll('.qv-thumb').forEach(t=>t.classList.remove('border','border-2','border-dark')); this.classList.add('border','border-2','border-dark');">
            `).join('')}
          </div>
        </div>
        <div class="col-md-6">
          <span class="eyebrow">${product.categoryName}</span>
          <h3 class="mb-2">${product.name}</h3>
          <div class="d-flex align-items-center gap-2 mb-3">
            <span class="stars text-warning">${getRatingStars(product.rating)}</span>
            <span class="small text-muted">(${product.reviewCount} reviews)</span>
          </div>
          <div class="h4 fw-bold mb-3">$${product.price} ${product.originalPrice ? `<span class="text-muted text-decoration-line-through fs-6 ms-2">$${product.originalPrice}</span>` : ''}</div>
          <p class="text-muted small mb-4">${product.description}</p>
          
          <!-- Colors -->
          <div class="mb-3">
            <label class="form-label-nestora mb-2">Color: <strong id="qv-selected-color">${selectedColor}</strong></label>
            <div class="d-flex gap-2">
              ${product.colors.map((c, i) => `
                <button type="button" class="btn p-0 rounded-circle border ${i === 0 ? 'ring-2 ring-sage shadow-sm' : ''} qv-color-btn" style="width: 28px; height: 28px; background-color: ${c.code};" title="${c.name}" onclick="document.getElementById('qv-selected-color').innerText='${c.name}'; document.querySelectorAll('.qv-color-btn').forEach(b=>b.style.transform=''); this.style.transform='scale(1.2)';"></button>
              `).join('')}
            </div>
          </div>

          <!-- Sizes -->
          <div class="mb-4">
            <label class="form-label-nestora mb-2">Size</label>
            <div class="d-flex flex-wrap gap-2" id="qv-size-buttons">
              ${product.sizes.map((s, i) => `
                <button type="button" class="btn btn-sm btn-outline-secondary ${i === 0 ? 'active' : ''} qv-size-btn" onclick="document.querySelectorAll('.qv-size-btn').forEach(b=>b.classList.remove('active')); this.classList.add('active');">${s}</button>
              `).join('')}
            </div>
          </div>

          <!-- Actions -->
          <div class="d-flex gap-3">
            <button class="btn-nestora btn-nestora-primary flex-grow-1" onclick="
              const activeSize = document.querySelector('.qv-size-btn.active')?.innerText || '${product.sizes[0]}';
              const activeColor = document.getElementById('qv-selected-color')?.innerText || '${product.colors[0]?.name}';
              NestoraCart.addItem('${product.id}', 1, activeSize, activeColor);
              NestoraQuickView.closeQuickView();
            ">
              <i class="bi bi-bag-plus me-1"></i> Add to Bag
            </button>
            <a href="product-details.html?id=${product.id}" class="btn-nestora btn-nestora-secondary">Full Details</a>
          </div>
        </div>
      </div>
    `;

    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeQuickView() {
    const backdrop = document.querySelector('.quick-view-backdrop');
    if (backdrop) {
      backdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-quickview-id]');
      if (btn) {
        e.preventDefault();
        const id = btn.getAttribute('data-quickview-id');
        openQuickView(id);
      }
    });
  });

  window.NestoraQuickView = {
    openQuickView,
    closeQuickView
  };
})();
