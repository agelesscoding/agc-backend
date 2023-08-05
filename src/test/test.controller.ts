import { Request } from 'express';
import { HttpService } from '@nestjs/axios';
import { IsString, IsInt } from 'class-validator';
import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';

import { TestService } from './test.service';

class TestDto {
  @IsString()
  name: string;
  @IsInt()
  age: number;
}

class DogDto {
  @IsString()
  message: string;
  @IsString()
  status: string;
}

@Controller('test')
export class TestController {
  constructor(
    private httpService: HttpService,
    private testService: TestService,
  ) {}

  @Get()
  getName(@Query('id') id: string, @Req() req: Request) {
    console.log('req.query', req.query);
    return `Hello ${id}`;
  }

  @Post()
  postName(@Body('name') name: string, @Body() body: TestDto): TestDto {
    console.log('body', body);
    return body;
  }

  @Get('dog')
  async getDog(): Promise<DogDto> {
    return new Promise((resolve, reject) => {
      this.httpService
        .get('https://dog.ceo/api/breeds/image/random')
        .subscribe((response) => {
          resolve(response.data);
        });
    });
  }

  @Get('mongodb/players')
  async getPerson(): Promise<any> {
    return await this.testService.getTeam();
  }
}
