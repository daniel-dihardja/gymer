import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";
import { VendorProduct } from "../vendor-products/vendor-product.entity";

@Entity('userProduct')
export class UserProduct {
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

    @ManyToOne(type => User, user => user.products) user: User

    @ManyToOne(type => VendorProduct, product => product.productUsers) product: VendorProduct
}
