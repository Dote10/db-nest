import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import * as request from 'supertest';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.registerAsybc({
      userFactory: () => ({ timeout: 5000, maxRedirects: 5 }),
    }),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
