import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { DateFormatter } from './date';
import { User } from 'src/user/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  async index(user: User, status: number) {
    // let user = await this.userRepository.findOne({
    //   where: { id: 1 },
    // }); //不能用纯数字userid，必须用user实体
    let todos = await this.todoRepository.find({
      where: { status, user },
    });
    return (todos = todos.map((data) => {
      data.created_time = DateFormatter.formatTime(data.created_time);
      if (data.finished_time) {
        data.finished_time = DateFormatter.formatTime(data.finished_time);
      }
      return data;
    }));
  }

  async insert(todo: Partial<Todo>) {
    // todo.user = await this.userRepository.findOne({
    //   where: { id: 1 },
    // }); //装User是可行的
    todo.user = 1; //插入的话，装Id是可行的,但如果是查找的话，userId用纯数字是无效的
    let td = this.todoRepository.create(todo); //typeorm库中的todoRepository，create()方法并没有自动保存文档，需要调用save()方法
    return this.todoRepository.save(td);
  }

  async update(id: any, params: Partial<Todo>) {
    // 级联更新，需要使用save方法或者queryBuilder，可以实现同时修改多个表
    const todoTemp = await this.findTodo(id);
    const newTodo = this.todoRepository.merge(todoTemp, params); //将多个实体合并为一个实体
    return this.todoRepository.save(newTodo);
    // 下面的update方法，只适合单模型的更新，不适合有关系的模型更新
    // return this.userRepository.update(parseInt(id), newUser);
  }

  async findTodo(id: number) {
    return this.todoRepository.findOne({
      where: {
        id,
      },
      // relations:{
      //   keyresult:true
      // }
    });
  }

  async remove(id: number) {
    const todo = await this.findTodo(id);
    return this.todoRepository.remove(todo);
  }
}

//级联增加 good cascade
//级联删除 good cascade onDelete
//级联修改 good cascade onUpdate
//级联查找 good
