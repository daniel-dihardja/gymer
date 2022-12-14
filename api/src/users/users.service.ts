import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDTO } from "./dto/create-user.dto";
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this.usersRepository.findOne({
            where: [{ "email": email }]
        });
    }

    async getVendorUserByEmail(email: string): Promise<User> {
        return await this.usersRepository.findOne({
            where: [{ "email": email }],
            relations: ['vendor']
        });
    }

    async updateUser(user: User): Promise<void> {
        await this.usersRepository.save(user)
    }

    async deleteUser(user: User) {
        await this.usersRepository.delete(user);
    }

    async createUser(createUserDTO: CreateUserDTO): Promise<void> {
        const email = createUserDTO.email;
        const emailExits = await this.usersRepository.findOne({ where: [{ "email": email }] });
        if (emailExits) {
            throw new BadRequestException("Email exists")
        }

        const pwd = createUserDTO.password;
        createUserDTO.password = await this.hashPassword(pwd);

        await this.usersRepository.save(createUserDTO)
    }

    public async hashPassword(password: string): Promise<string> {
        return new Promise(resolve => {
            bcrypt.hash(password, 10, function (err, hash) {
                resolve(hash);
            });
        })
    }
}
