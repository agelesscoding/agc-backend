import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop({ ref: 'Team' })
  team: ObjectId;

  @Prop()
  machedTeam: {
    _id: ObjectId;
    name: string;
    location: 'Brooklyn';
    founded: 1967;
    players: string[];
  }[];
}

export const UserSchema = SchemaFactory.createForClass(User);
