import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Audit } from "./audit.entity";

export enum Light {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW"
}

@Entity({ name: 'plant_type' })
export class PlantTypes extends Audit {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({
    nullable: false,
    unique: true,
  })
  name: string

  @Column()
  description: string

  @Column()
  family: string

  @Column()
  genus: string

  @Column()
  species: string

  @Column({
    default: Light.MEDIUM
  })
  light: string

}
