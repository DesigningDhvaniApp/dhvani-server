import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'bigint' })
  phone: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  message: string;
}
