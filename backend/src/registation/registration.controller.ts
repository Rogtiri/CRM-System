import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/common/dto/user.dto';

@Controller('registration')
export class RegistrationController {
  constructor(private registerUser: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
      return this.registerUser.create(createUserDto)
  }
}
