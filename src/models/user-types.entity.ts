import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Audit } from './audit';

@Entity({ name: 'user_types' })
export class UserType extends Audit {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  type: string;

  @Column({
    nullable: true
  })
  desc: string;
}
