import { Injectable } from '@nestjs/common';
import { File } from './file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';
import s3 from 'aws-sdk/clients/s3';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
    private readonly configService: ConfigService,
  ) {}

  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();

    const file = this.fileRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location,
    });

    return file.save();
  }

  async getFile(key: string) {
    const s3 = new S3();

    const stream = await s3
      .getObject({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Key: key,
      })
      .createReadStream();

    return stream;
  }

  async getFiles() {
    return this.fileRepository.find();
  }
}
