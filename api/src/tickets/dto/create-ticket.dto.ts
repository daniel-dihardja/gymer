import { IsNotEmpty } from 'class-validator';

export class CreateTicketDTO {
    @IsNotEmpty()
    productId: number;
}
