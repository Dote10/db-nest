import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Post, Put, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { CatsService } from './cats.service';
import { CatRequestDto } from './dto/cats.request.dto';

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Get()
    getCurrentCat(){
        return 'current cat';
    }
   
    @Post()
    async signUp(@Body() catRequestDto: CatRequestDto){
        return await this.catsService.signUp(catRequestDto)
    }

    @Post('login')
    logIn(){
        return 'login';
    }

    @Post('logout')
    logOut(){
        return 'logout';
    }

    @Post('upload/cats')
    uploadCatImg(){
        return 'uploadImg';
    }
}
