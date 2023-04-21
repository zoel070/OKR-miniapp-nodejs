import { Keyresult } from 'src/keyresult/keyresult.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'todo' })
export class Todo {
  @PrimaryGeneratedColumn({ comment: '主键ID' })
  id: number;

  @Column({ type: 'varchar', length: 255, comment: '标题' })
  title: string;

  @Column({ type: 'tinyint', default: 0, comment: '状态：0-未完成，1-完成' })
  status: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '创建时间',
  })
  created_time: Date | string;

  @Column({ type: 'timestamp', nullable: true, comment: '完成时间' })
  finished_time: Date | null | string;

  @ManyToOne(() => User, (user) => user.todo)
  @JoinColumn()
  user: User | number;

  @ManyToMany(() => Keyresult, (keyresult) => keyresult.todo)
  keyresult: Keyresult[];
}
