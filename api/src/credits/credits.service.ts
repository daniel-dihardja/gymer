import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Credit } from "./credit.entity";
import { GetCreditsDTO } from "./dto/get-credits.dto";

@Injectable()
export class CreditsService {
    constructor(@InjectRepository(Credit) private creditRepository: Repository<Credit>) {
    }

    async createCredit(createCreditDTO: Credit): Promise<Credit> {
        return this.creditRepository.save(createCreditDTO);
    }

    async getUserCredits(userId: number): Promise<GetCreditsDTO> {
        const queryBuilder = this.creditRepository.createQueryBuilder();
        const credits = await queryBuilder
            .select('credit')
            .from(Credit, 'credit')
            .where("credit.userId = :id", { id: userId })
            .orderBy('credit.id', 'DESC')
            .getOne()

        const total = credits ? credits.total : 0;
        return { total };
    }
}
