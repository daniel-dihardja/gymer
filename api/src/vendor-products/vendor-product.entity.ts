import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserProduct } from "../user-products/user-product.entity";
import { Vendor } from "../vendors/vendors.entity";

@Entity('vendorProduct')
export class VendorProduct {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ length: 45 })
    title: string

    @Column('text')
    description: string

    @Column()
    price: number

    @ManyToOne(type => Vendor, vendor => vendor.products) vendor: Vendor

    @OneToMany(type => UserProduct, up => up.product) productUsers: UserProduct[]

}
