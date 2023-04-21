import { Keyresult } from 'src/keyresult/keyresult.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Okr {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.okr) //从属实体
  @JoinColumn()
  user: User | number;

  @Column({ comment: '目标' })
  title: string;

  @Column({ type: 'integer', default: 0, comment: '状态：0-未完成，1-完成' })
  status: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '创建时间',
  })
  created_time: Date | string;

  @Column({ type: 'timestamp', nullable: true, comment: '完成时间' })
  finished_time: Date | null | string;

  @OneToMany(() => Keyresult, (keyresult) => keyresult.okr, { cascade: true }) //使用级联保存功能时，必须在实体类中使用 cascade 属性设置级联操作，才能够实现级联新增。
  keyresult: Keyresult[];
}
