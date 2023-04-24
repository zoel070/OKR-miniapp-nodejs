import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import * as Joi from 'joi';
import { Response } from 'express'; //太关键了，每个类型都得有引用来源

@Controller('login')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async oAuthMini(@Body() body: any, @Res() res: Response) {
    const schema = Joi.object({
      code: Joi.string().required(),
    });
    const { error, value } = schema.validate(body);
    if (error) {
      throw new Error(error.message);
    }
    const { code } = body;
    try {
      const wechatUserInfo = await this.userService.oAuthMini(code);
      const token = await this.userService.token(wechatUserInfo.id);
      return res.status(200).json({ data: { token } });
    } catch (e) {
      return res.status(404).json({
        message: e.message || e.errors || e.errmsg,
      });
    }
  }
}
