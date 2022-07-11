import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PrefixRule } from './PrefixRule';
import { Transaction } from './Transaction';

export type CategoryType = 'income' | 'expense' | 'transfer';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column({ nullable: true })
  color: string;

  @OneToMany(() => PrefixRule, (rule) => rule.category, { cascade: true })
  prefixRules: PrefixRule[];

  @OneToMany(() => Transaction, (transaction) => transaction.upload)
  transactions: Transaction[];

  @ManyToOne(() => Category, (category) => category.subcategories, {
    nullable: true,
  })
  parentCategory: Category;

  @Column('text', {
    nullable: false,
    default: 'expense',
  })
  type: CategoryType;

  @Column('int', { nullable: true })
  parentCategoryId: number;

  @OneToMany(() => Category, (category) => category.parentCategory)
  subcategories: Category[];
}
