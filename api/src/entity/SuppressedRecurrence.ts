import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class SuppressedRecurrence {

    @PrimaryColumn()
    recurrenceId: number;

}
