import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { VendorProduct } from "../vendor-products/vendor-product.entity";

@Entity('vendor')
export class Vendor {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ length: 45 })
    name?: string;

    @OneToMany(type => VendorProduct, vendorProduct => vendorProduct.vendor) products: VendorProduct[]
}
