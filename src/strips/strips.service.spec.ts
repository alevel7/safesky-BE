import { Test, TestingModule } from '@nestjs/testing';
import { StripsService } from './strips.service';

describe('StripsService', () => {
  let service: StripsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StripsService],
    }).compile();

    service = module.get<StripsService>(StripsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
