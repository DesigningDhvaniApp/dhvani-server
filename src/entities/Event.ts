import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  eventName: string;

  @Column({ type: 'varchar' })
  eventType: string;

  @Column({ type: 'varchar' })
  eventDescription: string;

  @Column({ type: 'date' })
  eventStartDate: Date;

  @Column({ type: 'date' })
  eventEndDate: Date;

  @Column({ type: 'varchar' })
  eventOrganisers: string;

  @Column({ type: 'integer' })
  eventCost: number;

  @Column({ type: 'varchar' })
  eventVenue: string;

  @Column({ type: 'integer' })
  maxPlayers: number;

  @Column({ type: 'varchar', nullable: true })
  flyer?: string;
}
