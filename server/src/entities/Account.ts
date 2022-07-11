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

  @Column('numeric', { default: 0, precision: 12, scale: 2 })
  startingAmount: number;

  @Column('numeric', { default: 0, precision: 12, scale: 2 })
  balance: number;

  @Column({ default: false })
  amountsInverted: boolean;

  @Column({ nullable: true })
  color: string;

  @OneToMany(() => Upload, (upload) => upload.account)
  uploads: Upload[];
}
