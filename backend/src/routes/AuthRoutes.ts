import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

export class AuthRoutes {
    public router: Router;
    private controller: AuthController;

    constructor() {
        this.router = Router();
        this.controller = new AuthController();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.post('/register', this.controller.register);
        this.router.post('/login', this.controller.login);
    }
}