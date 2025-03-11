import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';

class UserDTO {
  name: string;
  email: string;
  pass: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello(@Param('id') id: string, @Query('q') q: string) {
    return { name: q };
  }

  @Get('/about')
  getAbout() {
    return { id: 12, pass: 'abc' };
  }

  @Post('/login')
  // @Render('index')
  postLogin(@Body() user: UserDTO) {
    return { user };
  }
}
