import { Test, TestingModule } from '@nestjs/testing';
import { PostRepostService } from './post-repost.service';

describe('PostRepostService', () => {
  let service: PostRepostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostRepostService],
    }).compile();

    service = module.get<PostRepostService>(PostRepostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
