import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Ds {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userid: number;

    @Column()
    dsname: string;

    @Column()
    dsprefix: string;

    @Column()
    disabled: boolean;

    @Column()
    hidden: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    
}