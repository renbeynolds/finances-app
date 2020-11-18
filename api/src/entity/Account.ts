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

  @Column('double precision', { default: 0 })
  startingAmount: number;

  @Column('double precision')
  balance: number;

  @Column({ default: false })
  amountsInverted: boolean;

  @OneToMany(() => Upload, upload => upload.account)
  uploads: Upload[];

}
