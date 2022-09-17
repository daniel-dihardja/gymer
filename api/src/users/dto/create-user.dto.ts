import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    lastName?: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}
