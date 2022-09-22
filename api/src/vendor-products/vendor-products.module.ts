import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { VendorProduct } from "./vendor-product.entity";
import { VendorProductsController } from './vendor-products.controller';
import { VendorProductsService } from './vendor-products.service';

@Module({
  controllers: [VendorProductsController],
  providers: [VendorProductsService],
  imports: [TypeOrmModule.forFeature([VendorProduct]),]
})
export class VendorProductsModule {}
