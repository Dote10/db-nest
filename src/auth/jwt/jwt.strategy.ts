import {
  ConsoleLogger,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Payload } from './jwt.payload';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { CatRepository } from 'src/cats/cat.repository';
import { jwtConstants } from '../Constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    console.log(payload);

    const cat = await this.catsRepository.findCatbyIdWithoutPassword(
      payload.sub,
    );

    console.log('payeload:' + payload);
    console.log('cat:' + cat);

    if (cat) {
      return cat;
    } else {
      throw new UnauthorizedException('접근 오류');
    }
  }
}
