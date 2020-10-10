import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AccountSettings {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dateHeader: string;

    @Column()
    descriptionHeader: string;

    @Column()
    amountHeader: string;

    @Column()
    amountsInverted: boolean;

}
