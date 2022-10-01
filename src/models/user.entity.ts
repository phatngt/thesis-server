import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Audit } from './audit.entity';
import { Plants } from "./plants.entity";
import { Roles } from './roles.entity';
import { UserType } from './user-types.entity';

@Entity({ name: 'user' })
export class User extends Audit {

  @PrimaryGeneratedColumn('increment') id: number;

  @Column()
  lname: string;

  @Column()
  fname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column({
    nullable: true
  })
  address: string;

  @Column({
    nullable: true
  })
  birthday: string;

  @Column({
    default: false
  })
  is_premium: boolean;

  @ManyToOne(() => Roles, (role) => role.name)
  @JoinColumn({ name: 'role' })
  role: Roles;

  @ManyToOne(() => UserType, (usertype) => usertype.id)
  @JoinColumn({ name: 'user_type' })
  user_type: UserType;

  @OneToMany(() => Plants, (plants) => plants.owner)
  plants: Plants;

}
