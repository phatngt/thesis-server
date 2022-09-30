import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Audit } from './audit.entity';

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
}
