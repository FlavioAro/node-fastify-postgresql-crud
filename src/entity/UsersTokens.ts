import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class UsersTokens {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userid: number;

    @Column()
    status: number;

    @Column()

    @Column({ type: 'json' })
    tokens: [
        {
            name: string,
            values: object
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