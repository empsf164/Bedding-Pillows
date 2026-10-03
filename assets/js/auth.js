/**
 * NESTORA — LUXURY BEDDING & SLEEP COMFORT
 * Authentication Engine (Client-Side Simulation)
 */

(function () {
  const AUTH_STORAGE_KEY = 'nestora_auth_user';

  const defaultUser = {
    name: 'Eleanor Vance',
    email: 'eleanor.vance@nestora-sleep.com',
    phone: '+1 (555) 234-5678',
    isLoggedIn: false
  };

  function getUser() {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultUser;
      }
    }
    return defaultUser;
  }

  function setUser(userObj) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userObj));
    updateAuthUI();
  }

  function login(email, name = 'Valued Member') {
    const user = {
      name: name,
      email: email,
      phone: '+1 (555) 019-2834',
      isLoggedIn: true
    };
    setUser(user);
    if (window.NestoraToast) {
      window.NestoraToast.show({
        title: 'Welcome Back',
        message: `Signed in as ${user.email}`,
        icon: 'bi-person-check-fill'
      });
    }
    return true;
  }

  function logout() {
    const user = getUser();
    user.isLoggedIn = false;
    setUser(user);
    if (window.NestoraToast) {
      window.NestoraToast.show({
        title: 'Signed Out',
        message: 'You have been successfully logged out.',
        icon: 'bi-box-arrow-right'
      });
    }
    // If on account or orders page, optionally redirect
    if (window.location.pathname.includes('account.html') || window.location.pathname.includes('orders.html')) {
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 800);
    }
  }

  function updateAuthUI() {
    const user = getUser();
    const authLoggedOutElements = document.querySelectorAll('.auth-logged-out');
    const authLoggedInElements = document.querySelectorAll('.auth-logged-in');
    const userNameElements = document.querySelectorAll('.auth-user-name');
    const userEmailElements = document.querySelectorAll('.auth-user-email');

    if (user.isLoggedIn) {
      authLoggedOutElements.forEach(el => el.style.display = 'none');
      authLoggedInElements.forEach(el => el.style.display = '');
      userNameElements.forEach(el => el.textContent = user.name);
      userEmailElements.forEach(el => el.textContent = user.email);
    } else {
      authLoggedOutElements.forEach(el => el.style.display = '');
      authLoggedInElements.forEach(el => el.style.display = 'none');
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();

    // Bind logout buttons
    document.querySelectorAll('.btn-nestora-logout').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
      });
    });

    // Handle Login Page Form if present
    const loginForm = document.getElementById('nestora-login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('login-email');
        const email = emailInput ? emailInput.value : 'customer@nestora-sleep.com';
        login(email, email.split('@')[0]);
        setTimeout(() => {
          window.location.href = 'account.html';
        }, 600);
      });
    }

    // Handle Signup Page Form if present
    const signupForm = document.getElementById('nestora-signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('signup-name');
        const emailInput = document.getElementById('signup-email');
        const name = nameInput ? nameInput.value : 'New Member';
        const email = emailInput ? emailInput.value : 'customer@nestora-sleep.com';
        login(email, name);
        setTimeout(() => {
          window.location.href = 'account.html';
        }, 600);
      });
    }

    // Handle Forgot Password Form if present
    const forgotForm = document.getElementById('nestora-forgot-form');
    if (forgotForm) {
      forgotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const alertBox = document.getElementById('forgot-success-alert');
        if (alertBox) {
          alertBox.classList.remove('d-none');
        }
        if (window.NestoraToast) {
          window.NestoraToast.show({
            title: 'Reset Link Sent',
            message: 'Instructions have been dispatched to your email.',
            icon: 'bi-envelope-check'
          });
        }
      });
    }
  });

  window.NestoraAuth = {
    getUser,
    login,
    logout,
    updateAuthUI
  };
})();
