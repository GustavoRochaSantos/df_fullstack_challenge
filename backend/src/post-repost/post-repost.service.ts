import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PaginatedResult, paginate, sortBuilder, whereBuilder } from 'src/settings/database/queries';
import { PostRepost } from './entities/post-repost.entity';

@Injectable()
export class PostRepostService {
  constructor(private prisma: PrismaService) {
  }

  async create(repostedByUserId: string, postId: string) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        await this.prisma.postRepost.create({
          data: {
            repostedByUserId, postId
          },
        });

        await this.prisma.post.update({
          where: { id: postId },
          data: {
            reposts: await this.prisma.postRepost.count({ where: { postId, isDeleted: false } })
          }
        })
      });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll(postId: string, query: any): Promise<PaginatedResult<PostRepost>> {
    const {
      page = 1,
      perPage = 10,
      sortField = 'repostedByUserId',
      sortOrder = 'asc',
      ...props
    } = query;

    try {
      return paginate(
        this.prisma.postRepost,
        {
          orderBy: sortBuilder(sortField, sortOrder),
          where: { postId, ...whereBuilder(props) },
        },
        {
          page,
          perPage,
        },
      );
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(repostedByUserId: string, postId: string) {
    try {

      return await this.prisma.$transaction(async (tx) => {
        await this.prisma.postRepost.delete({
          where: {
            postId_repostedByUserId: {
              repostedByUserId, postId
            }
          }
        });

        await this.prisma.post.update({
          where: { id: postId },
          data: {
            reposts: await this.prisma.postRepost.count({ where: { postId, isDeleted: false } })
          }
        })
      });

    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
