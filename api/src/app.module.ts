import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from "./auth/auth.module";
import { User } from "./users/user.entity";
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'user',
    password: 'user',
    database: 'test',
    entities: [User],
    synchronize: true,
    dropSchema: true
  }),
  AuthModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [UsersModule]
})
export class AppModule {}
