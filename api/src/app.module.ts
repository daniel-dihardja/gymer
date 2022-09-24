import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from "./auth/auth.module";
import { Credit } from "./credits/credit.entity";
import { CreditsModule } from './credits/credits.module';
import { Ticket } from "./tickets/ticket.entity";
import { TicketsModule } from './tickets/tickets.module';
import { User } from "./users/user.entity";
import { UsersModule } from './users/users.module';
import { VendorProduct } from "./vendor-products/vendor-product.entity";
import { VendorProductsModule } from './vendor-products/vendor-products.module';
import { Vendor } from "./vendors/vendors.entity";
import { VendorsModule } from './vendors/vendors.module';

@Module({
    imports: [UsersModule, TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'user',
        password: 'user',
        database: 'test',
        entities: [User, Credit, Vendor, VendorProduct, Ticket],
        synchronize: true,
        dropSchema: false,
    }),
        AuthModule,
        CreditsModule,
        VendorsModule,
        VendorProductsModule,
        TicketsModule,
        CreditsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
    exports: [UsersModule, VendorProductsModule]
})
export class AppModule {
}
