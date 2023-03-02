import { Injectable } from '@nestjs/common';
import { ExampleTwoService } from '../example-two/example-two.service';

@Injectable()
export class ExampleService {
  constructor(private readonly exampleTwoService: ExampleTwoService) {}

  async test() {
    return this.exampleTwoService.testTwo();
  }
}
