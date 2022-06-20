import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './entity/cats.entity';

@Injectable()
export class CatsService {
    constructor(
        @InjectRepository(Cat)
            private catsRepository:Repository<Cat>,
    ){}

    findAll(): Promise<Cat[]>{
        return this.catsRepository.find();
    }
}
