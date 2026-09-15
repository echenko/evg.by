import { queryElement } from '../utils/dom';

export class Header {
    private menuButton: HTMLButtonElement | null;
    private dropdown: HTMLElement | null;

    constructor(rootSelector: string) {
        const root = queryElement<HTMLElement>(rootSelector);
        if (!root) {
            throw new Error(`Header root element "${rootSelector}" not found`);
        }
        this.menuButton = queryElement<HTMLButtonElement>('.header__menu-button', root);
        this.dropdown = queryElement<HTMLElement>('.header__dropdown', root);
    }

    public init(): void {
        this.bindEvents();
        console.log('[Header] Initialized');
    }

    private bindEvents(): void {
        if (this.menuButton) {
            this.menuButton.addEventListener('click', this.toggleMenu);
        }
        if (this.dropdown) {
            this.dropdown.addEventListener('click', this.toggleMenu);
        }
    }

    private toggleMenu = (): void => {
        this.menuButton?.classList.toggle('header__menu-button--active');
        this.dropdown?.classList.toggle('header__dropdown--active');
    };

    public destroy(): void {
        if (this.menuButton) {
            this.menuButton.removeEventListener('click', this.toggleMenu);
        }
    }
}