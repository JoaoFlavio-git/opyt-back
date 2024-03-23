import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto, ReadUserDto } from './dtos/user.dto';
import { User } from '@prisma/client'; 

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  /**
   * Creates a new user.
   * @param createUserDto - The data for creating a new user.
   * @returns The created user.
   */
  @Post('create')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto, description: 'Data for creating a new user' })
  @ApiResponse({ status: 201, description: 'User created.', type: ReadUserDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<ReadUserDto> {
    const newUser: User = await this.userService.createUser(createUserDto);
    const readUserDto: ReadUserDto = {
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      city: newUser.city,
      answer: newUser.answer,
    };
    return readUserDto;
  }
}
