import { UserModel } from '../models/User';

export class UserService {
    public async getAllUsers() {
        return await UserModel.find();
    }

    public async createUser(name: string, email: string) {
        const newUser = new UserModel({ name, email });
        return await newUser.save();
    }
}