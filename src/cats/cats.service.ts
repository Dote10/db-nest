import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { CatRepository } from './cat.repository';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsService {
  constructor(
    private catRepository: CatRepository,
    private readonly authService: AuthService,
  ) {}

  async signUp(catRequestDto: CatRequestDto) {
    const { email, name, password } = catRequestDto;
    const isCatExist = this.catRepository.existByEmail(catRequestDto.email);

    if (isCatExist) {
      //throw new HttpException('해당하는 고양이는 이미 존재합니다.',403);
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catRepository.createCat({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }

  async existByEmail(email: string) {
    return await this.catRepository.existByEmail(email);
  }
}
