/**
 * NESTORA — LUXURY BEDDING & SLEEP COMFORT
 * Order Tracking & History Engine
 */

(function () {
  const ORDERS_STORAGE_KEY = 'nestora_customer_orders';

  const sampleInitialOrders = [
    {
      id: 'NST-849201',
      date: 'Oct 01, 2026',
      status: 'Shipped',
      subtotal: 280,
      discount: 20,
      shippingFee: 0,
      tax: 21,
      total: 281,
      customer: {
        name: 'Eleanor Vance',
        email: 'eleanor.vance@nestora-sleep.com',
        address: '742 Evergreen Terrace, San Francisco, CA 94102'
      },
      paymentMethod: 'Visa ending 4242',
      items: [
        {
          id: 'nestora-cloud-linen-sheet-set',
          name: 'CloudLinen™ French Flax Sheet Set',
          price: 185,
          size: 'Queen',
          color: 'Warm Ivory',
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80'
        },
        {
          id: 'nestora-serene-cooling-pillow',
          name: 'SereneCool™ Ergonomic Latex Pillow',
          price: 95,
          size: 'Queen',
          color: 'Crisp White',
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1582582621959-48d27397dc69?auto=format&fit=crop&w=1000&q=80'
        }
      ]
    }
  ];

  function getOrders() {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
      // Initialize with sample orders if empty
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(sampleInitialOrders));
      return sampleInitialOrders;
    } catch (e) {
      return sampleInitialOrders;
    }
  }

  function saveOrder(orderObj) {
    const orders = getOrders();
    orders.unshift(orderObj);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }

  function getOrderById(id) {
    const orders = getOrders();
    return orders.find(o => o.id === id);
  }

  function renderOrderConfirmation() {
    const container = document.getElementById('order-confirmation-details');
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('orderId');
    const order = orderId ? getOrderById(orderId) : getOrders()[0];

    if (!order) {
      container.innerHTML = `<div class="text-center py-5"><h4>No Order Found</h4><a href="shop.html" class="btn-nestora btn-nestora-primary mt-3">Return to Shop</a></div>`;
      return;
    }

    container.innerHTML = `
      <div class="row g-4 justify-content-center">
        <div class="col-lg-8">
          <div class="card border p-4 p-md-5 mb-4 shadow-sm">
            <div class="text-center mb-4">
              <div class="d-inline-flex p-3 rounded-circle bg-success bg-opacity-10 text-success mb-3" style="font-size: 2.2rem;">
                <i class="bi bi-check-lg"></i>
              </div>
              <span class="eyebrow">Thank you for your order</span>
              <h2 class="h1">Your Order Is On Its Way</h2>
              <p class="text-muted">Order Confirmation <strong>#${order.id}</strong> has been sent to <strong>${order.customer.email}</strong></p>
            </div>

            <!-- Progress Tracker -->
            <div class="mb-5 px-md-4">
              <div class="d-flex justify-content-between position-relative text-center small fw-semibold">
                <div style="z-index: 2;">
                  <div class="rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center mb-1" style="width: 32px; height: 32px;"><i class="bi bi-check"></i></div>
                  <div>Confirmed</div>
                </div>
                <div style="z-index: 2;">
                  <div class="rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center mb-1" style="width: 32px; height: 32px;"><i class="bi bi-box-seam"></i></div>
                  <div>Packed</div>
                </div>
                <div style="z-index: 2;">
                  <div class="rounded-circle bg-secondary text-white d-inline-flex align-items-center justify-content-center mb-1" style="width: 32px; height: 32px;"><i class="bi bi-truck"></i></div>
                  <div>Shipped</div>
                </div>
                <div style="z-index: 2;">
                  <div class="rounded-circle bg-light border text-muted d-inline-flex align-items-center justify-content-center mb-1" style="width: 32px; height: 32px;"><i class="bi bi-house-door"></i></div>
                  <div>Delivered</div>
                </div>
              </div>
            </div>

            <!-- Items Ordered -->
            <h4 class="h5 mb-3">Items in This Shipment</h4>
            <div class="list-group list-group-flush mb-4 border-top border-bottom">
              ${order.items.map(item => `
                <div class="list-group-item d-flex align-items-center justify-content-between py-3 px-0">
                  <div class="d-flex align-items-center gap-3">
                    <img src="${item.image}" alt="${item.name}" class="rounded" style="width: 60px; height: 60px; object-fit: cover;">
                    <div>
                      <h6 class="mb-1">${item.name}</h6>
                      <div class="small text-muted">${item.size} · ${item.color} · Qty: ${item.quantity}</div>
                    </div>
                  </div>
                  <div class="fw-bold">$${item.price * item.quantity}</div>
                </div>
              `).join('')}
            </div>

            <!-- Summary Details -->
            <div class="row g-3">
              <div class="col-sm-6">
                <h6 class="text-uppercase text-muted small">Shipping Address</h6>
                <p class="small text-dark mb-0"><strong>${order.customer.name}</strong><br>${order.customer.address}</p>
              </div>
              <div class="col-sm-6">
                <h6 class="text-uppercase text-muted small">Payment Details</h6>
                <p class="small text-dark mb-0">Method: ${order.paymentMethod}<br>Total Paid: <strong class="text-accent fs-6">$${order.total}</strong></p>
              </div>
            </div>

            <div class="d-flex flex-wrap gap-3 justify-content-center mt-5 pt-3 border-top">
              <a href="shop.html" class="btn-nestora btn-nestora-primary">Continue Shopping</a>
              <button class="btn-nestora btn-nestora-secondary" onclick="window.print()"><i class="bi bi-printer me-1"></i> Print / Download Invoice</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderOrdersPage() {
    const listContainer = document.getElementById('orders-list-container');
    if (!listContainer) return;

    const orders = getOrders();
    if (orders.length === 0) {
      listContainer.innerHTML = `
        <div class="text-center py-5">
          <i class="bi bi-box text-muted" style="font-size: 3rem;"></i>
          <h4 class="mt-3">No Orders Placed Yet</h4>
          <p class="text-muted">Start creating your dream bedroom sanctuary.</p>
          <a href="shop.html" class="btn-nestora btn-nestora-primary btn-nestora-sm mt-2">Explore Bedding</a>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = orders.map(o => `
      <div class="card border rounded-3 p-4 mb-4 shadow-xs">
        <div class="d-flex flex-wrap align-items-center justify-content-between border-bottom pb-3 mb-3 gap-2">
          <div>
            <span class="badge badge-nestora badge-${o.status === 'Delivered' ? 'bestseller' : 'new'} mb-1">${o.status}</span>
            <h5 class="h6 mb-0">Order #${o.id}</h5>
            <div class="small text-muted">Placed on ${o.date}</div>
          </div>
          <div class="text-end">
            <div class="fw-bold fs-5">$${o.total}</div>
            <div class="small text-muted">${o.items.length} item${o.items.length > 1 ? 's' : ''}</div>
          </div>
        </div>

        <div class="row g-3 align-items-center mb-3">
          <div class="col-md-8">
            <div class="d-flex flex-wrap gap-2">
              ${o.items.map(item => `
                <div class="d-flex align-items-center gap-2 border rounded p-2 bg-light">
                  <img src="${item.image}" alt="${item.name}" class="rounded" style="width: 44px; height: 44px; object-fit: cover;">
                  <div class="small">
                    <div class="fw-semibold text-truncate" style="max-width: 140px;">${item.name}</div>
                    <div class="text-muted">${item.size} (×${item.quantity})</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="col-md-4 text-md-end d-flex flex-md-column gap-2 justify-content-end">
            <a href="order-confirmation.html?orderId=${o.id}" class="btn-nestora btn-nestora-secondary btn-nestora-sm">View Order Details</a>
            <button class="btn-nestora btn-nestora-sage btn-nestora-sm" onclick="
              NestoraCart.addItem('${o.items[0].id}', 1, '${o.items[0].size}', '${o.items[0].color}');
            ">Buy Again</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderOrderConfirmation();
    renderOrdersPage();
  });

  window.NestoraOrders = {
    getOrders,
    saveOrder,
    getOrderById
  };
})();
