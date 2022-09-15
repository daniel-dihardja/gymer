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
import { Router } from "express";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { AuthService } from "./auth/auth.service";
import { CreateUserDTO } from "./users/dto/create-user.dto";
import { UsersService } from "./users/users.service";

@Controller()
export class AppController {
  constructor(private authService: AuthService,
              private userService: UsersService) {}

  @Post('users')
  async registerUser(@Body() createUserDTO: CreateUserDTO): Promise<void> {
    const token = await this.authService.getActivationToken(createUserDTO)
    const user = {... createUserDTO, activationToken: token};
    await this.userService.createUser(user);
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
    user.activationToken = "";
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
}
