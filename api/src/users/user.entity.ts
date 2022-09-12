import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 45 })
    email:string;

    @Column({ length: 45})
    password:string;

    @Column()
    isActive:boolean;
}
