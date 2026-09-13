import dotenv from 'dotenv';
dotenv.config();
import { App } from './App';

const PORT = Number(process.env.PORT) || 3000;
const app = new App(PORT);
app.start();