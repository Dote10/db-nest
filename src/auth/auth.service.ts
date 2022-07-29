import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRepository } from '../cats/cat.repository';
import { LoginRequestDto } from './dto/login.request';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatRepository,
    private readonly jwtService: JwtService,
  ) {}

  async findAllCat() {
    return this.catsRepository.findAllCat();
  }

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    //* 해당하는 email이 있는지
    const cat = await this.catsRepository.findCatByEmail(data.email);
    if (!cat) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해 주세요');
    }

    //* password가 일치한지
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요');
    }

    const payload = { email: email, sub: cat.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
