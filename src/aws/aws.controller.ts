import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AwsService } from './aws.service';

@Controller('aws')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFileToS3(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return await this.awsService.uploadFileToS3('heart', file);
  }
}
