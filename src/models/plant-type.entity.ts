import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Audit } from './audit.entity';
import { WaterScheduler } from './water-scheduler.entity';

@Entity({ name: 'plant_type' })
export class PlantTypes extends Audit {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'name',
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    name: 'description',
  })
  description: string;

  @Column({
    name: 'family',
  })
  family: string;

  @Column({
    name: 'genus',
  })
  genus: string;

  @Column({
    name: 'species',
  })
  species: string;

  @Column({
    name: 'light',
    default: 'MEDIUM',
  })
  light: string;

  @OneToMany(() => WaterScheduler, (ws) => ws.plantTypes)
  waterScheduler: WaterScheduler[];
}
