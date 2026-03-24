import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(dataUser: CreateUserDto) {
    return this.prisma.user.create({
      data: dataUser,
    });
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException('Не знайдено email');
    }
    return user;
  }
}
