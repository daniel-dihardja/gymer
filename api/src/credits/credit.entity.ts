import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";

@Entity('credit')
export class Credit {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    amount: number

    @Column()
    ref: string

    @Column()
    total: number

    @Column()
    price?: number

    @ManyToOne(type => User, user => user.credits) user: User

    @CreateDateColumn()
    createdAt?: Date;
}
