import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Post,
    Query,
    Request,
    UnauthorizedException,
    UseGuards
} from '@nestjs/common';
import { AuthService } from "./auth/auth.service";
import { JwtAuthGuard } from "./auth/jwt-auth-guard";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { Roles } from "./auth/role.decorator";
import { Role } from "./auth/role.enum";
import { RolesGuard } from "./auth/role.guard";
import { IMessage, MailService } from "./mail/mail.service";
import { CreateUserDTO } from "./users/dto/create-user.dto";
import { NewPasswordDTO } from "./users/dto/new-password.dto";
import { RecoveryDTO } from "./users/dto/recovery.dto";
import { UsersService } from "./users/users.service";

@Controller()
export class AppController {
    constructor(private authService: AuthService,
                private userService: UsersService,
                private mailService: MailService) {
    }

    @Post('users')
    async registerUser(@Body() createUserDTO: CreateUserDTO): Promise<void> {
        const token = await this.authService.createActivationToken(createUserDTO)
        const user = { ...createUserDTO, activationToken: token };
        await this.userService.createUser(user);
        const activationLink = `http://localhost:3000/users/activate?token=${token}`;
        const msg = this.getActivationMessage(createUserDTO, activationLink);
        await this.mailService.sendMail(msg);
    }

    private getActivationMessage(user: CreateUserDTO, link: string): IMessage {
        return {
            to: user.email,
            subject: 'Activation Link',
            text: link
        }
    }

    @Get('users/activate')
    async activateUser(@Query('token') token): Promise<void> {
        if (!token) {
            throw new UnauthorizedException();
        }
        const res = await this.authService.getUserFromToken(token);
        const email = res['username'];
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new NotFoundException();
        }
        user.isActive = 1;
        user.activationToken = "";
        return this.userService.updateUser(user);
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        if (!req.user.isActive) {
            throw new UnauthorizedException();
        }
        return this.authService.login(req.user);
    }

    @Post('recovery')
    async createRecoveryCode(@Body() recoveryDto: RecoveryDTO): Promise<void> {
        const user = await this.userService.getUserByEmail(recoveryDto.email);
        if (!user) {
            throw new NotFoundException();
        }
        user.recoveryCode = Math.round(Math.random() * 999999);
        await this.userService.updateUser(user);
        // const msg = this.getRecoveryMessage(recoveryDto.email, user.recoveryCode)
        // await this.mailService.sendMail(msg);
    }

    private getRecoveryMessage(email: string, code: number): IMessage {
        return {
            to: email,
            subject: 'Recovery Code',
            text: code.toString()
        }
    }

    @Post('password')
    async createPassword(@Body() newPwdDto: NewPasswordDTO): Promise<void> {
        const user = await this.userService.getUserByEmail(newPwdDto.email);
        if (!user) {
            throw new NotFoundException();
        }
        if (user.recoveryCode != newPwdDto.recoveryCode) {
            throw new UnauthorizedException();
        }

        user.password = await this.userService.hashPassword(newPwdDto.password);
        user.recoveryCode = 0;
        await this.userService.updateUser(user);
    }

    @Get('ping')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Vendor, Role.User)
    async ping(@Request() req): Promise<void> {}
}
