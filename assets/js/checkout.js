/**
 * NESTORA — LUXURY BEDDING & SLEEP COMFORT
 * Checkout Engine & Form Flow
 */

(function () {
  let selectedDeliveryMethod = 'standard';
  let selectedPaymentMethod = 'card';

  function initCheckout() {
    renderCheckoutSummary();
    setupEventListeners();
  }

  function renderCheckoutSummary() {
    if (typeof NestoraCart === 'undefined') return;

    const cart = NestoraCart.getCart();
    const totals = NestoraCart.calculateTotals();
    const itemsList = document.getElementById('checkout-items-list');

    if (itemsList) {
      if (cart.length === 0) {
        itemsList.innerHTML = `
          <div class="text-center py-4">
            <p class="text-muted">No items in your bedding bag.</p>
            <a href="shop.html" class="btn-nestora btn-nestora-primary btn-nestora-sm">Shop Collections</a>
          </div>
        `;
      } else {
        itemsList.innerHTML = cart.map(item => `
          <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="d-flex align-items-center gap-3">
              <div class="position-relative">
                <img src="${item.image}" alt="${item.name}" class="rounded" style="width: 54px; height: 54px; object-fit: cover;">
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark" style="font-size: 0.65rem;">${item.quantity}</span>
              </div>
              <div>
                <h6 class="mb-0 text-truncate" style="max-width: 190px; font-size: 0.88rem;">${item.name}</h6>
                <div class="small text-muted">${item.size} · ${item.color}</div>
              </div>
            </div>
            <span class="fw-semibold text-end">$${item.price * item.quantity}</span>
          </div>
        `).join('');
      }
    }

    // Delivery Fee Adjustment
    let deliveryFee = totals.shipping;
    if (selectedDeliveryMethod === 'express') {
      deliveryFee = 25;
    }

    const finalTax = totals.tax;
    const finalTotal = Math.max(0, totals.subtotal - totals.discount) + deliveryFee + finalTax;

    const subtotalEl = document.getElementById('checkout-subtotal');
    const shippingEl = document.getElementById('checkout-shipping');
    const discountEl = document.getElementById('checkout-discount');
    const discountRow = document.getElementById('checkout-discount-row');
    const taxEl = document.getElementById('checkout-tax');
    const totalEl = document.getElementById('checkout-total');

    if (subtotalEl) subtotalEl.textContent = `$${totals.subtotal}`;
    if (shippingEl) shippingEl.textContent = deliveryFee === 0 ? 'FREE' : `$${deliveryFee}`;
    if (taxEl) taxEl.textContent = `$${finalTax}`;
    if (totalEl) totalEl.textContent = `$${finalTotal}`;

    if (discountRow && discountEl) {
      if (totals.discount > 0) {
        discountRow.style.display = '';
        discountEl.textContent = `-$${totals.discount}`;
      } else {
        discountRow.style.display = 'none';
      }
    }
  }

  function setupEventListeners() {
    // Delivery Method Radio Listeners
    document.querySelectorAll('input[name="deliveryMethod"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        selectedDeliveryMethod = e.target.value;
        renderCheckoutSummary();
      });
    });

    // Payment Method Radio Listeners
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        selectedPaymentMethod = e.target.value;
        document.querySelectorAll('.payment-fields-pane').forEach(pane => pane.classList.add('d-none'));
        const activePane = document.getElementById(`payment-pane-${selectedPaymentMethod}`);
        if (activePane) activePane.classList.remove('d-none');
      });
    });

    // Checkout Form Submission
    const checkoutForm = document.getElementById('nestora-checkout-form');
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    }
  }

  function handleCheckoutSubmit(e) {
    e.preventDefault();

    if (typeof NestoraCart === 'undefined') return;
    const cart = NestoraCart.getCart();

    if (cart.length === 0) {
      if (window.NestoraToast) {
        window.NestoraToast.show({
          title: 'Empty Bag',
          message: 'Please add items to your bedding bag before checkout.',
          icon: 'bi-exclamation-circle',
          type: 'warning'
        });
      }
      return;
    }

    const placeOrderBtn = document.getElementById('btn-place-order');
    if (placeOrderBtn) {
      placeOrderBtn.disabled = true;
      placeOrderBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span> Securing Order & Comfort...';
    }

    // Collect Customer Details
    const email = document.getElementById('checkout-email')?.value || 'customer@nestora-sleep.com';
    const fullName = document.getElementById('checkout-name')?.value || 'Valued Sleeper';
    const address = document.getElementById('checkout-address')?.value || '742 Evergreen Terrace';
    const city = document.getElementById('checkout-city')?.value || 'San Francisco';
    const state = document.getElementById('checkout-state')?.value || 'CA';
    const postal = document.getElementById('checkout-postal')?.value || '94102';

    const totals = NestoraCart.calculateTotals();
    const deliveryFee = selectedDeliveryMethod === 'express' ? 25 : totals.shipping;
    const finalTotal = Math.max(0, totals.subtotal - totals.discount) + deliveryFee + totals.tax;

    const orderId = 'NST-' + Math.floor(100000 + Math.random() * 900000);
    const orderData = {
      id: orderId,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Confirmed',
      items: cart,
      subtotal: totals.subtotal,
      discount: totals.discount,
      shippingFee: deliveryFee,
      tax: totals.tax,
      total: finalTotal,
      customer: {
        name: fullName,
        email: email,
        address: `${address}, ${city}, ${state} ${postal}`
      },
      paymentMethod: selectedPaymentMethod === 'card' ? 'Credit Card (ending 4242)' : selectedPaymentMethod.toUpperCase()
    };

    // Save to orders history
    if (window.NestoraOrders) {
      window.NestoraOrders.saveOrder(orderData);
    }

    // Clear cart and redirect
    setTimeout(() => {
      localStorage.removeItem('nestora_cart_items');
      localStorage.removeItem('nestora_active_promo');
      window.location.href = `order-confirmation.html?orderId=${orderId}`;
    }, 1200);
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('nestora-checkout-form')) {
      initCheckout();
    }
  });

  window.NestoraCheckout = {
    initCheckout,
    renderCheckoutSummary
  };
})();
