import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Audit } from "./audit.entity";
import { Garden } from "./garden.entity";
import { PlantTypes } from "./plant-type.entity";
import { User } from "./user.entity";


@Entity({ name: 'plants' })
export class Plants extends Audit {
  @PrimaryGeneratedColumn({
    name: "id",
    type: "int"
  })
  id: number;

  @Column({
    name: "name"
  })
  name: string;

  @Column({
    name: "career_guide",
    nullable: true
  })
  careerGuide: string;

  @Column({
    name: "color"
  })
  color: string;

  @Column({
    name: "age"
  })
  age: number;

  @Column({
    name: "image",
    type: "text",
    array: true
  })
  image: string[];

  @ManyToOne(() => Garden, (garden) => garden.plants)
  @JoinColumn({ name: "garden_id" })
  garden: Garden;

  @ManyToOne(() => User, (user) => user.plants)
  @JoinColumn({ name: "owner" })
  owner: User;

  @OneToOne(() => PlantTypes, (plantType) => plantType.id)
  @JoinColumn({ name: "plant_type_id" })
  plantTypeId: PlantTypes;

}
