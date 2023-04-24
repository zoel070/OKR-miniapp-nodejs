import { Injectable } from '@nestjs/common';
import { Keyresult } from './keyresult.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/todo/todo.entity';

@Injectable()
export class KeyresultService {
  constructor(
    @InjectRepository(Keyresult)
    private readonly keyresultRepository: Repository<Keyresult>,
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async delete(id: number) {
    return this.keyresultRepository.delete(id);
  }

  async update(id: number, params: Partial<Keyresult>) {
    const krTemp = await this.keyresultRepository.findOne({ where: { id } });
    const newKr = this.keyresultRepository.merge(krTemp, params); //将多个实例合并为一个实例
    return this.keyresultRepository.save(newKr);
  }

  async addTodo(dto: any) {
    let kr = await this.keyresultRepository.findOne({
      where: { id: +dto.krId },
      relations: { todo: true }, //是必须的，外键得专门去调用
    });
    let newTodo = await this.todoRepository.findOne({
      where: { id: +dto.todoId },
    });
    kr.todo.push(newTodo);
    return this.keyresultRepository.save(kr);
  }

  async deleteTodo(dto: any) {
    let kr = await this.keyresultRepository.findOne({
      where: { id: +dto.krId },
      relations: { todo: true }, //是必须的，不然kr.todo会报错
    });
    for (let i = 0; i < kr.todo.length; i++) {
      if (kr.todo[i].id == +dto.todoId) {
        kr.todo.splice(i, 1);
      }
    }
    return this.keyresultRepository.save(kr);
  }
}
