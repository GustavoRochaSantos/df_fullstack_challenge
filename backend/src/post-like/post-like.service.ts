import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PaginatedResult, paginate, sortBuilder, whereBuilder } from 'src/settings/database/queries';
import { PostLike } from './entities/post-like.entity';

@Injectable()
export class PostLikeService {
  constructor(private prisma: PrismaService) {
  }

  async create(likedByUserId: string, postId: string) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        await this.prisma.postLike.create({
          data: {
            likedByUserId, postId
          },
        });

        await this.prisma.post.update({
          where: { id: postId },
          data: {
            likes: await this.prisma.postLike.count({ where: { postId, isDeleted: false } })
          }
        })
      });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll(postId: string, query: any): Promise<PaginatedResult<PostLike>> {
    const {
      page = 1,
      perPage = 10,
      sortField = 'likedByUserId',
      sortOrder = 'asc',
      ...props
    } = query;

    try {
      return paginate(
        this.prisma.postLike,
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

  async remove(likedByUserId: string, postId: string) {
    try {

      return await this.prisma.$transaction(async (tx) => {
        await this.prisma.postLike.delete({
          where: {
            postId_likedByUserId: {
              likedByUserId, postId
            }
          }
        });

        await this.prisma.post.update({
          where: { id: postId },
          data: {
            likes: await this.prisma.postLike.count({ where: { postId, isDeleted: false } })
          }
        })
      });

    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
