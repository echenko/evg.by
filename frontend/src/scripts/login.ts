import { LoginPage } from './pages/LoginPage';
import { removeNoJsClass } from './utils/no-js';
import { isTokenValid } from './utils/auth';

document.addEventListener('DOMContentLoaded', () => {
    removeNoJsClass();

    if (isTokenValid()) {
        window.location.href = '/';
        return;
    }

    const token = localStorage.getItem('auth_token');

    if (token) {
        console.log('[Login] User already authenticated, redirecting to home...');
        window.location.href = '/';
        return;
    }

    const loginPage = new LoginPage();
    loginPage.init();
});