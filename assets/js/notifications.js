/**
 * NESTORA — LUXURY BEDDING & SLEEP COMFORT
 * Toast Notification System
 */

(function () {
  let toastContainer = null;

  function ensureContainer() {
    if (!toastContainer) {
      toastContainer = document.querySelector('.toast-container-nestora');
      if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container-nestora';
        document.body.appendChild(toastContainer);
      }
    }
    return toastContainer;
  }

  function show({ title = 'Notification', message = '', icon = 'bi-check-circle', duration = 3800, type = 'info' }) {
    const container = ensureContainer();
    const toast = document.createElement('div');
    toast.className = `toast-nestora toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');

    toast.innerHTML = `
      <div class="toast-icon"><i class="bi ${icon}"></i></div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        ${message ? `<div class="toast-message">${message}</div>` : ''}
      </div>
      <button type="button" class="btn-close ms-auto" aria-label="Close" style="font-size: 0.75rem;"></button>
    `;

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    const closeBtn = toast.querySelector('.btn-close');
    const dismiss = () => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    };

    if (closeBtn) {
      closeBtn.addEventListener('click', dismiss);
    }

    if (duration > 0) {
      setTimeout(dismiss, duration);
    }
  }

  window.NestoraToast = { show };
})();
