import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Request,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { AuthService } from "./auth/auth.service";
import { CreateUserDTO } from "./users/dto/create-user.dto";
import { NewPasswordDTO } from "./users/dto/new-password.dto";
import { RecoveryDTO } from "./users/dto/recovery.dto";
import { UsersService } from "./users/users.service";

@Controller()
export class AppController {
  constructor(private authService: AuthService,
              private userService: UsersService) {}

  @Post('users')
  async registerUser(@Body() createUserDTO: CreateUserDTO): Promise<void> {
    const token = await this.authService.createActivationToken(createUserDTO)
    const user = {... createUserDTO, activationToken: token};
    await this.userService.createUser(user);

    // TODO:
    // send email with activation token
  }

  @Get('users/activate')
  async activateUser(@Query('token') token): Promise<void> {
    if (! token) {
      throw new UnauthorizedException();
    }
    const res = await this.authService.getUserFromToken(token);
    const email = res['username'];
    const user = await this.userService.getUserByEmail(email);
    if (! user) {
      throw new NotFoundException();
    }
    user.isActive = 1;
    return this.userService.updateUser(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    if(!req.user.isActive) {
      throw new UnauthorizedException();
    }
    return this.authService.login(req.user);
  }

  @Post('recovery')
  async createRecoveryCode(@Body() recoveryDto: RecoveryDTO): Promise<void> {
    const user = await this.userService.getUserByEmail(recoveryDto.email);
    if (! user) {
      throw new NotFoundException();
    }
    user.recoveryCode = Math.round(Math.random()*999999);
    await this.userService.updateUser(user);

    // TODO:
    // send email to user with recovery code
  }

  @Post('password')
  async createPassword(@Body() newPwdDto: NewPasswordDTO): Promise<void> {
    const user = await this.userService.getUserByEmail(newPwdDto.email);
    if (! user) {
      throw new NotFoundException();
    }
    if (user.recoveryCode != newPwdDto.recoveryCode) {
      throw new UnauthorizedException();
    }

    user.password = await this.userService.hashPassword(newPwdDto.password);
    user.recoveryCode = 0;
    await this.userService.updateUser(user);
  }
}
