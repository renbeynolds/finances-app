import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TagRegex } from './TagRegex';

@Entity()
export class Tag {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  name: string;

  @Column({
    default: '#999999'
  })
  color: string;

  @OneToMany(() => TagRegex, tagRegex => tagRegex.tag, { cascade: true })
  regexes: TagRegex[];

}
