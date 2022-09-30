import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_type' })
export class UserType {
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
    name: "desc",
    nullable: true
  })
  desc: string;
}
