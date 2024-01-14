import { PrismaService } from 'nestjs-prisma';
import { user_seed } from './users';
import { faker } from '../../src/settings/utils';
import { post_seed } from './post';


const prisma = new PrismaService();
const isProd = process.env.ENV === 'prod';
async function seed() {
  console.log('Seeding...');
  await prisma.$connect();

  await prisma.post.deleteMany();
  await prisma.user.deleteMany();


  await user_seed(prisma);

  if (!isProd) {
    for (let x = 1; x < 5; x++) {
      const changedByUser = await user_seed(prisma, {
        name: `@${faker.internet.userName()}`,
        email: faker.internet.email(),
        password: '123456',
        fullName: faker.person.fullName(),
        changedByUser: null,
        isActive: true
      });

      await post_seed(prisma, changedByUser)
    }
  }
}

seed()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
