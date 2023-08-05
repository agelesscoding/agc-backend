import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './test.schema';

@Injectable()
export class TestService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getTeam(): Promise<User[]> {
    const pipeLine = [
      {
        $match: {
          team: { $exists: true },
        },
      },
      {
        $lookup: {
          from: 'team',
          localField: 'team',
          foreignField: '_id',
          as: 'machedTeam',
        },
      },
    ];
    return await this.userModel.aggregate(pipeLine).exec();
  }

  // 其他方法
}
