import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  SetMetadata,
  UseFilters,
} from '@nestjs/common';

import { User } from './user.schema';
import { UserService } from './user.service';
import { CreateEmailUserDto } from './dto/create-email-user.dto';
import { AllExceptionsFilter } from 'src/filters/all-exceptions.filter';
import { CreateUserByEmailParams, LoginByEmailParams } from './user.types';

@Controller('user')
@UseFilters(new AllExceptionsFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUserByEmail(@Body() body: CreateEmailUserDto): Promise<any> {
    const params: CreateUserByEmailParams = {
      username: body.username,
      password: body.password,
      email: body.username,
    };
    return await this.userService.createUserByEmail(params);
  }

  @Get()
  async findUserById(@Query('id') id: string): Promise<User> {
    return await this.userService.findUserById(id);
  }

  @Post('login')
  @SetMetadata('responseMessage', '登录成功')
  async loginByEmail(@Body() body: CreateEmailUserDto): Promise<any> {
    const params: LoginByEmailParams = {
      username: body.username,
      password: body.password,
    };
    return await this.userService.loginByEmail(params);
  }
}
