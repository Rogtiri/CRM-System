import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto, loginUserDto } from 'src/common/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() loginUserDto: loginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.login(loginUserDto);

    const { access_token } = user;

    res.cookie('auth', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true тільки на https
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 хвилин (або довше з refresh token)
      path: '/',
    });

    return { message: 'Успішний вхід' };
  }
}
