import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tag } from './Tag';

@Entity()
export class RegexRule {
  constructor(pattern: string) {
    this.pattern = pattern;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pattern: string;

  @ManyToOne(() => Tag, (tag) => tag.regexRules)
  tag: Tag;
}
