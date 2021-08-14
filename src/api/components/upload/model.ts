import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Imagens {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column()
    filename: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}