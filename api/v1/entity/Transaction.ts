import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("date")
    date: Date;

    @Column("text")
    description: string;

}
