import { IndexPage } from './pages/IndexPage';
import { removeNoJsClass } from './utils/no-js';

document.addEventListener('DOMContentLoaded', () => {
    removeNoJsClass();

    const pathname = window.location.pathname;

    if (pathname === '/') {
        const indexPage = new IndexPage();
        indexPage.init();
    }
});