import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CatsService } from './cats.service';
import { CatRequestDto } from './dto/cats.request.dto';
import { HttpException } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}


  @Get()
  async findAll(){
     throw new HttpException('api is broken',401)
  }

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get('current')
  getCurrentCat(@Req() req) {
    return 'current cat';
  }

  @Get('email/:email')
  getExistByEmail(@Param('email') email: string) {
    return this.catsService.existByEmail(email);
  }

  @Post('sing')
  async signUp(@Body() catRequestDto: CatRequestDto) {
    return await this.catsService.signUp(catRequestDto);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
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
