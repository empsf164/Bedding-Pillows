/**
 * NESTORA — LUXURY BEDDING & SLEEP COMFORT
 * Theme Engine (Light / Dark Mode)
 */

(function () {
  const THEME_STORAGE_KEY = 'nestora_theme';

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    updateThemeToggleIcons(theme);
  }

  function updateThemeToggleIcons(theme) {
    const toggles = document.querySelectorAll('.theme-toggle-btn');
    toggles.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'bi bi-sun';
          btn.setAttribute('aria-label', 'Switch to Light Mode');
        } else {
          icon.className = 'bi bi-moon-stars';
          btn.setAttribute('aria-label', 'Switch to Dark Mode');
        }
      }
    });
  }

  // Initialize theme immediately to prevent flashing
  const currentTheme = getPreferredTheme();
  document.documentElement.setAttribute('data-theme', currentTheme);

  document.addEventListener('DOMContentLoaded', () => {
    updateThemeToggleIcons(currentTheme);

    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme');
        const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        if (window.NestoraToast) {
          window.NestoraToast.show({
            title: nextTheme === 'dark' ? 'Dark Mode Enabled' : 'Light Mode Enabled',
            message: `Theme updated to ${nextTheme} bedroom ambiance.`,
            icon: nextTheme === 'dark' ? 'bi-moon-stars' : 'bi-sun'
          });
        }
      });
    });

    // Listen to system changes if user hasn't explicitly set a preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  });

  window.NestoraTheme = {
    get: () => document.documentElement.getAttribute('data-theme'),
    set: applyTheme
  };
})();
