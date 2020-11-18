import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tag } from './Tag';
import { Upload } from './Upload';

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('date')
    date: Date;

    @Column('text')
    description: string;

    @Column('double precision')
    amount: number;

    @Column('double precision')
    balance: number;

    @ManyToOne(() => Upload, upload => upload.transactions)
    upload: Upload;

    @ManyToMany(type => Tag)
    @JoinTable()
    tags: Tag[];

}
