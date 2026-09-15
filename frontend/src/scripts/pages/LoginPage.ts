import { AuthApi } from '../blocks/AuthApi';
import { Header } from '../blocks/Header';
import { LoginForm } from '../blocks/LoginForm';

export class LoginPage {
    private header: Header | null = null;
    private loginForm: LoginForm | null = null;
    private authApi: AuthApi | null = null;

    public init(): void {
        this.initBlocks();
        this.initForm();
        this.initAuthApi();
    }

    private initBlocks(): void {
        if (document.querySelector('.header')) {
            this.header = new Header('.header');
            this.header.init();
        }
    }

    private initForm(): void {
        if (document.querySelector('#loginForm')) {
            this.loginForm = new LoginForm('#loginForm');
            this.loginForm.init();
        }
    }

    private initAuthApi(): void {
        if (document.querySelector('.auth')) {
            this.authApi = new AuthApi();
            this.authApi.init();
        }
    }
}