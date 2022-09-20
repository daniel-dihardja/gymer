import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from "./auth/auth.module";
import { Credit } from "./credits/credit.entity";
import { CreditsModule } from './credits/credits.module';
import { User } from "./users/user.entity";
import { UsersModule } from './users/users.module';
import { VendorProduct } from "./vendor-products/vendor-product.entity";
import { VendorsModule } from './vendors/vendors.module';
import { Vendor } from "./vendors/vendors.entity";
import { VendorProductsModule } from './vendor-products/vendor-products.module';

@Module({
    imports: [UsersModule, TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'user',
        password: 'user',
        database: 'test',
        entities: [User, Credit, Vendor, VendorProduct],
        synchronize: true,
        dropSchema: false
    }),
        AuthModule,
        CreditsModule,
        VendorsModule,
        VendorProductsModule],
    controllers: [AppController],
    providers: [AppService],
    exports: [UsersModule]
})
export class AppModule {
}
