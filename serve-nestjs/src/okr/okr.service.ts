import { Injectable } from '@nestjs/common';
import { Okr } from './okr.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DateFormatter } from './date';
import { User } from 'src/user/user.entity';

@Injectable()
export class OkrService {
  constructor(
    @InjectRepository(Okr) private readonly okrRepository: Repository<Okr>,
  ) {}

  async index(user: User) {
    let okrs = await this.okrRepository.find({
      where: { user },
    });
    return (okrs = okrs.map((data) => {
      data.created_time = DateFormatter.formatTime(data.created_time);
      if (data.finished_time) {
        data.finished_time = DateFormatter.formatTime(data.finished_time);
      }
      return data;
    }));
  }

  async insert(newOkr: Partial<Okr>) {
    return this.okrRepository.save(newOkr); //save在级联关系上真好用
  }
}
