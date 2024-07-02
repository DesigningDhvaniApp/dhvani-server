import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./Address";

@Entity()
export class Member {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar' })
  firstName: string

  @Column({ type: 'varchar' })
  lastName: string

  @Column({ type: 'bigint' })
  phone: number

  @Column({ type: 'varchar' })
  userName: string

  @Column({ type: 'varchar' })
  email: string

  @Column({ type: 'varchar' })
  password: string

  @OneToOne(() => Address, { cascade: true })
  @JoinColumn({ name: 'address_id' })
  address: Address
}