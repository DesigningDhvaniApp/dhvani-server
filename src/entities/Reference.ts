import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reference {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'integer' })
  age: number

  @Column({ type: 'boolean' })
  isActive: boolean
}