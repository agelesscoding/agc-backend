import { User } from './user.schema';
import { CreateEmailUserDto } from './dto/create-email-user.dto';

export type CreateUserByEmailParams = Pick<
  User,
  keyof CreateEmailUserDto | 'email'
>;
export type LoginByEmailParams = Pick<User, 'username' | 'password'>;
