import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserProduct } from "./user-product.entity";

@Injectable()
export class UserProductsService {
    constructor(@InjectRepository(UserProduct) private uproductRepository: Repository<UserProduct>) {
    }

    async createUserProduct(userProduct: UserProduct): Promise<UserProduct> {
        return this.uproductRepository.save(userProduct);
    }
}
