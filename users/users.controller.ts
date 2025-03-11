import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async getUser(@Res({ passthrough: true }) res: Response) {
    try {
      // throw new Error('Lỗi rồi bạn ơi');
      const users = await this.userService.getAllUser();
      return { message: 'Lấy dữ liệu thành công!!', data: users };
    } catch (error) {
      res.status(400);
      return { message: error.message };
    }
  }

  @Post()
  async createUser(@Body() userDTO: UserDTO) {
    const user = await this.userService.createUser(userDTO);
    return { data: user };
  }
  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() userDTO: UserDTO) {
    const result = await this.userService.updateUser(userDTO, id);
    return { data: result };
  }
  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const result = await this.userService.deleteUser(id);
    return { data: result };
  }
}
