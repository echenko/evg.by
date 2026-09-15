export class RegistrationForm {
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
        console.log('[RegistrationForm] Initialized');
    }

    private handleSubmit = async (e: SubmitEvent): Promise<void> => {
        e.preventDefault();

        const submitBtn = this.form.querySelector('.form__submit') as HTMLButtonElement;
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());

         console.log('Отправляемые данные:', { email: data.email, password: data.password });


        if (data.password !== data.confirmPassword) {
            this.showMessage('Passwords do not match', 'error');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating account...';

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
                this.showMessage('Registration successful! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = '/login.html';
                }, 1500);
            } else {
                this.showMessage(result.message || 'Registration failed', 'error');
                this.resetButton(submitBtn);
            }
        } catch (error) {
            this.showMessage('Network error. Please try again.', 'error');
            this.resetButton(submitBtn);
        }
    };

    private resetButton(btn: HTMLButtonElement): void {
        btn.disabled = false;
        btn.textContent = 'Sign Up';
    }

    private showMessage(text: string, type: 'error' | 'success'): void {
        this.message.textContent = text;
        this.message.className = `form__message form__message--${type}`;
    }
}