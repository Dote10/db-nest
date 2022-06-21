import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatSchema } from './cats.schema';
import { Cat } from './entity/cats.entity';
@Module({
  imports : [MongooseModule.forFeature([{name:Cat.name, schema: CatSchema}])],
  exports : [CatsService],
  controllers: [CatsController],
  providers: [CatsService]
})
export class CatsModule {}
