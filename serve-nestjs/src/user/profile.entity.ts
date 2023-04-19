import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gender: number;

  @Column()
  photo: string;

  @Column({ name: 'add' })
  address: string;

  @OneToOne(() => User) //初始化调用User
  @JoinColumn() //在Profile创建一个外键列
  user: User;
}
