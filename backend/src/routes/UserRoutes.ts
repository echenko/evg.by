import { Router } from 'express';
import { UserController } from '../controllers/UserController';

export class UserRoutes {
    public router: Router;
    private controller: UserController;

    constructor() {
        this.router = Router();
        this.controller = new UserController();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/', this.controller.getUsers);
        this.router.post('/', this.controller.createUser);
    }
}