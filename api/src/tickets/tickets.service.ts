import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Ticket } from "./ticket.entity";

@Injectable()
export class TicketsService {
    constructor(@InjectRepository(Ticket) private uproductRepository: Repository<Ticket>) {
    }

    async createTicket(userProduct: Ticket): Promise<Ticket> {
        return this.uproductRepository.save(userProduct);
    }

    async getTickets(userId: number): Promise<Ticket[]> {
        const queryBuilder = this.uproductRepository.createQueryBuilder();
        const tickets = await queryBuilder
            .select('userProduct')
            .from(Ticket, 'userProduct')
            .where("userProduct.userId = :id", { id: userId })
            .orderBy('userProduct.openDate', 'DESC')
            .getMany()
        return tickets;
    }
}
