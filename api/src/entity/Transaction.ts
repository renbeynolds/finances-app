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

    @Column('double precision', { scale: 2 })
    amount: number;

    @Column('double precision', { scale: 2 })
    balance: number;

    @Column('double precision', { scale: 2, default: 0 })
    balanceCorrection: number;

    @ManyToOne(() => Upload, upload => upload.transactions)
    upload: Upload;

    @ManyToMany(type => Tag)
    @JoinTable()
    tags: Tag[];

}
