/**
 * Проверяет, валиден ли токен авторизации.
 * Возвращает true, если токен существует и не просрочен.
 */
export function isTokenValid(): boolean {
    const token = localStorage.getItem('auth_token');
    if (!token) return false;

    try {
        const payloadBase64 = token.split('.')[1];
        const payload = JSON.parse(atob(payloadBase64));
        
        const isExpired = payload.exp * 1000 < Date.now();
        
        if (isExpired) {
            localStorage.removeItem('auth_token');
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('[Auth] Invalid token format:', error);
        localStorage.removeItem('auth_token');
        return false;
    }
}

/**
 * Получает email пользователя из токена.
 */
export function getUserEmail(): string | null {
    const token = localStorage.getItem('auth_token');
    if (!token) return null;

    try {
        const payloadBase64 = token.split('.')[1];
        const payload = JSON.parse(atob(payloadBase64));
        return payload.email || null;
    } catch {
        return null;
    }
}