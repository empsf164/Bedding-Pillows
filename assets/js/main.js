/**
 * NESTORA — LUXURY BEDDING & SLEEP COMFORT
 * Main Global Controller & Initializer
 */

(function () {
  function initHeaderScroll() {
    const header = document.querySelector('.nestora-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-nav-toggle');
    const drawer = document.querySelector('.mobile-menu-drawer');
    const closeBtn = document.querySelector('.btn-close-mobile-menu');

    if (!drawer) return;

    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        drawer.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) {
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    // Mobile Submenu accordions
    document.querySelectorAll('.mobile-nav-link.has-sub').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        item.classList.toggle('active-sub');
        const subMenu = item.nextElementSibling;
        if (subMenu && subMenu.classList.contains('mobile-sub-menu')) {
          subMenu.classList.toggle('show');
        }
      });
    });
  }

  function initNewsletterForms() {
    document.querySelectorAll('.newsletter-form').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        const email = input ? input.value : '';
        if (email && window.NestoraToast) {
          window.NestoraToast.show({
            title: 'Welcome to Nestora Sleep Journal',
            message: 'You will receive our fabric care guides and private collection previews.',
            icon: 'bi-envelope-paper-heart'
          });
          form.reset();
        }
      });
    });
  }

  function initFooterYear() {
    document.querySelectorAll('.current-year').forEach(el => {
      el.textContent = new Date().getFullYear();
    });
  }

  function renderDynamicProductDetails() {
    const detailsContainer = document.getElementById('product-details-content');
    if (!detailsContainer || typeof NESTORA_PRODUCTS === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id') || 'nestora-cloud-linen-sheet-set';
    const product = getProductById(productId) || NESTORA_PRODUCTS[0];

    document.title = `${product.name} — NESTORA Bedding`;

    // Breadcrumb
    const breadcrumbCategory = document.getElementById('pd-breadcrumb-category');
    const breadcrumbName = document.getElementById('pd-breadcrumb-name');
    if (breadcrumbCategory) breadcrumbCategory.textContent = product.categoryName;
    if (breadcrumbName) breadcrumbName.textContent = product.name;

    detailsContainer.innerHTML = `
      <div class="row g-4 g-lg-5">
        <!-- Gallery Left -->
        <div class="col-lg-7">
          <div class="position-sticky" style="top: 100px;">
            <div class="product-gallery-main mb-3 rounded-3 overflow-hidden border shadow-sm position-relative">
              <img id="pd-main-view-image" src="${product.images[0]}" alt="${product.name}" class="w-100" style="aspect-ratio: 1 / 0.95; object-fit: cover;">
              <span class="badge badge-nestora badge-${product.badgeType} position-absolute top-0 start-0 m-3">${product.badge}</span>
            </div>
            <div class="d-flex gap-2 gap-md-3 overflow-auto pb-2" id="pd-thumbnails-list">
              ${product.images.map((img, idx) => `
                <img src="${img}" alt="${product.name} angle ${idx + 1}" class="rounded-2 border pd-thumb-img ${idx === 0 ? 'border-dark border-2' : ''}" style="width: 84px; height: 84px; object-fit: cover; cursor: pointer;" onclick="document.getElementById('pd-main-view-image').src='${img}'; document.querySelectorAll('.pd-thumb-img').forEach(t=>t.classList.remove('border-dark', 'border-2')); this.classList.add('border-dark', 'border-2');">
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Details Right -->
        <div class="col-lg-5">
          <div class="ps-lg-3">
            <span class="eyebrow">${product.categoryName} · ${product.collectionName}</span>
            <h1 class="h2 mb-2">${product.name}</h1>
            
            <div class="d-flex align-items-center gap-2 mb-3">
              <span class="stars text-warning">${getRatingStars(product.rating)}</span>
              <span class="fw-semibold small">${product.rating}</span>
              <span class="text-muted small">(${product.reviewCount} customer reviews)</span>
            </div>

            <div class="d-flex align-items-baseline gap-3 mb-4">
              <span class="h3 fw-bold mb-0">$${product.price}</span>
              ${product.originalPrice ? `<span class="text-muted fs-5 text-decoration-line-through">$${product.originalPrice}</span>` : ''}
              <span class="badge bg-success bg-opacity-10 text-success small">In Stock & Ready to Ship</span>
            </div>

            <p class="text-secondary mb-4">${product.description}</p>

            <!-- Color Swatches -->
            <div class="mb-4">
              <label class="form-label-nestora mb-2">Color: <span class="fw-normal text-muted" id="pd-selected-color-name">${product.colors[0]?.name}</span></label>
              <div class="d-flex gap-2">
                ${product.colors.map((c, i) => `
                  <button type="button" class="btn p-0 rounded-circle border pd-color-option ${i === 0 ? 'ring-2 border-dark shadow-sm' : ''}" style="width: 32px; height: 32px; background-color: ${c.code};" title="${c.name}" onclick="document.getElementById('pd-selected-color-name').textContent='${c.name}'; document.querySelectorAll('.pd-color-option').forEach(b=>b.classList.remove('ring-2', 'border-dark', 'shadow-sm')); this.classList.add('ring-2', 'border-dark', 'shadow-sm');"></button>
                `).join('')}
              </div>
            </div>

            <!-- Size Selector -->
            <div class="mb-4">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <label class="form-label-nestora mb-0">Size Options</label>
                <a href="#pd-dimensions" class="small text-muted text-decoration-underline">Size Guide</a>
              </div>
              <div class="d-flex flex-wrap gap-2" id="pd-size-group">
                ${product.sizes.map((s, i) => `
                  <button type="button" class="btn btn-outline-secondary btn-sm pd-size-option ${i === 0 ? 'active' : ''}" onclick="document.querySelectorAll('.pd-size-option').forEach(b=>b.classList.remove('active')); this.classList.add('active');">${s}</button>
                `).join('')}
              </div>
            </div>

            <!-- Quantity & Purchase Controls -->
            <div class="d-flex gap-3 mb-4">
              <div class="cart-qty-stepper p-1">
                <button type="button" onclick="const q = document.getElementById('pd-qty-val'); q.textContent = Math.max(1, parseInt(q.textContent)-1);">−</button>
                <span id="pd-qty-val">1</span>
                <button type="button" onclick="const q = document.getElementById('pd-qty-val'); q.textContent = parseInt(q.textContent)+1;">+</button>
              </div>
              <button type="button" class="btn-nestora btn-nestora-primary flex-grow-1" onclick="
                const qty = parseInt(document.getElementById('pd-qty-val').textContent);
                const size = document.querySelector('.pd-size-option.active')?.textContent || '${product.sizes[0]}';
                const color = document.getElementById('pd-selected-color-name')?.textContent || '${product.colors[0]?.name}';
                NestoraCart.addItem('${product.id}', qty, size, color);
              ">
                <i class="bi bi-bag-plus me-1"></i> Add to Bedding Bag
              </button>
              <button type="button" class="btn-nestora btn-nestora-icon btn-nestora-secondary" data-wishlist-id="${product.id}" aria-label="Save to Wishlist">
                <i class="bi bi-heart"></i>
              </button>
            </div>

            <!-- Core Product Highlights -->
            <div class="card border rounded-3 p-3 bg-light bg-opacity-50 mb-4">
              <div class="row g-2 text-start small">
                <div class="col-6"><i class="bi bi-feather text-sage me-2"></i><strong>Material:</strong> ${product.material}</div>
                <div class="col-6"><i class="bi bi-wind text-sage me-2"></i><strong>Cooling:</strong> ${product.cooling}</div>
                <div class="col-6"><i class="bi bi-shield-check text-sage me-2"></i><strong>Warranty:</strong> ${product.warranty}</div>
                <div class="col-6"><i class="bi bi-geo-alt text-sage me-2"></i><strong>Origin:</strong> ${product.origin}</div>
              </div>
            </div>

            <!-- Accordion Details -->
            <div class="accordion accordion-flush border-top" id="productDetailsAccordion">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#acc-desc">
                    Materials & Sustainable Craftsmanship
                  </button>
                </h2>
                <div id="acc-desc" class="accordion-collapse collapse" data-bs-parent="#productDetailsAccordion">
                  <div class="accordion-body text-secondary small">
                    Every thread is sourced with radical transparency. Our fabrics adhere to OEKO-TEX® Standard 100 and GOTS certification, guaranteeing zero harsh chemical finishes or irritants.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#acc-care">
                    Care & Laundering Rituals
                  </button>
                </h2>
                <div id="acc-care" class="accordion-collapse collapse" data-bs-parent="#productDetailsAccordion">
                  <div class="accordion-body text-secondary small">
                    ${product.care}
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#acc-shipping">
                    Complimentary Shipping & 100-Night Sleep Trial
                  </button>
                </h2>
                <div id="acc-shipping" class="accordion-collapse collapse" data-bs-parent="#productDetailsAccordion">
                  <div class="accordion-body text-secondary small">
                    Rest easy with our 100-Night risk-free in-home comfort trial. Free standard shipping and easy hassle-free returns on all bedding sets.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;

    // Render Related Products
    const relatedContainer = document.getElementById('pd-related-products-grid');
    if (relatedContainer) {
      const related = NESTORA_PRODUCTS.filter(p => p.id !== product.id && (p.category === product.category || p.collection === product.collection)).slice(0, 4);
      relatedContainer.innerHTML = related.map(p => `
        <div class="col-6 col-md-3 mb-4">
          <div class="product-card">
            <div class="product-card-media">
              <img src="${p.images[0]}" alt="${p.name}" class="primary-img" loading="lazy">
              <div class="product-card-actions">
                <button class="card-action-btn" data-wishlist-id="${p.id}"><i class="bi bi-heart"></i></button>
              </div>
            </div>
            <div class="product-card-body">
              <span class="product-card-category">${p.categoryName}</span>
              <h4 class="product-card-title"><a href="product-details.html?id=${p.id}">${p.name}</a></h4>
              <div class="product-card-footer">
                <div class="product-card-price"><span class="current">$${p.price}</span></div>
                <button class="btn-nestora btn-nestora-primary btn-nestora-sm" onclick="NestoraCart.addItem('${p.id}', 1, '${p.sizes[0]}', '${p.colors[0]?.name}')">Add</button>
              </div>
            </div>
          </div>
        </div>
      `).join('');
    }

    if (window.NestoraWishlist) window.NestoraWishlist.updateWishlistUI();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileMenu();
    initNewsletterForms();
    initFooterYear();
    renderDynamicProductDetails();
  });
})();
