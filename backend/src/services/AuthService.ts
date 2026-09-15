import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User';

export class AuthService {
    private readonly SALT_ROUNDS = 10;
    private readonly JWT_SECRET = process.env.JWT_SECRET || 'kC6Yj0_bXXTz2c14v7OC3YzY';
    private readonly JWT_EXPIRES_IN = '7d';

    public async register(email: string, password: string) {
        const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);
        const newUser = new UserModel({ email: email.toLowerCase(), password: hashedPassword });
        await newUser.save();

        return { id: newUser._id, email: newUser.email };
    }

    public async login(email: string, password: string) {
        const user = await UserModel.findOne({ email: email.toLowerCase() });
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            this.JWT_SECRET,
            { expiresIn: this.JWT_EXPIRES_IN }
        );

        return {
            id: user._id,
            email: user.email,
            token,
        };
    }
}