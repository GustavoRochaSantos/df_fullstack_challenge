import { Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PostService } from '../../src/post/post.service';
import { faker } from '../../src/settings/utils';

const log = new Logger();
export async function post_seed(
  prisma: PrismaService,
  changedByUser: string,
): Promise<void> {
  log.log('[post_seed] Starting...');

  const postService = new PostService(prisma);


  for (let x = 1; x <= Math.random() * 20; x++) {
    const data = {
      text: faker.lorem.words({ min: 1, max: 15 }),
      changedByUser,
      comments: 0,
      likes: 0,
      reposts: 0,
      views: 0,
      photo: null,
      createdAt: faker.date.between({ from: '2024-01-01T00:00:00.000Z', to: new Date() })
    };

    const record = await postService.create(changedByUser, data);
    await postService.updatePhoto(record.id.toString(), faker.image.urlLoremFlickr())
  }

  log.log('[post_seed] Finished');
}
