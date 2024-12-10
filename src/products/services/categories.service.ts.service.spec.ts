import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesServiceTsService } from './categories.service.ts.service';

describe('CategoriesServiceTsService', () => {
  let service: CategoriesServiceTsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesServiceTsService],
    }).compile();

    service = module.get<CategoriesServiceTsService>(CategoriesServiceTsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
