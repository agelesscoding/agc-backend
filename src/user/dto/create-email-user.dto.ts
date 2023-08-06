import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateEmailUserDto {
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
