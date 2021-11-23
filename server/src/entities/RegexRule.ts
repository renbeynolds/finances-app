import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tag } from './Tag';

@Entity()
export class RegexRule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pattern: string;

  @ManyToOne(() => Tag, (tag) => tag.regexRules)
  tag: Tag;
}
