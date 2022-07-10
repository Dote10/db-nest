import { forwardRef, Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './entity/cats.entity';
import { CatRepository } from './cat.repository';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CatSchema } from './cats.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
           forwardRef(()=> AuthModule)],
  exports: [CatsService,CatRepository],
  controllers: [CatsController],
  providers: [CatsService,CatRepository],
})
export class CatsModule {}

