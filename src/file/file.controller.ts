import {
  Controller,
  Get,
  Header,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  addFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.uploadPublicFile(file.buffer, file.originalname);
  }

  @Get()
  async getFiles() {
    return this.fileService.getFiles();
  }

  @Get(':id')
  @Header('Content-Type', 'image/png')
  async getFile(@Param('id') id: string) {
    const stream = await this.fileService.getFile(id);

    return new StreamableFile(stream);
  }
}
