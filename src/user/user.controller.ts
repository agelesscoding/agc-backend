import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UseFilters,
} from '@nestjs/common';
import { Response } from 'express';

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
  async createUserByEmail(@Body() body: CreateEmailUserDto): Promise<User> {
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
  // @SetMetadata('responseMessage', '登录成功')
  async loginByEmail(@Body() body: CreateEmailUserDto, @Res() res: Response) {
    const params: LoginByEmailParams = {
      username: body.username,
      password: body.password,
    };
    const result = await this.userService.loginByEmail(params);
    if (result?.shouldSetCookie) {
      res.cookie('username', result.data.username);
    }

    res.json({
      errno: 0,
      message: '登录成功',
      data: result.data,
    });
  }
}
