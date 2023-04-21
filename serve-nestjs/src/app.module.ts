import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user/user.entity';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { OkrController } from './okr/okr.controller';
import { KeyresultController } from './keyresult/keyresult.controller';
import { TodoController } from './todo/todo.controller';
import { Okr } from './okr/okr.entity';
import { Todo } from './todo/todo.entity';
import { Keyresult } from './keyresult/keyresult.entity';
import { TodoService } from './todo/todo.service';
import { OkrService } from './okr/okr.service';
import { KeyresultService } from './keyresult/keyresult.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Okr, Todo, Keyresult]), // 导入UserRepository
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
      database: 'nest-v1',
      entities: [User, Okr, Todo, Keyresult],
      logging: false, //打印每次sql语句
      synchronize: true, //很关键，同步本地的schema与数据库 -> 初始化的时候去使用
    }),
  ],
  controllers: [
    UserController,
    OkrController,
    KeyresultController,
    TodoController,
  ],
  providers: [UserService, TodoService, OkrService, KeyresultService],
})
export class AppModule {}
