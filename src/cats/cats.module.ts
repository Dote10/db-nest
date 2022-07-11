import { Module, forwardRef } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatSchema } from './cats.schema';
import { Cat } from './entity/cats.entity';
import { CatsRepository } from './cats.repository';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    forwardRef(() => AuthModule),
  ],
  exports: [CatsService, CatsRepository],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
})
export class CatsModule {}
