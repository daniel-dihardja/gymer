import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GetProductsDTO } from "./dto/get-products.dto";
import { VendorProduct } from "./vendor-product.entity";

@Injectable()
export class VendorProductsService {
    constructor(@InjectRepository(VendorProduct) private productRepository: Repository<VendorProduct>) {}

    async getProducts(): Promise<GetProductsDTO[]> {
        return this.productRepository.find()
    }
}
