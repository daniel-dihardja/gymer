import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Credit } from "./credit.entity";
import { CreateCreditDTO } from "./dto/create-credit.dto";

@Injectable()
export class CreditsService {
    constructor(@InjectRepository(Credit) private creditRepository: Repository<Credit>) {}

    async createCredit(createCreditDTO: Credit): Promise<Credit> {
        return this.creditRepository.save(createCreditDTO);
    }
}
