
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CatRepository } from '../../cats/cat.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey',
      ignoreExpiration: false,
    });
  }

  async validate(payload) {

    const cat = await this.catsRepository.findCatbyIdWithoutPassword(
      payload.sub
    );

    if(cat){
      return cat;
    }else{
      throw new UnauthorizedException();
    }

  }
}

