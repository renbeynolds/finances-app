import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tag } from './Tag';

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
  tagId: number;

  @ManyToOne(() => Tag, (tag) => tag.prefixRules)
  tag: Tag;
}
