import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AccountSettings } from './AccountSettings';
import { Upload } from './Upload';

@Entity()
export class Account {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
      unique: true
    })
    name: string;

    @OneToOne(type => AccountSettings)
    @JoinColumn()
    settings: AccountSettings;

    @OneToMany(() => Upload, upload => upload.account)
    uploads: Upload[];

}
