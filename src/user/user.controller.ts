import { Body, Controller, Get, Post, Query, UseFilters } from '@nestjs/common';

import { User } from './user.schema';
import { UserService } from './user.service';
import { CreateEmailUserDto } from './dto/create-email-user.dto';
import { AllExceptionsFilter } from 'src/filters/all-exceptions.filter';

@Controller('user')
@UseFilters(new AllExceptionsFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUserByEmail(@Body() body: CreateEmailUserDto): Promise<any> {
    return await this.userService.createUserByEmail(body);
  }

  @Get()
  async findUserById(@Query('id') id: string): Promise<User> {
    return await this.userService.findUserById(id);
  }
}
