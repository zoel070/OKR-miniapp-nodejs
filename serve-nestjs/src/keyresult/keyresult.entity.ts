import { Okr } from 'src/okr/okr.entity';
import { Todo } from 'src/todo/todo.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Keyresult {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Okr, (okr) => okr.keyresult, { onDelete: 'CASCADE' })
  @JoinColumn()
  okr: Okr;

  @Column()
  title: string;

  @Column({ default: 0 })
  status: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_time: Date;

  @Column({ type: 'timestamp', nullable: true })
  finished_time: Date | null;

  @ManyToMany(() => Todo, (todo) => todo.keyresult)
  @JoinTable({ name: 'todo_keyresult' })
  todo: Todo[];
}
