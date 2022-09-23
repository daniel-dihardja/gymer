import { Vendor } from "../../vendors/vendors.entity";

export class GetProductsDTO {
    id?: number;
    title: string;
    description: string;
    price: number;
    vendor: Vendor;
}
