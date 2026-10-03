/**
 * NESTORA — LUXURY BEDDING & SLEEP COMFORT
 * Payment Form Masking & Security Simulation
 */

(function () {
  function initPaymentMasks() {
    const cardInput = document.getElementById('card-number');
    const expiryInput = document.getElementById('card-expiry');
    const cvvInput = document.getElementById('card-cvv');

    if (cardInput) {
      cardInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        let formatted = '';
        for (let i = 0; i < value.length; i++) {
          if (i > 0 && i % 4 === 0) formatted += ' ';
          formatted += value[i];
        }
        e.target.value = formatted.substring(0, 19);
      });
    }

    if (expiryInput) {
      expiryInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
          e.target.value = value.substring(0, 2) + '/' + value.substring(2, 4);
        } else {
          e.target.value = value;
        }
      });
    }

    if (cvvInput) {
      cvvInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', initPaymentMasks);
})();
