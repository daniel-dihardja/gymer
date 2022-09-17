import { IsNotEmpty } from 'class-validator';

export class CreateCreditDTO {
    @IsNotEmpty()
    amount: number;
}
