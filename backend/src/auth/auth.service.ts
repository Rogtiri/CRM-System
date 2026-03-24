import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, loginUserDto } from 'src/common/dto/user.dto';
import * as argon2 from 'argon2';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}
  // Refistration
  async create(createUser: CreateUserDto) {
    const hashpassword = await argon2.hash(createUser.password);
    const dataUser = {
      ...createUser,
      password: hashpassword,
    };
    return this.userService.createUser(dataUser);
  }
  // Login
  async login(loginUser: loginUserDto) {
    const user = await this.userService.findByEmail(loginUser.email);

    const validPass = await argon2.verify(user.password, loginUser.password);
    if (!validPass) {
      throw new UnauthorizedException('Невірний пароль');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
