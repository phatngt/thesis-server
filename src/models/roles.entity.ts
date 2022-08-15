import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'roles' })
export class Roles {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @Column({ nullable: true })
  desc: string
}
