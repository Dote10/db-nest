import { Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Post, Put, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
    constructor(private readonly catService: CatsService) {}

    @Get()
    getCurrentCat(){
        return 'current cat';
    }
   
    @Post()
    async signUp(){
        return 'singnup';
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
