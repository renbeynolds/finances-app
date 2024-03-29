import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './Category';
import { Upload } from './Upload';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date')
  date: Date;

  @Column('text')
  description: string;

  @Column('text', { default: null })
  comment: string;

  @Column('numeric', {
    precision: 12,
    scale: 2,
  })
  amount: number;

  @Column('numeric', { precision: 12, scale: 2 })
  balance: number;

  @Column('numeric', { default: 0, precision: 12, scale: 2 })
  balanceCorrection: number;

  @Column('int')
  uploadId: number;

  @ManyToOne(() => Upload, (upload) => upload.transactions)
  upload: Upload;

  @Column('int', { nullable: true })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.transactions)
  category: Category;
}
