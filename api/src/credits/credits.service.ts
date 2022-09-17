import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Credit } from "./credit.entity";

@Injectable()
export class CreditsService {
    constructor(@InjectRepository(Credit) private creditRepository: Repository<Credit>) {
    }

    async createCredit(createCreditDTO: Credit): Promise<Credit> {
        return this.creditRepository.save(createCreditDTO);
    }
}
