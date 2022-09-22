import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from "../auth/jwt-auth-guard";
import { GetProductsDTO } from "./dto/get-products.dto";
import { VendorProductsService } from "./vendor-products.service";

@Controller('products')
export class VendorProductsController {
    constructor(private service: VendorProductsService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getProducts(): Promise<GetProductsDTO[]> {
        return this.service.getProducts();
    }
}
