import { Test, TestingModule } from '@nestjs/testing';
import { StripsController } from './strips.controller';
import { StripsService } from './strips.service';

describe('StripsController', () => {
  let controller: StripsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StripsController],
      providers: [StripsService],
    }).compile();

    controller = module.get<StripsController>(StripsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
