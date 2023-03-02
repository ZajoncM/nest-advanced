import { Injectable } from '@nestjs/common';
import { ExampleThreeService } from '../example-three/example-three.service';

@Injectable()
export class ExampleTwoService {
  constructor(private readonly exampleThreeService: ExampleThreeService) {}

  async testTwo() {
    return true;
  }

  testThree() {
    return this.exampleThreeService.testThree();
  }
}
