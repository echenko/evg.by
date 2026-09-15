import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public register = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;

            // Валидация входных данных
            if (!email || !password) {
                res.status(400).json({ message: 'Email and password are required' });
                return;
            }

            if (password.length < 8) {
                res.status(400).json({ message: 'Password must be at least 8 characters' });
                return;
            }

            const user = await this.authService.register(email, password);

            res.status(201).json({
                message: 'User registered successfully',
                user,
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Registration failed';
            
            // Если пользователь уже существует — 400, иначе 500
            const status = message.includes('already exists') ? 400 : 500;
            res.status(status).json({ message });
        }
    };

    public login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ message: 'Email and password are required' });
                return;
            }

            const result = await this.authService.login(email, password);

            res.json({
                message: 'Login successful',
                user: { id: result.id, email: result.email },
                token: result.token,
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Login failed';
            res.status(401).json({ message });
        }
    };
}