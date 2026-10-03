/**
 * NESTORA — LUXURY BEDDING & SLEEP COMFORT
 * Interactive Pillow Finder Engine
 */

(function () {
  let userSelections = {
    sleepPosition: null,  // side, back, stomach, combo
    firmness: null,       // soft, medium, firm
    temperature: null,    // cool, balanced, warm
    fill: null            // latex, down, foam, alt, any
  };

  let currentStep = 1;
  const totalSteps = 4;

  function selectOption(category, value, element) {
    userSelections[category] = value;

    // Visual selection feedback
    const parent = element.closest('.finder-options-grid');
    if (parent) {
      parent.querySelectorAll('.finder-option-card').forEach(c => c.classList.remove('selected'));
      element.classList.add('selected');
    }

    // Auto advance after slight delay for tactile delight
    setTimeout(() => {
      if (currentStep < totalSteps) {
        goToStep(currentStep + 1);
      } else {
        calculateRecommendations();
      }
    }, 280);
  }

  function goToStep(step) {
    currentStep = step;
    document.querySelectorAll('.finder-step').forEach((el, index) => {
      el.classList.toggle('active', index + 1 === step);
    });

    const progressBar = document.querySelector('.finder-progress-fill');
    if (progressBar) {
      const percentage = ((step - 1) / totalSteps) * 100;
      progressBar.style.width = `${percentage}%`;
    }

    const stepLabel = document.getElementById('finder-step-counter');
    if (stepLabel) {
      stepLabel.textContent = `Step ${step} of ${totalSteps}`;
    }
  }

  function restartFinder() {
    userSelections = {
      sleepPosition: null,
      firmness: null,
      temperature: null,
      fill: null
    };
    document.querySelectorAll('.finder-option-card').forEach(c => c.classList.remove('selected'));
    document.getElementById('finder-results-view').style.display = 'none';
    document.getElementById('finder-quiz-view').style.display = 'block';
    goToStep(1);
  }

  function calculateRecommendations() {
    document.getElementById('finder-quiz-view').style.display = 'none';
    const resultsView = document.getElementById('finder-results-view');
    resultsView.style.display = 'block';

    const progressBar = document.querySelector('.finder-progress-fill');
    if (progressBar) progressBar.style.width = '100%';

    const resultsContainer = document.getElementById('finder-matched-cards');
    if (!resultsContainer || typeof NESTORA_PRODUCTS === 'undefined') return;

    // Filter and score pillow products
    const pillows = NESTORA_PRODUCTS.filter(p => p.category === 'pillows' || p.categoryName.toLowerCase().includes('pillow'));

    const scored = pillows.map(pillow => {
      let score = 0;
      let reasons = [];

      // Sleep position match
      if (userSelections.sleepPosition === 'side' && (pillow.id.includes('side') || pillow.firmness.includes('Medium') || pillow.firmness.includes('Firm'))) {
        score += 30;
        reasons.push('Provides anatomical elevation for shoulder-to-neck alignment.');
      } else if (userSelections.sleepPosition === 'stomach' && (pillow.firmness.includes('Soft') || pillow.id.includes('down') || pillow.id.includes('adjustable'))) {
        score += 30;
        reasons.push('Low-profile compression prevents neck extension.');
      } else if (userSelections.sleepPosition === 'back' && (pillow.firmness.includes('Medium') || pillow.id.includes('latex') || pillow.id.includes('adjustable'))) {
        score += 30;
        reasons.push('Gentle cervical cradle maintains natural neutral spine.');
      } else {
        score += 15;
        reasons.push('Adaptive profile caters well to variable rest patterns.');
      }

      // Firmness match
      if (userSelections.firmness && pillow.firmness.toLowerCase().includes(userSelections.firmness.toLowerCase())) {
        score += 25;
        reasons.push(`Tailored to your preferred ${userSelections.firmness} support sensation.`);
      }

      // Temperature match
      if (userSelections.temperature === 'cool' && (pillow.cooling.toLowerCase().includes('cool') || pillow.id.includes('latex'))) {
        score += 25;
        reasons.push('Features open-channel ventilation to disperse nocturnal heat buildup.');
      } else if (userSelections.temperature === 'warm' && pillow.id.includes('down')) {
        score += 25;
        reasons.push('Plush thermal insulation envelopes you in gentle cozy warmth.');
      } else {
        score += 15;
        reasons.push('Balanced thermal airflow across all four seasons.');
      }

      // Fill match
      if (userSelections.fill === 'latex' && pillow.material.includes('Latex')) score += 20;
      if (userSelections.fill === 'down' && pillow.material.includes('Down')) score += 20;
      if (userSelections.fill === 'foam' && pillow.material.includes('Foam')) score += 20;
      if (userSelections.fill === 'alt' && pillow.material.includes('Microfiber')) score += 20;

      return { pillow, score, matchReason: reasons.slice(0, 2).join(' ') };
    });

    scored.sort((a, b) => b.score - a.score);
    const topMatches = scored.slice(0, 3);

    resultsContainer.innerHTML = topMatches.map(item => `
      <div class="col-12 col-md-4 mb-4">
        <div class="product-card h-100 border-accent">
          <div class="product-card-media">
            <img src="${item.pillow.images[0]}" alt="${item.pillow.name}" class="primary-img">
            <div class="product-card-badges">
              <span class="badge-nestora badge-bestseller">Top Match</span>
            </div>
          </div>
          <div class="product-card-body">
            <span class="product-card-category">${item.pillow.categoryName}</span>
            <h4 class="product-card-title">
              <a href="product-details.html?id=${item.pillow.id}">${item.pillow.name}</a>
            </h4>
            <div class="alert alert-light border py-2 px-3 my-2 small text-muted">
              <strong class="text-dark d-block mb-1"><i class="bi bi-stars text-sage me-1"></i> Why it matches your preferences:</strong>
              ${item.matchReason}
            </div>
            <div class="product-card-footer mt-3">
              <div class="product-card-price">
                <span class="current">$${item.pillow.price}</span>
              </div>
              <button class="btn-nestora btn-nestora-primary btn-nestora-sm" onclick="NestoraCart.addItem('${item.pillow.id}', 1, '${item.pillow.sizes[0]}', '${item.pillow.colors[0]?.name}')">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  window.NestoraPillowFinder = {
    selectOption,
    goToStep,
    restartFinder,
    calculateRecommendations
  };
})();
