import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Audit } from './audit.entity';
import { PlantTypes } from './plant-type.entity';

@Entity({ name: 'water_scheduler' })
export class WaterScheduler extends Audit {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' }) id: number;

  @Column({
    name: 'name',
    type: 'text',
  })
  name: string;

  @Column({
    name: 'description',
    type: 'text',
  })
  description: string;

  @Column({
    name: 'water_quantity',
    type: 'int',
  })
  waterQuantity: number;

  @Column({
    name: 'scheduled',
    type: 'timestamp',
  })
  scheduled: Date;

  @ManyToOne(() => PlantTypes, (pt) => pt.waterScheduler)
  @JoinColumn({
    name: 'plant_type_id',
  })
  plantTypes: PlantTypes;
}
