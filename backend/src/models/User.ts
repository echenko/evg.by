import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    createdAt: Date;
}

const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const UserModel = model<IUser>('User', UserSchema);