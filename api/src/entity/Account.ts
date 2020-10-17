import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AccountSettings } from './AccountSettings';
import { Transaction } from './Transaction';

@Entity()
export class Account {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
      unique: true
    })
    name: string;

    @OneToMany(() => Transaction, transaction => transaction.account)
    transactions: Transaction[];

    @OneToOne(type => AccountSettings)
    @JoinColumn()
    settings: AccountSettings;

}
