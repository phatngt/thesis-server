import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Audit } from './audit.entity';
import { Plants } from './plants.entity';
import { User } from './user.entity';

@Entity({ name: 'garden' })
export class Garden extends Audit {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'image' })
  image: string;

  @Column({ name: 'size' })
  size: number;

  @Column({ name: 'location' })
  location: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'owner' })
  owner: User;

  @OneToMany(() => Plants, (plant) => plant.garden)
  plants: Plants[];
}
