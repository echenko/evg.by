import { RegisterPage } from './pages/RegisterPage';
import { removeNoJsClass } from './utils/no-js';
import { isTokenValid } from './utils/auth';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Register page loaded');

    removeNoJsClass();

    if (isTokenValid()) {
        window.location.href = '/';
        return;
    }

    const token = localStorage.getItem('auth_token');

    if (token) {
        console.log('[Register] User already authenticated, redirecting to home...');
        window.location.href = '/';
        return;
    }

    const registerPage = new RegisterPage();
    registerPage.init();
});