import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class loginUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
