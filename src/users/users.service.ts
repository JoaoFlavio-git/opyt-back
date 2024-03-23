import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * createUsers a new user.
   * @param data - The data for creating a new user.
   * @returns The created user.
   * @throws HttpException if the email already exists or on internal server error.
   */
  async createUser(data: CreateUserDto): Promise<User | undefined> {
    try {
      const emailExist = await this.prisma.user.findFirst({
        where: {
          email: data.email,
        },
      });

      if (emailExist) {
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      }

      const newUser = await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          city: data.city,
          answer: data.answer,
        },
      });

      return newUser;
    } catch (error) {
      console.log('Error occurred:', error); 
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
