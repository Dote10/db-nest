import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { CatsService } from './cats.service';
import { CatRequestDto } from './dto/cats.request.dto';
import { AuthService } from '../auth/auth.service';
import { LonginRequestDto } from 'src/auth/dto/auth.service';
import { PositiveIntPipe } from 'src/pipes/positiveInt.pipe';

@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getAllCat() {
    throw new HttpException('api broken', 401);
    return 'get all cat api';
  }

  @Get(':id')
  getCurrentCat(@Param('id', ParseIntPipe, PositiveIntPipe) id: number) {
    return id + typeof id;
  }

  @Post()
  async signUp(@Body() catRequestDto: CatRequestDto) {
    return await this.catsService.signUp(catRequestDto);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() data: LonginRequestDto) {
    return this.authService.jwtLogIn(data);
  }

  @Post('logout')
  logOut() {
    return 'logout';
  }

  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
