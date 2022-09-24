import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreditsModule } from "../credits/credits.module";
import { UsersModule } from "../users/users.module";
import { VendorProductsModule } from "../vendor-products/vendor-products.module";
import { Ticket } from "./ticket.entity";
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';

@Module({
    providers: [TicketsService],
    controllers: [TicketsController],
    imports: [
        CreditsModule,
        VendorProductsModule,
        TypeOrmModule.forFeature([Ticket]),
        UsersModule
    ]
})
export class TicketsModule {
}
