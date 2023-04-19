import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user/user.entity';
import { Profile } from './user/profile.entity';
import { Roles } from './roles/roles.entity';
import { Logs } from './logs/logs.entity';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // 导入UserRepository
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_PORT: Joi.number().default(3306),
        DB_URL: Joi.string().domain(),
        DB_HOST: Joi.string().ip(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'testdb',
      entities: [User, Profile, Roles, Logs],
      logging: ['error'],
      synchronize: true, //很关键，同步本地的schema与数据库 -> 初始化的时候去使用
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
