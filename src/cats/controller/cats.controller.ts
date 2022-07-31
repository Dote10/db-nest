import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request';
import { CatsService } from '../service/cats.service';
import { CatRequestDto } from '../dto/cats.request.dto';
import { SuccessInterceptor } from 'src/success.interceptor';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { Cat } from '../cats.schema';
import { ReadOnlyCatDto } from '../dto/cat.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../common/utils/multer.options';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @Get('all')
  findAll() {
    return this.catsService.findAllCat();
  }

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @ApiBearerAuth('Bearer')
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat: Cat) {
    return cat.readOnlyData;
  }

  @ApiResponse({
    status: 500,
    description: 'Server Error....',
  })
  @ApiResponse({
    status: 200,
    description: '성공!',
    type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post('sign')
  async signUp(@Body() catRequestDto: CatRequestDto) {
    return await this.catsService.signUp(catRequestDto);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut() {
    return 'logout';
  }

  @ApiOperation({ summary: '고양이 이미지 업로드' })
  @ApiBearerAuth('Bearer')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats')))
  @Post('upload')
  uploadCatImg(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @CurrentUser() cat: Cat,
  ) {
    console.log('into controller');
    return this.catsService.uploadImg(cat, files);
  }
}
