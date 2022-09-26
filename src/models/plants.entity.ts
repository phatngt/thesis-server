import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Audit } from "./audit.entity";
import { GardenRoom } from "./garden-room.entity";
import { PlantTypes } from "./plant-type.entity";
import { User } from "./user.entity";


@Entity({ name: 'plants' })
export class Plants extends Audit {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @Column()
  career_guide: string

  @Column()
  color: string

  @Column()
  age: number

  @Column('text', { array: true })
  image: string[]

  @ManyToMany((type) => GardenRoom, (gardenRoom) => gardenRoom.id)
  @JoinColumn({ name: "garden_room_id" })
  garden_room_id: GardenRoom[]

  @OneToOne((type) => User, (user) => user.id)
  @JoinColumn({ name: "owner" })
  owner: User

  @OneToOne((type) => PlantTypes, (plantType) => plantType.id)
  @JoinColumn({ name: "plant_type_id" })
  plant_type_id: PlantTypes

}
