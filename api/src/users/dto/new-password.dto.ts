import { IsEmail, IsNotEmpty } from 'class-validator';

export class NewPasswordDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    recoveryCode: number;
}
