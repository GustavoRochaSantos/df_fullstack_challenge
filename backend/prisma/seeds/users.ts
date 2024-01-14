import { Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UserService } from '../../src/user/user.service';
import { CreateUserDto } from '../../src/user/dto/create-user.dto';
import { faker } from '../../src/settings/utils';

const log = new Logger();
export async function user_seed(prisma: PrismaService, data?: CreateUserDto): Promise<string> {
  log.log('[user_seed] Starting...');
  await prisma.$connect();

  const userService = new UserService(prisma);

  const record = await userService.create(data || {
    name: '@admin',
    email: 'admin@admin.com',
    password: 'admin123',
    fullName: 'Administrador',
    changedByUser: null,
    isActive: true
  });
  log.log('[user_seed] photo...', record);
  await userService.updatePhoto(record.id.toString(), faker.image.avatarGitHub())
  await prisma.$disconnect();
  log.log('[user_seed] Finished');

  return record.id.toString();
}
