import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Credit } from "../credits/credit.entity";
import { User } from "../users/user.entity";
import { UserProduct } from "./user-product.entity";

@Injectable()
export class UserProductsService {
    constructor(@InjectRepository(UserProduct) private uproductRepository: Repository<UserProduct>) {
    }

    async createUserProduct(userProduct: UserProduct): Promise<UserProduct> {
        return this.uproductRepository.save(userProduct);
    }

    async getUserProducts(userId: number): Promise<UserProduct[]> {
        const queryBuilder = this.uproductRepository.createQueryBuilder();
        const tickets = await queryBuilder
            .select('userProduct')
            .from(UserProduct, 'userProduct')
            .where("userProduct.userId = :id", { id: userId })
            .getMany()
        return tickets;
    }
}
