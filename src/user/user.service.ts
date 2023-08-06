import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { validate } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';

import { User } from './user.schema';
import { CreateEmailUserDto } from './dto/create-email-user.dto';
import { ErrorException } from 'src/exceptions/error.exception';
import { CreateUserByEmailParams, LoginByEmailParams } from './user.types';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  /** create user account by email */
  async createUserByEmail(params: CreateUserByEmailParams): Promise<any> {
    const classBody = plainToClass(CreateEmailUserDto, params);

    // validate user input
    const errors = await validate(classBody);
    if (errors.length > 0) {
      throw new ErrorException('userValidateFail', errors);
    }

    // check if user already exists
    const existingUser = await this.userModel.findOne({
      username: params.username,
    });
    if (existingUser) {
      throw new ErrorException('createUserAlreadyExists');
    }

    // hash password
    const hashedPassword = await bcrypt.hash(params.password, 10);
    return await this.userModel.create({ ...params, password: hashedPassword });
  }

  /** find user account by id */
  async findUserById(id: string): Promise<any> {
    return await this.userModel.find({ _id: id });
  }

  /** user login by email */
  async loginByEmail(params: LoginByEmailParams): Promise<any> {
    const classBody = plainToClass(CreateEmailUserDto, params);

    // validate user input
    const errors = await validate(classBody);
    if (errors.length > 0) {
      throw new ErrorException('userValidateFail', errors);
    }

    // find user by username
    const existingUser = await this.userModel.findOne({
      username: params.username,
    });

    // validate user exists
    if (!existingUser) {
      throw new ErrorException('loginValidateFail', errors);
    }

    const verifyPassword = await bcrypt.compare(
      params.password,
      existingUser.password,
    );

    // validate password
    if (!verifyPassword) {
      return new ErrorException('loginValidateFail', errors);
    }
    return existingUser;
  }
}
