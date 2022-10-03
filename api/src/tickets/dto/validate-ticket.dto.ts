import { IsNotEmpty } from 'class-validator';

export class ValidateTicketDTO {
    @IsNotEmpty()
    ticketId: string;
}
