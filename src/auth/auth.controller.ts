import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly users: UserService,
  ) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    const user = await this.users.create(dto);
    return { id: user.id, name: user.name };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: any, @Body() _dto: CreateUserDto) {
    const access_token = this.auth.signAccessToken(req.user);
    return { access_token };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  profile(@Req() req: any) {
    // JwtStrategy.validate 반환값이 req.user 로 들어옴
    return req.user;
  }
}
