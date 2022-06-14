import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './Category';

@Entity()
export class PrefixRule {
  constructor(prefix: string) {
    this.prefix = prefix;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  prefix: string;

  @Column('int')
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.prefixRules)
  category: Category;
}
