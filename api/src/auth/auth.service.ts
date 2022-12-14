import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from "../users/dto/create-user.dto";
import { User } from "../users/user.entity";
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
                private jwtService: JwtService) {
    }

    async validateUser(email: string, pass: string): Promise<User> {
        const user = await this.usersService.getUserByEmail(email);
        if (user) {
            const isMatch = await bcrypt.compare(pass, user.password);
            if (isMatch) {
                const { password, ...result } = user;
                return result;
            }
        }
        return null;
    }

    async login(user: User) {
        const payload = { username: user.email, sub: user.id, role: user.role };
        const ret = {
            access_token: this.jwtService.sign(payload),
        }
        if (user.role !== 'user') {
            ret['role'] = user.role;
        }
        return ret;
    }

    async createActivationToken(user: CreateUserDTO): Promise<string> {
        const payload = { username: user.email }
        return this.jwtService.sign(payload);
    }

    async getUserFromToken(token: string): Promise<any> {
        const res = this.jwtService.decode(token);
        return res;
    }
}
