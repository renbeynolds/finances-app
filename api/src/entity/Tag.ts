import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TagRegex } from './TagRegex';

@Entity()
export class Tag {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    color: string;

    @OneToMany(() => TagRegex, tagRegex => tagRegex.tag)
    regexes: TagRegex[];

}
