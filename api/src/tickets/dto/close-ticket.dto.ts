import { IsNotEmpty, IsString } from 'class-validator';

export class CloseTicketDTO {
    @IsNotEmpty()
    @IsString()
    ticketId: string;
}
