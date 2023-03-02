import { Test, TestingModule } from '@nestjs/testing';
import { ExampleService } from './example.service';
import { ExampleTwoService } from '../example-two/example-two.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('ExampleService', () => {
  let service: ExampleService;
  let exampleTwoService: ExampleTwoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExampleService,
        { provide: ExampleTwoService, useValue: { testTwo: jest.fn() } },
      ],
    })
      .useMocker((token) => {
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    service = module.get<ExampleService>(ExampleService);
    exampleTwoService = module.get<ExampleTwoService>(ExampleTwoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#test', () => {
    it('returns true', async () => {
      jest.spyOn(exampleTwoService, 'testTwo').mockResolvedValue(true);

      const result = await service.test();

      expect(result).toBe(true);
    });
  });
});
