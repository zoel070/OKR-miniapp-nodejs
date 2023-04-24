import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Wechat } from 'wechat-jssdk';
// import wechatConfig from '../../wechatConfig.js';  //CommonJS模块导出方式不能使用import
const wechatConfig = require('../../wechatConfig.js');
import * as JWT from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  private wx: Wechat; // 将其声明为类成员变量，然后使用 public 或 private 进行修饰
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    this.wx = new Wechat(wechatConfig); //初始化
  } //不能把wx声明放在构造函数的参数里面，不能同时为该属性声明和初始化，否则会编译混乱。

  async oAuthMini(code: string) {
    //code换openId，然后取出或插入数据
    const sessionInfo = await this.wx.miniProgram.getSession(code);
    let user = await this.userRepository.findOne({
      where: { open_id: sessionInfo.openid },
    });
    if (!user) {
      const newUser = this.userRepository.create({
        open_id: sessionInfo.openid,
        union_id: sessionInfo.unionid ?? null,
      });
      user = await this.userRepository.save(newUser);
    }
    return {
      id: user.id,
    };
  }

  private get jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  async token(userId: number): Promise<string> {
    return JWT.sign({ user_id: userId }, this.jwtSecret, { expiresIn: '360d' });
  }

  async create(user: Partial<User>) {
    const userTmp = await this.userRepository.create(user);
    return this.userRepository.save(userTmp);
  }

  async show(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  // remove(id: number) {
  //   return this.userRepository.delete(id); //传的是id，硬删除，不推荐。
  // } //remove传的是实体，可以配合钩子方法。
}
