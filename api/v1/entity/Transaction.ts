import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tag } from './Tag';

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("date")
    date: Date;

    @Column("text")
    description: string;

    @Column("double")
    amount: number;

    @ManyToMany(type => Tag)
    @JoinTable()
    tags: Tag[];

}
