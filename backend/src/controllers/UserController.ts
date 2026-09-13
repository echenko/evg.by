import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public getUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.userService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    };

    public createUser = async (req: Request, res: Response) => {
        try {
            const { name, email } = req.body;
            const user = await this.userService.createUser(name, email);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: 'Bad request' });
        }
    };
}