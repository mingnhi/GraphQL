import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Model } from 'mongoose';
import { UserDTO } from './user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getAllUser(): Promise<User[]> {
    return this.userModel.find({});
  }

  createUser(userDTO: UserDTO): Promise<User> {
    const newUser = new this.userModel(userDTO);
    return newUser.save();
  }

  updateUser(userDTO: UserDTO, id: string) {
    const result = this.userModel.findByIdAndUpdate(id, userDTO, { new: true });
    return result;
  }
  deleteUser(id: string) {
    const result = this.userModel.findByIdAndDelete(id);
    return result;
  }
}
