import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Ticket } from "./ticket.entity";

@Injectable()
export class TicketsService {
    constructor(@InjectRepository(Ticket) private ticketsRepository: Repository<Ticket>) {
    }

    async createTicket(userProduct: Ticket): Promise<Ticket> {
        return this.ticketsRepository.save(userProduct);
    }

    async getTickets(userId: number): Promise<Ticket[]> {
        return this.ticketsRepository.find(
            { where: { user: { id: userId } }, relations: ['product'] },
        )
    }

    async getTicket(id: string): Promise<Ticket> {
        return this.ticketsRepository.findOne(
            { where: { id: id } }
        )
    }
}
