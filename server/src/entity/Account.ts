import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Upload } from './Upload';

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

  @Column('money', { default: 0 })
  startingAmount: number;

  @Column('money', { default: 0 })
  balance: number;

  @Column({ default: false })
  amountsInverted: boolean;

  @Column({
    default: '#999999',
  })
  color: string;

  @OneToMany(() => Upload, (upload) => upload.account)
  uploads: Upload[];
}
