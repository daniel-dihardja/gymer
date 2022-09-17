import {IsString, IsNotEmpty, IsEmail} from 'class-validator';

export class CreateCreditDTO {
    @IsNotEmpty()
    amount: number;
}
