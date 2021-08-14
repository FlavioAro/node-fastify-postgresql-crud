import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userid: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column({ type: 'json' })
    name: {
        firstname: string,
        lastname: string
    };

    @Column()
    hasNotification: boolean;

    @Column()
    disabled: boolean;

    @Column()
    hidden: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}