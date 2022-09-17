import { Body, Controller, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from "../auth/jwt-auth-guard";
import { UsersService } from "../users/users.service";
import { CreditsService } from "./credits.service";
import { CreateCreditDTO } from "./dto/create-credit.dto";

@Controller('credits')
export class CreditsController {
    constructor(private creditService: CreditsService,
                private userService: UsersService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createCredit(@Body() createCreditDTO: CreateCreditDTO, @Request() req): Promise<void> {
        const email = req.user.username;
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new UnauthorizedException();
        }

        let total: number;
        const userWithCredits = await this.userService.getUserWithCredits(email);
        const { credits } = userWithCredits;
        if (credits.length > 0) {
            total = credits[credits.length - 1].total + createCreditDTO.amount;
        } else {
            total = createCreditDTO.amount;
        }

        // TODO:
        // To be defined
        const ref = 'buy';
        const price = createCreditDTO.amount * 1 // for now we just assume 1 credit cost 1 Euro

        const payload = { ...createCreditDTO, total, ref, price, user };
        await this.creditService.createCredit(payload);
    }
}
