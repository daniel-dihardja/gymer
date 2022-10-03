import {
    Body,
    Controller,
    Get,
    NotAcceptableException,
    NotFoundException,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from "../auth/jwt-auth-guard";
import { Roles } from "../auth/role.decorator";
import { Role } from "../auth/role.enum";
import { RolesGuard } from "../auth/role.guard";
import { Credit } from "../credits/credit.entity";
import { CreditsService } from "../credits/credits.service";
import { UsersService } from "../users/users.service";
import { VendorProductsService } from "../vendor-products/vendor-products.service";
import { CreateTicketDTO } from "./dto/create-ticket.dto";
import { ValidateTicketDTO } from "./dto/validate-ticket.dto";
import { Ticket } from "./ticket.entity";
import { TicketsService } from "./tickets.service";

@Controller('tickets')
export class TicketsController {
    constructor(private creditsService: CreditsService,
                private productService: VendorProductsService,
                private ticketService: TicketsService,
                private userService: UsersService) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createTicket(@Body() createUserProductDTO: CreateTicketDTO, @Request() req): Promise<void> {
        const user = req.user;
        const credits = await this.creditsService.getUserCredits(user.id);
        if (!credits) {
            throw new NotAcceptableException();
        }

        const productId = createUserProductDTO.productId;
        const product = await this.productService.getProduct(productId);
        if (!product) {
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

        await this.ticketService.createTicket(userProduct);

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

    @Get()
    @UseGuards(JwtAuthGuard)
    async getTickets(@Request() req): Promise<Ticket[]> {
        const user = req.user;
        return this.ticketService.getTickets(user.id);
    }

    @Post('validate')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Vendor)
    async validate(@Body() validateTicketDTO: ValidateTicketDTO): Promise<void> {
        const ticket = await this.ticketService.getTicket(validateTicketDTO.ticketId)
        if (!ticket) {
            throw new NotFoundException()
        }
        if (ticket.status !== 0) {
            throw new NotAcceptableException()
        }
    }
}
