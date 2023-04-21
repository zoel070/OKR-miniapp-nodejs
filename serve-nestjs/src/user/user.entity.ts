import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Okr } from 'src/okr/okr.entity';
import { Todo } from 'src/todo/todo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  open_id: string;

  @Column({ nullable: true })
  union_id: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '创建时间',
    nullable: true,
  })
  created_time: Date;

  //主实体
  @OneToMany(() => Okr, (okr) => okr.user) //第一个是指定目标实体，第二个是指定目标的字段
  // @JoinColumn()   //建不出来的
  okr: Okr[]; //定义自己表中的字段名，关联目标实体的主键id。//虽然在数据库没有创建出字段来，但是不代表字段不存在

  //主实体
  @OneToMany(() => Todo, (todo) => todo.user)
  todo: Todo[];
}
