import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    BadRequestException,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { UploadService } from './upload.service';
  
  @Controller('upload')
  export class UploadController {
    constructor(private readonly uploadService: UploadService) {}
  
    @Post('image')
    @UseInterceptors(FileInterceptor('image'))
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
      if (!file) {
        throw new BadRequestException('Please upload a file');
      }
  
      return await this.uploadService.uploadImage(file);
    }
  }
  