import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}
    // Test method
    async getUsers(){
        return this.prisma.user.findMany();
    }
    // Get user by email
    async getUserByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: {email}
        })
    }
    // Register new user and hash password
    async create(createUser: CreateUserDto) {
        const hashpassword = await argon2.hash(createUser.password);

        return this.prisma.user.create({
            data: {
                ...createUser,
                password: hashpassword
            },
        });
    }
}
