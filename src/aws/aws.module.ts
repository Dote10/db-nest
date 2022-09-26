import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { AwsController } from './aws.controller';
import { AwsService } from './aws.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { Cat } from 'src/cats/cats.schema';
import { CatSchema } from '../cats/cats.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [AwsController],
  providers: [AwsService],
})
export class AwsModule {}
