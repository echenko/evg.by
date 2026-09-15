export class LoginForm {
    private form: HTMLFormElement;
    private message: HTMLElement;

    constructor(selector: string) {
        const formElement = document.querySelector(selector) as HTMLFormElement;
        if (!formElement) {
            throw new Error(`Form "${selector}" not found`);
        }
        
        this.form = formElement;
        this.message = this.form.querySelector('.form__message') as HTMLElement;
    }

    public init(): void {
        this.form.addEventListener('submit', this.handleSubmit);
        console.log('[LoginForm] Initialized');
    }

    private handleSubmit = async (e: SubmitEvent): Promise<void> => {
        e.preventDefault();

        const submitBtn = this.form.querySelector('.form__submit') as HTMLButtonElement;
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());

        submitBtn.disabled = true;
        submitBtn.textContent = 'Logging in...';

        try {
            const response = await fetch(this.form.action, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                }),
            });

            const result = await response.json();

            if (response.ok) {
                if (result.token) {
                    localStorage.setItem('auth_token', result.token);
                }
                
                this.showMessage('Login successful! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            } else {
                this.showMessage(result.message || 'Login failed', 'error');
                this.resetButton(submitBtn);
            }
        } catch (error) {
            this.showMessage('Network error. Please try again.', 'error');
            this.resetButton(submitBtn);
        }
    };

    private resetButton(btn: HTMLButtonElement): void {
        btn.disabled = false;
        btn.textContent = 'Login';
    }

    private showMessage(text: string, type: 'error' | 'success'): void {
        this.message.textContent = text;
        this.message.className = `form__message form__message--${type}`;
    }
}