import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './Account';
import { Transaction } from './Transaction';

@Entity()
export class Upload {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column('int')
  accountId: number;

  @ManyToOne(() => Account, (account) => account.uploads)
  account: Account;

  @OneToMany(() => Transaction, (transaction) => transaction.upload)
  transactions: Transaction[];
}
