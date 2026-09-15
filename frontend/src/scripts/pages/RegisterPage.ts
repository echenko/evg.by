import { AuthApi } from '../blocks/AuthApi';
import { Header } from '../blocks/Header';
import { RegistrationForm } from '../blocks/RegistrationForm';

export class RegisterPage {
    private header: Header | null = null;
    private registrationForm: RegistrationForm | null = null;
    private authApi: AuthApi | null = null;

    public init(): void {
        this.initBlocks();
    }

    private initBlocks(): void {
        this.initHeader();
        this.initForm();
        this.initAuthApi();
    }

    private initHeader(): void {
        if (document.querySelector('.header')) {
            this.header = new Header('.header');
            this.header.init();
        }
    }

    private initForm(): void {
        if (document.querySelector('#registerForm')) {
            this.registrationForm = new RegistrationForm('#registerForm');
            this.registrationForm.init();
        }
    }

    private initAuthApi(): void {
        if (document.querySelector('.auth')) {
            this.authApi = new AuthApi();
            this.authApi.init();
        }
    }
}