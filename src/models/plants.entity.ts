import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Audit } from "./audit.entity";

export enum Light {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW"
}

@Entity()
export class Plants extends Audit {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  care_guide: string

  @Column()
  age: number


  @Column('varchar', { array: true })
  image: string[]

  @Column()
  family: string

  @Column()
  genus: string

  @Column()
  species: string

  @Column()
  color: string

  @Column()
  decoration_location: string

  @Column({
    type: 'enum',
    enum: Light,
    default: Light.MEDIUM
  })
  light: Light

  @Column()
  size: number

  @Column()
  location: string

  // @OneToOne(type => GardenRoom, (gardenRoom) => gardenRoom.id)
  // @JoinColumn({ name: "parent_room_id" })
  // parent_room_id: number

  // @OneToOne(type => User, (user) => user.id)
  // @JoinColumn({ name: "owner", })
  // owner: number
}
