import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './Account';
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

    @ManyToOne(() => Account, account => account.transactions)
    account: Account;

    @ManyToMany(type => Tag)
    @JoinTable()
    tags: Tag[];

}
