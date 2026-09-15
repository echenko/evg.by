export class AuthApi {
    private guestBlock: HTMLElement | null;
    private userBlock: HTMLElement | null;
    private nameEl: HTMLElement | null;
    private logoutBtn: HTMLButtonElement | null;

    constructor() {
        this.guestBlock = document.querySelector('.auth__guest');
        this.userBlock = document.querySelector('.auth__user');
        this.nameEl = document.querySelector('.auth__name');
        this.logoutBtn = document.querySelector('.auth__logout');
    }

    public init(): void {
        this.updateUI();
        
        if (this.logoutBtn) {
            this.logoutBtn.addEventListener('click', this.handleLogout);
        }
    }

    private updateUI(): void {
        const token = localStorage.getItem('auth_token');
        const isAuth = !!token;

        if (this.guestBlock && this.userBlock) {
            if (isAuth) {
                this.guestBlock.classList.add('auth__guest--hidden');
                this.userBlock.classList.remove('auth__user--hidden');
            } else {
                this.guestBlock.classList.remove('auth__guest--hidden');
                this.userBlock.classList.add('auth__user--hidden');
            }
        }

        if (isAuth && this.nameEl && token) {
            try {
                const payloadBase64 = token.split('.')[1];
                const payload = JSON.parse(atob(payloadBase64));
                this.nameEl.textContent = payload.email || 'User';
            } catch (error) {
                this.nameEl.textContent = 'User';
            }
        }
    }

    private handleLogout = (): void => {
        localStorage.removeItem('auth_token');
        
        this.updateUI();
    };
}