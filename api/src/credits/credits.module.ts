import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "../users/users.module";
import { Credit } from "./credit.entity";
import { CreditsController } from './credits.controller';
import { CreditsService } from './credits.service';

@Module({
    providers: [CreditsService],
    controllers: [CreditsController],
    imports: [TypeOrmModule.forFeature([Credit]), UsersModule]
})
export class CreditsModule {
}
