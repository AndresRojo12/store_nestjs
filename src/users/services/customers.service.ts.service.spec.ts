import { Test, TestingModule } from '@nestjs/testing';
import { CustomersServiceTsService } from './customers.service.ts.service';

describe('CustomersServiceTsService', () => {
  let service: CustomersServiceTsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomersServiceTsService],
    }).compile();

    service = module.get<CustomersServiceTsService>(CustomersServiceTsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
