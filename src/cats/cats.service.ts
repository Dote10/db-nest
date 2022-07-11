import { Injectable, HttpException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './entity/cats.entity';
import { CatRequestDto } from './dto/cats.request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpExceptionFilter } from '../http-exception.filter';
import * as bcrypt from 'bcrypt';
import { catchError } from 'rxjs';
import { CatsRepository } from './cats.repository';

@Injectable()
export class CatsService {
    constructor( private readonly catsRepository: CatsRepository){}


    async signUp(catRequestDto: CatRequestDto){
        const {email, name, password} =  catRequestDto;
        const isCatExist = await this.catsRepository.existsByEmail(email);
    

        if (isCatExist){
        //throw new HttpException('해당하는 고양이는 이미 존재합니다.',403);
        throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const cat = await this.catsRepository.create({
            email,
            name,
            password:hashedPassword
        });

        return cat
    } 
    
}

