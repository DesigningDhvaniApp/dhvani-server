import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ type: 'bigint' })
  goalAmount: number;

  @Column({ type: 'bigint', default: 0 })
  fundRaised: number;

  @Column({ type: 'varchar' })
  aboutTheCause: string;

  @Column({ type: 'varchar', nullable: true })
  planOfAction?: string;

  @Column({
    type: 'enum',
    enum: ['COMPLETED', 'ONGOING', 'UPCOMING'],
    default: 'UPCOMING'
  })
  status: 'COMPLETED' | 'ONGOING' | 'UPCOMING';

  @Column({ type: 'varchar', nullable: true })
  flyer?: string;
}
