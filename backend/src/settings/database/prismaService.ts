import { PrismaService as PrismaServiceInstance } from 'nestjs-prisma';

let prisma: PrismaServiceInstance;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaServiceInstance();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaServiceInstance();
  }

  prisma = global.prisma;
}

export default prisma;
