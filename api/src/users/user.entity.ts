import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Credit } from "../credits/credit.entity";

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ length: 45 })
    firstName?: string;

    @Column({ length: 45 })
    lastName?: string;

    @Column({ length: 45 })
    email?: string;

    @Column({ length: 64 })
    password?: string;

    @Column({ length: 45, default: 'user' })
    role?: string;

    @Column({ length: 256, default: "" })
    activationToken?: string

    @Column({ default: 0 })
    recoveryCode?: number;

    @Column({ default: 0 })
    isActive?: number;

    @OneToMany(type => Credit, credit => credit.user) credits: Credit[]

    @CreateDateColumn()
    createdAt?: Date;
}
