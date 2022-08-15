import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Audit } from './audit';
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
  pwd: string;

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

  @OneToOne(type => Roles, (role) => role.name)
  @JoinColumn({ name: 'role_id' })
  role_id: Roles

  @OneToOne(type => UserType, (usertype) => usertype.id)
  user_type: number;

}
