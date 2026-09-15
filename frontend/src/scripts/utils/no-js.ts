/**
 * Удаляет класс no-js у body.
 */

export function removeNoJsClass(): void {
    document.body.classList.remove('no-js');
}