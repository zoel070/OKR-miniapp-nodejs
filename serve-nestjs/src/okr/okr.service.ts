import { Injectable } from '@nestjs/common';
import { Okr } from './okr.entity';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DateFormatter } from './date';
import { User } from 'src/user/user.entity';
import { Keyresult } from 'src/keyresult/keyresult.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class OkrService {
  constructor(
    @InjectRepository(Okr) private readonly okrRepository: Repository<Okr>,
    @InjectRepository(Keyresult)
    private readonly keyresultRepository: Repository<Keyresult>,
    private userService: UserService,
  ) {}

  async index(user: User) {
    let okrs = await this.okrRepository.find({
      where: { user },
      relations: { keyresult: { todo: true } },
      order: { keyresult: { id: 'ASC' } }, //升序排列
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

  async update(id: any, params: Partial<Okr>) {
    const okrTemp = await this.findOkr(id);
    const newOkr = this.okrRepository.merge(okrTemp, params); //将多个实例合并为一个实例
    return this.okrRepository.save(newOkr);
  }

  async findOkr(id: number) {
    return this.okrRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    const okr = await this.findOkr(id);
    return this.okrRepository.remove(okr);
  }

  async delete(ids: number[]) {
    return this.keyresultRepository.delete(ids);
  }

  async edit(newOkr: any) {
    let user = await this.userService.show(1);
    let krs = newOkr.keyresult.map((data) => {
      if (data.id == 0) {
        const kr = new Keyresult();
        kr.title = data.title;
        return kr;
      }
      data.id = Number(data.id); //很关键，决定了数据库识别为旧键还是新键
      return data as Keyresult;
    }) as Keyresult[];
    const freshOkr = {
      user,
      title: newOkr.title,
      keyresult: krs,
    } as DeepPartial<Okr>;
    let oldOkr = await this.findOkr(newOkr.id);
    let brandOkr = this.okrRepository.merge(oldOkr, freshOkr);
    return this.okrRepository.save(brandOkr);
  }

  async show(id: number) {
    return this.okrRepository.findOne({
      where: { id },
      relations: { keyresult: { todo: true } }, //级联三表查询
    });
  }
}
