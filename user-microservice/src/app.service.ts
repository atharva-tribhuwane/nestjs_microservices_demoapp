import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './app.models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class AppService {
  // users = [];
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async createUser(user: User) {
    console.log('into the microservice service');
    const usser = await this.userModel.findOne({ email: user.email });

    if (usser) {
      const rees = { status: 409, response: 'User Already Exist' };
      return rees;
    }

    const password: string = bcrypt.hashSync(user.password, 10);
    user['password'] = password;

    const id: string = uuidv4();
    user = { ...user, id };

    const newUser = new this.userModel(user);
    newUser.save();
    const rees = { status: 200, response: 'User Registered Successfully!' };
    return rees;
  }

  async getUsers() {
    const users = await this.userModel.find({});
    const rees = { status: 200, response: users };
    return rees;
  }
}
