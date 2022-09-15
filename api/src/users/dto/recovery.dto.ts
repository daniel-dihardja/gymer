import { IsEmail, IsNotEmpty } from "class-validator";

export class RecoveryDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
