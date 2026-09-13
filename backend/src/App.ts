import express, { Application } from 'express';
import cors from 'cors';
import { Database } from './config/Database';
import { UserRoutes } from './routes/UserRoutes';

export class App {
    private app: Application;
    private db: Database;

    constructor(private port: number) {
        this.app = express();
        this.db = new Database();
        this.middlewares();
        this.routes();
    }

    private middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    private routes() {
        const userRoutes = new UserRoutes();
        this.app.use('/api/users', userRoutes.router);
    }

    public async start() {
        await this.db.connect();
        this.app.listen(this.port, () => {
            console.log(`🚀 Server running on http://localhost:${this.port}`);
        });
    }
}