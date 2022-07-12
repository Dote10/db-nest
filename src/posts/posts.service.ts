import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { PostInfo } from './post.info.dto';

@Injectable()
export class PostsService {
  constructor(private readonly httpService: HttpService) {}

  findAll(): Observable<AxiosResponse<PostInfo>> {
    return this.httpService.get('http://localhost:7100/v2/posts/info');
  }
}
