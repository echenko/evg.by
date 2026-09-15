import { Header } from '../blocks/Header';
import { AuthApi } from '../blocks/AuthApi';


export class IndexPage {
    private header: Header | null = null;
    private authApi: AuthApi| null = null;

    public init(): void {
        this.initBlocks();
    }

    private initBlocks(): void {
        this.initHeader();
        this.initAuthApi();
    }

    private initHeader(): void {
        if (document.querySelector('.header')) {
            this.header = new Header('.header');
            this.header.init();
        }
    }

    private initAuthApi(): void {
        if (document.querySelector('.auth')) {
            this.authApi = new AuthApi();
            this.authApi.init();
        }
    }
}