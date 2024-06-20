import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    addressLine: string

    @Column()
    country: string

    @Column()
    zipcode: number
}

