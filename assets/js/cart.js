/**
 * NESTORA — LUXURY BEDDING & SLEEP COMFORT
 * Shopping Cart Engine (Mini-Cart Drawer & Cart Page)
 */

(function () {
  const CART_STORAGE_KEY = 'nestora_cart_items';
  const PROMO_STORAGE_KEY = 'nestora_active_promo';
  const FREE_SHIPPING_THRESHOLD = 150;

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartUI();
  }

  function getPromo() {
    try {
      return JSON.parse(localStorage.getItem(PROMO_STORAGE_KEY)) || null;
    } catch (e) {
      return null;
    }
  }

  function savePromo(promo) {
    localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(promo));
    updateCartUI();
  }

  function addItem(productId, quantity = 1, size = null, color = null) {
    const product = typeof NESTORA_PRODUCTS !== 'undefined' ? NESTORA_PRODUCTS.find(p => p.id === productId) : null;
    if (!product) return;

    const chosenSize = size || product.sizes[0] || 'Standard';
    const chosenColor = color || (product.colors && product.colors[0] ? product.colors[0].name : 'Natural');

    let cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === productId && item.size === chosenSize && item.color === chosenColor);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += parseInt(quantity, 10);
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        slug: product.slug,
        categoryName: product.categoryName,
        price: product.price,
        image: product.images[0],
        size: chosenSize,
        color: chosenColor,
        quantity: parseInt(quantity, 10)
      });
    }

    saveCart(cart);

    if (window.NestoraToast) {
      window.NestoraToast.show({
        title: 'Added to Bedding Bag',
        message: `${quantity} × ${product.name} (${chosenSize}) added.`,
        icon: 'bi-bag-check-fill'
      });
    }

    openCartDrawer();
  }

  function updateQuantity(index, newQty) {
    let cart = getCart();
    if (cart[index]) {
      const qty = parseInt(newQty, 10);
      if (qty <= 0) {
        removeItem(index);
      } else {
        cart[index].quantity = qty;
        saveCart(cart);
      }
    }
  }

  function removeItem(index) {
    let cart = getCart();
    if (cart[index]) {
      const removed = cart.splice(index, 1)[0];
      saveCart(cart);
      if (window.NestoraToast) {
        window.NestoraToast.show({
          title: 'Item Removed',
          message: `${removed.name} removed from your bag.`,
          icon: 'bi-trash'
        });
      }
    }
  }

  function applyPromoCode(code) {
    const cleanCode = (code || '').trim().toUpperCase();
    if (cleanCode === 'COMFORT15') {
      const promo = { code: 'COMFORT15', discountType: 'percent', value: 15, label: '15% Off Sleep Essentials' };
      savePromo(promo);
      if (window.NestoraToast) {
        window.NestoraToast.show({
          title: 'Promo Applied!',
          message: '15% discount has been applied to your order.',
          icon: 'bi-tag-fill'
        });
      }
      return true;
    } else if (cleanCode === 'SLEEP20') {
      const promo = { code: 'SLEEP20', discountType: 'fixed', value: 20, label: '$20 Off Welcome Bonus' };
      savePromo(promo);
      if (window.NestoraToast) {
        window.NestoraToast.show({
          title: 'Promo Applied!',
          message: '$20 discount applied.',
          icon: 'bi-tag-fill'
        });
      }
      return true;
    } else {
      if (window.NestoraToast) {
        window.NestoraToast.show({
          title: 'Invalid Promo Code',
          message: 'Try code COMFORT15 for 15% off.',
          icon: 'bi-exclamation-triangle',
          type: 'warning'
        });
      }
      return false;
    }
  }

  function removePromoCode() {
    localStorage.removeItem(PROMO_STORAGE_KEY);
    updateCartUI();
  }

  function calculateTotals() {
    const cart = getCart();
    const promo = getPromo();

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let discount = 0;

    if (promo) {
      if (promo.discountType === 'percent') {
        discount = Math.round((subtotal * promo.value) / 100);
      } else if (promo.discountType === 'fixed') {
        discount = Math.min(promo.value, subtotal);
      }
    }

    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 15;
    const taxableAmount = Math.max(0, subtotal - discount);
    const tax = Math.round(taxableAmount * 0.08); // 8% estimated tax
    const total = taxableAmount + shipping + tax;

    return {
      subtotal,
      discount,
      shipping,
      tax,
      total,
      itemCount: cart.reduce((sum, item) => sum + item.quantity, 0),
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      freeShippingRemaining: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
      freeShippingProgress: Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100))
    };
  }

  function openCartDrawer() {
    let backdrop = document.querySelector('.cart-drawer-backdrop');
    if (backdrop) {
      backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCartDrawer() {
    let backdrop = document.querySelector('.cart-drawer-backdrop');
    if (backdrop) {
      backdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  function updateCartUI() {
    const cart = getCart();
    const totals = calculateTotals();

    // Update all badge counts
    document.querySelectorAll('.cart-badge-count').forEach(b => {
      b.textContent = totals.itemCount;
      b.style.display = totals.itemCount > 0 ? '' : 'none';
    });

    // Update Drawer Elements
    renderDrawerItems(cart, totals);

    // Update Cart Page if active
    renderCartPage(cart, totals);
  }

  function renderDrawerItems(cart, totals) {
    const body = document.getElementById('cart-drawer-items');
    const footer = document.getElementById('cart-drawer-footer-wrapper');
    const shippingBar = document.getElementById('cart-drawer-shipping-bar');

    if (!body) return;

    if (shippingBar) {
      if (totals.subtotal >= totals.freeShippingThreshold) {
        shippingBar.innerHTML = `
          <div class="text-success fw-semibold"><i class="bi bi-check-circle-fill me-1"></i> You unlocked <strong>FREE Insured Shipping!</strong></div>
          <div class="shipping-progress"><div class="shipping-progress-fill" style="width: 100%;"></div></div>
        `;
      } else {
        shippingBar.innerHTML = `
          <div>Add <strong>$${totals.freeShippingRemaining}</strong> more for <strong>FREE Shipping</strong></div>
          <div class="shipping-progress"><div class="shipping-progress-fill" style="width: ${totals.freeShippingProgress}%;"></div></div>
        `;
      }
    }

    if (cart.length === 0) {
      body.innerHTML = `
        <div class="text-center py-5">
          <i class="bi bi-bag-x text-muted" style="font-size: 3rem;"></i>
          <h5 class="mt-3">Your Bedding Bag is Empty</h5>
          <p class="text-muted small">Discover our cloud-like linen sheets & down pillows.</p>
          <a href="shop.html" class="btn-nestora btn-nestora-primary btn-nestora-sm mt-2" onclick="NestoraCart.closeCartDrawer()">Start Shopping</a>
        </div>
      `;
      if (footer) footer.style.display = 'none';
      return;
    }

    if (footer) footer.style.display = 'block';

    body.innerHTML = cart.map((item, index) => `
      <div class="cart-item-row">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <h5 class="cart-item-title"><a href="product-details.html?id=${item.id}">${item.name}</a></h5>
          <div class="cart-item-meta">${item.size} · ${item.color}</div>
          <div class="d-flex align-items-center justify-content-between">
            <div class="cart-qty-stepper">
              <button onclick="NestoraCart.updateQuantity(${index}, ${item.quantity - 1})" aria-label="Decrease">−</button>
              <span>${item.quantity}</span>
              <button onclick="NestoraCart.updateQuantity(${index}, ${item.quantity + 1})" aria-label="Increase">+</button>
            </div>
            <div class="fw-bold">$${item.price * item.quantity}</div>
          </div>
        </div>
        <button class="btn btn-sm btn-link text-muted p-0 ms-1 align-self-start" onclick="NestoraCart.removeItem(${index})" title="Remove item">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    `).join('');

    const subtotalEl = document.getElementById('cart-drawer-subtotal');
    if (subtotalEl) {
      subtotalEl.textContent = `$${totals.subtotal}`;
    }
  }

  function renderCartPage(cart, totals) {
    const tableBody = document.getElementById('cart-page-items');
    const emptyState = document.getElementById('cart-page-empty-state');
    const mainContent = document.getElementById('cart-page-main-content');
    const promo = getPromo();

    if (!tableBody) return;

    if (cart.length === 0) {
      if (emptyState) emptyState.style.display = 'block';
      if (mainContent) mainContent.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (mainContent) mainContent.style.display = 'block';

    tableBody.innerHTML = cart.map((item, index) => `
      <tr>
        <td>
          <div class="d-flex align-items-center gap-3">
            <img src="${item.image}" alt="${item.name}" class="rounded" style="width: 72px; height: 72px; object-fit: cover;">
            <div>
              <h5 class="h6 mb-1"><a href="product-details.html?id=${item.id}">${item.name}</a></h5>
              <div class="small text-muted">${item.size} · ${item.color}</div>
              <button class="btn btn-sm btn-link text-danger p-0 mt-1 text-decoration-none" onclick="NestoraCart.removeItem(${index})">
                <i class="bi bi-trash me-1"></i> Remove
              </button>
            </div>
          </div>
        </td>
        <td class="align-middle">$${item.price}</td>
        <td class="align-middle">
          <div class="cart-qty-stepper">
            <button onclick="NestoraCart.updateQuantity(${index}, ${item.quantity - 1})">−</button>
            <span>${item.quantity}</span>
            <button onclick="NestoraCart.updateQuantity(${index}, ${item.quantity + 1})">+</button>
          </div>
        </td>
        <td class="align-middle fw-bold text-end">$${item.price * item.quantity}</td>
      </tr>
    `).join('');

    // Update Summary Elements on Cart Page
    const subtotalEl = document.getElementById('cart-page-subtotal');
    const shippingEl = document.getElementById('cart-page-shipping');
    const discountEl = document.getElementById('cart-page-discount');
    const discountRow = document.getElementById('cart-page-discount-row');
    const taxEl = document.getElementById('cart-page-tax');
    const totalEl = document.getElementById('cart-page-total');

    if (subtotalEl) subtotalEl.textContent = `$${totals.subtotal}`;
    if (shippingEl) shippingEl.textContent = totals.shipping === 0 ? 'FREE' : `$${totals.shipping}`;
    if (taxEl) taxEl.textContent = `$${totals.tax}`;
    if (totalEl) totalEl.textContent = `$${totals.total}`;

    if (discountRow && discountEl) {
      if (totals.discount > 0 && promo) {
        discountRow.style.display = '';
        discountEl.textContent = `-$${totals.discount} (${promo.code})`;
      } else {
        discountRow.style.display = 'none';
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();

    // Drawer Toggles
    document.querySelectorAll('.btn-cart-drawer-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openCartDrawer();
      });
    });

    const closeBtn = document.querySelector('.btn-close-cart-drawer');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeCartDrawer);
    }

    const backdrop = document.querySelector('.cart-drawer-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeCartDrawer();
      });
    }

    // Handle Promo Code Form
    const promoForm = document.getElementById('cart-promo-form');
    if (promoForm) {
      promoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('cart-promo-input');
        if (input) applyPromoCode(input.value);
      });
    }
  });

  window.NestoraCart = {
    getCart,
    addItem,
    updateQuantity,
    removeItem,
    applyPromoCode,
    removePromoCode,
    calculateTotals,
    openCartDrawer,
    closeCartDrawer,
    updateCartUI
  };
})();
