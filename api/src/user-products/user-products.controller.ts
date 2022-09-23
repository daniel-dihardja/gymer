import {
    Body,
    Controller,
    NotAcceptableException, NotFoundException,
    Post,
    Request,
    UnauthorizedException,
    UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from "../auth/jwt-auth-guard";
import { Credit } from "../credits/credit.entity";
import { CreditsService } from "../credits/credits.service";
import { UsersService } from "../users/users.service";
import { VendorProductsService } from "../vendor-products/vendor-products.service";
import { CreateUserProductDTO } from "./dto/create-user-product.dto";
import { UserProductsService } from "./user-products.service";

@Controller('uproducts')
export class UserProductsController {
    constructor(private creditsService: CreditsService,
                private productService: VendorProductsService,
                private upService: UserProductsService,
                private userService: UsersService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createUserProduct(@Body() createUserProductDTO: CreateUserProductDTO, @Request() req): Promise<void> {
        const user = await this.userService.getUserByEmail(req.user.username);
        if (!user) {
            throw new UnauthorizedException();
        }

        const credits = await this.creditsService.getUserCredits(user.id);
        if (! credits) {
            throw new NotAcceptableException();
        }

        const productId = createUserProductDTO.productId;
        const product = await this.productService.getProduct(productId);
        if (! product) {
            throw new NotFoundException();
        }

        if (product.price > credits.total) {
            throw new NotAcceptableException()
        }

        // 1. Create user product

        const userProduct = {
            user: user,
            product: product,
            price: product.price,
        }

        await this.upService.createUserProduct(userProduct);

        // 2. Substract user credits
        const credit: Credit = {
            amount: -(product.price),
            ref: product.title,
            total: credits.total - product.price,
            user: user,
            price: product.price // assume 1 credit equals 1 €
        }

        await this.creditsService.createCredit(credit);
    }
}
