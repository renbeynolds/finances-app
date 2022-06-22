import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PrefixRule } from './PrefixRule';
import { Transaction } from './Transaction';

@Entity()
export class Category {
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

  @OneToMany(() => PrefixRule, (rule) => rule.category, { cascade: true })
  prefixRules: PrefixRule[];

  @OneToMany(() => Transaction, (transaction) => transaction.upload)
  transactions: Transaction[];

  @ManyToOne(() => Category, (category) => category.subcategories, {
    nullable: true,
  })
  parentCategory: Category;

  @Column('int', { nullable: true })
  parentCategoryId: number;

  @OneToMany(() => Category, (category) => category.parentCategory)
  subcategories: Category[];
}