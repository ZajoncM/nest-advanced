import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { TestGuard } from './test.guard';
import { Roles } from './roles.decorator';

@Controller()
@Roles('admin')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(TestGuard)
  @Roles('test')
  getHello(): string {
    return this.appService.getHello();
  }
}
