import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Libraries {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userid: number;

    @Column()
    status: number;

    @Column()

    @Column({ type: 'json' })
    components: [
        {
            name: string,
            tokens: object
        }
    ];

    @Column()
    disabled: boolean;

    @Column()
    hidden: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}