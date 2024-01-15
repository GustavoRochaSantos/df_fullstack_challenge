import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PaginatedResult, paginate, sortBuilder, whereBuilder } from 'src/settings/database/queries';
import { PostView } from './entities/post-view.entity';

@Injectable()
export class PostViewService {
  constructor(private prisma: PrismaService) {
  }

  async create(viewedByUserId: string, postId: string) {
    try {
      return await this.prisma.$transaction(async (tx) => {

        await this.prisma.postView.create({
          data: {
            viewedByUserId, postId
          },
        });

        await this.prisma.post.update({
          where: { id: postId },
          data: {
            views: await this.prisma.postView.count({ where: { postId, isDeleted: false } })
          }
        })
      });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll(postId: string, query: any): Promise<PaginatedResult<PostView>> {
    const {
      page = 1,
      perPage = 10,
      sortField = 'viewedByUserId',
      sortOrder = 'asc',
      ...props
    } = query;

    try {
      return paginate(
        this.prisma.postView,
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

  async remove(viewedByUserId: string, postId: string) {
    try {

      return await this.prisma.$transaction(async (tx) => {
        await this.prisma.postView.delete({
          where: {
            postId_viewedByUserId: {
              viewedByUserId, postId
            }
          }
        });

        await this.prisma.post.update({
          where: { id: postId },
          data: {
            views: await this.prisma.postView.count({ where: { postId, isDeleted: false } })
          }
        })
      });

    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
