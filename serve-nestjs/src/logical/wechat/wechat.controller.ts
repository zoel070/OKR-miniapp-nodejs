import { Controller, Post, Body } from '@nestjs/common';
import { Schema, SchemaValues } from 'async-validator';
import { WechatService } from './wechat.service';
import { UserService } from '../user/user.service';

@Controller('wechat')
export class WechatController {
  constructor(
    private readonly wechatService: WechatService,
    private readonly userService: UserService,
  ) {}

  @Post('oAuthMini')
  async oAuthMini(@Body() body: { code: string }) {
    const validator = new Schema({
      code: { type: 'string', required: true },
    });
    try {
      await validator.validate(body);
      const wechatUserInfo = await this.wechatService.oAuthMini(body.code);
      const token = await this.userService.token(wechatUserInfo.id);
      return { error_code: 0, data: { token } };
    } catch (e) {
      return { error_code: 1, message: e.message || e.errors || e.errmsg };
    }
  }
}
