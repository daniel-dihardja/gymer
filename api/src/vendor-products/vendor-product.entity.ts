import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Vendor } from "../vendors/vendors.entity";

@Entity('vendorProduct')
export class VendorProduct {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({length: 45})
    title: string

    @ManyToOne(type => Vendor, vendor => vendor.products) vendor: Vendor
}
