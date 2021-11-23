import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column('money')
  amount: number;

  @Column('money')
  balance: number;

  @Column('money', { default: 0 })
  balanceCorrection: number;

  @ManyToOne(() => Upload, (upload) => upload.transactions)
  upload: Upload;

  @ManyToOne(() => Tag, (tag) => tag.transactions)
  tag: Tag;
}
