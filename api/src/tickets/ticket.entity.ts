import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";
import { VendorProduct } from "../vendor-products/vendor-product.entity";

@Entity('ticket')
export class Ticket {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column({ default: 0 })
    status?: number;

    @CreateDateColumn()
    openDate?: Date

    @Column({ default: null })
    closeDate?: Date

    @Column()
    price?: number;

    @ManyToOne(type => User, user => user.tickets) user: User

    @ManyToOne(type => VendorProduct, product => product.tickets) product: VendorProduct
}
