import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Response } from 'express';
import { Todo } from './todo.entity';
import { UserService } from 'src/user/user.service';

@Controller('/todo')
export class TodoController {
  constructor(
    private todoService: TodoService,
    private userService: UserService,
  ) {}

  @Get()
  async index(@Query() param: any, @Res() res: Response) {
    let status = param.status;
    try {
      let user = await this.userService.show(1);
      let todos = await this.todoService.index(user, status);
      res.status(200).json({ data: { todos } });
    } catch (e) {
      res.status(404).json({
        message: e.message || e.errors || e.errmsg,
      });
    }
  }

  @Post()
  async insert(@Body() dto: any, @Res() res: Response) {
    let title = dto.title;
    if (!title) {
      throw new Error('No title!'); //主动抛出异常,打印到终端
    }
    let todo = { title };
    try {
      // return this.todoService.insert(todo); //不用res，直接return这个promise也是可行的
      let mes = await this.todoService.insert(todo);
      res.status(200).json({ data: { mes } });
    } catch (e) {
      res.status(404).json({
        message: e.message || e.errors || e.errmsg,
      });
    }
  }

  @Put('/:id')
  async update(@Param('id') id: any, @Body() body: any) {
    body.finished_time = Number(body.status) ? new Date() : null;
    let params = body as Partial<Todo>;
    return this.todoService.update(id, params); //就不能引用@Res() res: Response了
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return this.todoService.remove(+id); //等效于 Number(id)
  }
}
