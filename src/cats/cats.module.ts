import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './entity/cats.entity';

@Module({
  imports : [],
  exports : [],
  controllers: [CatsController],
  providers: [CatsService]
})
export class CatsModule {}
