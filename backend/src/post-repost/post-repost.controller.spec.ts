import { Test, TestingModule } from '@nestjs/testing';
import { PostRepostController } from './post-repost.controller';
import { PostRepostService } from './post-repost.service';

describe('PostRepostController', () => {
  let controller: PostRepostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostRepostController],
      providers: [PostRepostService],
    }).compile();

    controller = module.get<PostRepostController>(PostRepostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
