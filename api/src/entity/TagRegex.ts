import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tag } from './Tag';

@Entity()
export class TagRegex {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    regex: string;

    @ManyToOne(() => Tag, tag => tag.regexes)
    tag: Tag;

}
