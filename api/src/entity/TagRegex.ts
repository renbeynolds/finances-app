import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tag } from './Tag';

@Entity()
export class TagRegex {

  constructor(pattern: string) {
    this.pattern = pattern;
  }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pattern: string;

    @ManyToOne(() => Tag, tag => tag.regexes)
    tag: Tag;

}
