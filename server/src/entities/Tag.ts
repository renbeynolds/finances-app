import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PrefixRule } from './PrefixRule';
import { Transaction } from './Transaction';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column({
    default: '#999999',
  })
  color: string;

  @OneToMany(() => PrefixRule, (rule) => rule.tag, { cascade: true })
  prefixRules: PrefixRule[];

  @OneToMany(() => Transaction, (transaction) => transaction.upload)
  transactions: Transaction[];
}
