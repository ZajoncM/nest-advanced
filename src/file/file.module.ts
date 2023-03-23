import { Module } from '@nestjs/common';
import { File } from './file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from './file.service';
import { FileController } from './file.controller';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
