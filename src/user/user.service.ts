import { Model } from 'mongoose';
import { validate } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';

import { User } from './user.schema';
import { CreateEmailUserDto } from './dto/create-email-user.dto';
import { ErrorException } from 'src/exceptions/error.exception';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  /** create user account by email */
  async createUserByEmail(body: CreateEmailUserDto): Promise<User[]> {
    const classBody = plainToClass(CreateEmailUserDto, body);
    const errors = await validate(classBody);
    if (errors.length > 0) {
      throw new ErrorException('createUserValidateFail', errors);
    }

    const existingUser = await this.userModel.findOne({
      username: body.username,
    });
    if (existingUser) {
      throw new ErrorException('createUserAlreadyExists');
    }

    const params: Pick<User, keyof CreateEmailUserDto | 'email'> = {
      username: body.username,
      password: body.password,
      email: body.username,
    };
    return await this.userModel.create([params]);
  }

  /** find user account by id */
  async findUserById(id: string): Promise<any> {
    const res = await this.userModel.find({ _id: id });
    console.log('res', res);
    return res;
  }
}
