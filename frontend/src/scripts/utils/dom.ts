/**
 * Безопасно находит элемент в DOM.
 */
export function queryElement<T extends HTMLElement>(
    selector: string,
    parent: ParentNode = document
): T | null {
    const element = parent.querySelector<T>(selector);
    if (!element) {
        console.warn(`[DOM] Element not found: ${selector}`);
    }
    return element;
}

/**
 * Находит все элементы по селектору в DOM.
 */
export function queryElements<T extends HTMLElement>(
    selector: string,
    parent: ParentNode = document
): NodeListOf<T> {
    return parent.querySelectorAll<T>(selector);
}