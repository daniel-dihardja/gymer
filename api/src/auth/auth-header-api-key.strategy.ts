import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-headerapikey';
import { UsersService } from "../users/users.service";

@Injectable()
export class HeaderApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
    constructor(
        private readonly userService: UsersService,
        private readonly configService: ConfigService,
    ) {
        super({ header: 'X-API-KEY', prefix: '' },
            true,
            async (apiKey, done) => {
                return this.validate(apiKey, done);
            });
    }

    public validate = async (apiKey: string, done: (error: Error, data) => {}) => {
        const userApiKey = this.configService.get<string>('API_KEY');
        if (userApiKey === apiKey) {
            done(null, true);
        }
        done(new UnauthorizedException(), null);
    }
}
