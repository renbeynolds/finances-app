import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Upload } from './Upload';

export enum AccountAmountsType {
  NEGATIVE_AMOUNT_EXPENSE = 'negamtexp',
  POSITIVE_AMOUNT_EXPENSE = 'posamtexp',
  SEPARATE_TYPE_COLUMN = 'septypecol',
}

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  dateHeader: string;

  @Column()
  descriptionHeader: string;

  @Column()
  amountHeader: string;

  @Column({ nullable: true })
  typeHeader: string;

  @Column('numeric', { default: 0, precision: 12, scale: 2 })
  startingAmount: number;

  @Column('numeric', { default: 0, precision: 12, scale: 2 })
  balance: number;

  @Column({
    type: 'enum',
    enum: AccountAmountsType,
  })
  amountsType: AccountAmountsType;

  @Column({ nullable: true })
  color: string;

  @OneToMany(() => Upload, (upload) => upload.account)
  uploads: Upload[];
}
