import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RegexRule } from './RegexRule';
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

  @OneToMany(() => RegexRule, (rule) => rule.tag, { cascade: true })
  regexRules: RegexRule[];

  @OneToMany(() => Transaction, (transaction) => transaction.upload)
  transactions: Transaction[];
}
