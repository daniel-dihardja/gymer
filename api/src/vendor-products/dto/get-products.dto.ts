import { Vendor } from "../../vendors/vendors.entity";

export class GetProductsDTO {
    title: string;
    description: string;
    price: number;
    vendor: Vendor;
}
