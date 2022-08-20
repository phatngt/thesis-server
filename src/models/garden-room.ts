import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Audit } from "./audit.entity";
import { User } from "./user.entity";

@Entity('garden_room')
export class GardenRoom extends Audit {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @Column()
  image: string

  @Column()
  size: number

  @Column()
  location: string

  @OneToOne(type => GardenRoom, (gardenRoom) => gardenRoom.id)
  @JoinColumn({ name: "parent_room_id" })
  parent_room_id: number

  @OneToOne(type => User, (user) => user.id)
  @JoinColumn({ name: "owner" })
  owner: number
}
