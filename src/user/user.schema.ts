import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  /** user name */
  @Prop({ unique: true, required: true })
  username: string;

  /** user's password */
  @Prop({ required: true })
  password: string;

  /** user's email */
  @Prop()
  email?: string;

  /** user's nick name */
  @Prop()
  nickname?: string;

  /** user's picture */
  @Prop()
  picture?: string;

  /** user's phone number */
  @Prop()
  phoneNumber?: string;

  /** create time */
  @Prop()
  createdAt?: Date;

  /** update time */
  @Prop()
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
