import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export class Database {
    public async connect(): Promise<void> {
        try {
            const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/evg_db';
            await mongoose.connect(uri);
            console.log('✅ MongoDB connected successfully');
        } catch (error) {
            console.error('❌ MongoDB connection error:', error);
            process.exit(1);
        }
    }
}