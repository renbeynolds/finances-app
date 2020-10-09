import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from './Transaction';

@Entity()
export class Account {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Transaction, transaction => transaction.account)
    transactions: Transaction[];

}
