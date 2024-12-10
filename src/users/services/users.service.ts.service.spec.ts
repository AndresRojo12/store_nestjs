import { Test, TestingModule } from '@nestjs/testing';
import { UsersServiceTsService } from './users.service.ts.service';

describe('UsersServiceTsService', () => {
  let service: UsersServiceTsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersServiceTsService],
    }).compile();

    service = module.get<UsersServiceTsService>(UsersServiceTsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
