import { forwardRef, Module } from '@nestjs/common';
import { CatsController } from './controller/cats.controller';
import { CatsService } from './service/cats.service';
import { Cat } from './entity/cats.entity';
import { CatRepository } from './cat.repository';
//import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CatSchema } from './cats.schema';
import { MulterError } from 'multer';
import { MulterModule } from '@nestjs/platform-express';
//import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.register({
      dest: './upload',
    }),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    // forwardRef(() => AuthModule),
  ],
  exports: [CatsService, CatRepository],
  controllers: [CatsController],
  providers: [CatsService, CatRepository],
})
export class CatsModule {}
