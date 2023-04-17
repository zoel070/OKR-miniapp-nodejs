import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './logical/user/user.service';
import { UserController } from './logical/user/user.controller';
import { WechatService } from './logical/wechat/wechat.service';
import { WechatController } from './logical/wechat/wechat.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController, WechatController],
  providers: [AppService, UserService, WechatService],
})
export class AppModule {}
