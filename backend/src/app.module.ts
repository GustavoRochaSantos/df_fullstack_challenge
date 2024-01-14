import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import config from 'src/settings/configs';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { PrismaModule } from 'nestjs-prisma';
import { PrismaLogMiddleware } from './settings/middleware/prisma.log.middleware';
import { PrismaSoftDeleteMiddleware } from './settings/middleware/prisma.softdelete.middleware';
import { PostModule } from './post/post.module';
import { MulterModule } from '@nestjs/platform-express';
import { PostLikeModule } from './post-like/post-like.module';
import { PostViewModule } from './post-view/post-view.module';
import { PostRepostModule } from './post-repost/post-repost.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MulterModule.register({
      dest: './upload'
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [PrismaLogMiddleware, PrismaSoftDeleteMiddleware],
        explicitConnect: true,
        prismaOptions: {
          log: [
            {
              emit: 'event',
              level: 'query',
            },
          ],
        },
      },
    }),
    AuthModule,
    UserModule,
    PostModule,
    PostLikeModule,
    PostViewModule,
    PostRepostModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },],

})
export class AppModule { }
