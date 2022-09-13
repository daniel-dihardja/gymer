import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HeaderApiKeyStrategy } from "./auth-header-api-key.strategy";
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '60s'}
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
