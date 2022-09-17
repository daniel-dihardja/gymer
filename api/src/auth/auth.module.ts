import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { HeaderApiKeyStrategy } from "./auth-header-api-key.strategy";
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60m' }
        }),
        ConfigModule,
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        HeaderApiKeyStrategy,
    ],
    exports: [AuthService]
})
export class AuthModule {
}
