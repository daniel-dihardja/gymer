import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreditsModule } from "../credits/credits.module";
import { UsersModule } from "../users/users.module";
import { VendorProductsModule } from "../vendor-products/vendor-products.module";
import { UserProduct } from "./user-product.entity";
import { UserProductsController } from './user-products.controller';
import { UserProductsService } from './user-products.service';

@Module({
    providers: [UserProductsService],
    controllers: [UserProductsController],
    imports: [
        CreditsModule,
        VendorProductsModule,
        TypeOrmModule.forFeature([UserProduct]),
        UsersModule
    ]
})
export class UserProductsModule {
}
