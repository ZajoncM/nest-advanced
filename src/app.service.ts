import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class AppService {
  constructor(
    // We can inject the provided ClsService instance,
    private readonly cls: ClsService,
  ) {}

  getHello(): string {
    const userId = this.cls.get('test');

    console.log(userId);
    return 'Hello World!';
  }
}
