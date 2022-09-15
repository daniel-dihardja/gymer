import { Injectable, Inject, HttpException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from "../auth/auth.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { SimpleUserDTO } from "./dto/simple-user.dto";
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    async getUsers(user: User): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async getUser(_id: number): Promise<User[]> {
        return await this.usersRepository.find({
            select: ["email", "isActive"],
            where: [{ "id": _id }]
        });
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this.usersRepository.findOne({
            select: ["id", "firstName", "lastName", "email", "password", "role", "activationToken", "isActive"],
            where: [{"email": email}]
        });
    }

    async updateUser(user: User): Promise<void> {
        await this.usersRepository.save(user)
    }

    async deleteUser(user: User) {
        await this.usersRepository.delete(user);
    }

    async createUser(createUserDTO: CreateUserDTO): Promise<void>  {
        const email = createUserDTO.email;
        const emailExits = await this.usersRepository.findOne({where: [{"email": email}]});
        if (emailExits) {
            throw new BadRequestException("Email exists")
        }

        const pwd = createUserDTO.password;
        createUserDTO.password = await this.hashPassword(pwd);

        await this.usersRepository.save(createUserDTO)
    }

    private async hashPassword(password: string): Promise<string> {
        return new Promise(resolve => {
            bcrypt.hash(password, 10, function(err, hash) {
                resolve(hash);
            });
        })
    }
}
