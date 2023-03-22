import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { TestGuard } from './utils/test.guard';
import { Roles } from './roles.decorator';

@Controller()
@Roles('admin')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(TestGuard)
  @Get()
  @Roles('test')
  getHello() {
    return this.appService.getHello();
  }
}
