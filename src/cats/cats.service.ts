import { Injectable, UnauthorizedException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { CatRepository } from './cat.repository';
import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsService {
  constructor(
    private catRepository: CatRepository,
    private readonly authService: AuthService,
  ) {}

  async findAllCat() {
    return this.catRepository.findAllCat();
  }

  async signUp(catRequestDto: CatRequestDto) {
    const { email, name, password } = catRequestDto;
    const isCatExist = await this.catRepository.existByEmail(
      catRequestDto.email,
    );

    console.log(isCatExist);

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
}
