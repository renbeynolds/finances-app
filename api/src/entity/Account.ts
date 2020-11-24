import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Upload } from './Upload';

@Entity()
export class Account {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  name: string;

  @Column()
  dateHeader: string;

  @Column()
  descriptionHeader: string;

  @Column()
  amountHeader: string;

  @Column('double precision', { default: 0, scale: 2 })
  startingAmount: number;

  @Column('double precision', { default: 0, scale: 2 })
  balance: number;

  @Column({ default: false })
  amountsInverted: boolean;

  @Column({
    default: '#999999'
  })
  color: string;

  @OneToMany(() => Upload, upload => upload.account)
  uploads: Upload[];

}
