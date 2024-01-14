import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';
import { PostComment } from './entities/post-comment.entity';
import { PaginatedResult, paginate, sortBuilder, whereBuilder } from 'src/settings/database/queries';
import { PrismaService } from 'nestjs-prisma';
import { softDeleteData } from 'src/settings/utils/softdelete';

@Injectable()
export class PostCommentService {
  constructor(private prisma: PrismaService) {
  }

  async create(userId: string, data: CreatePostCommentDto) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        await this.prisma.postComment.create({
          data: {
            ...data,
            userId,
          },
        });

        await this.prisma.post.update({
          where: { id: data.postId },
          data: {
            comments: await this.prisma.postComment.count({ where: { postId: data.postId, isDeleted: false } })
          }
        })
      });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll(query: any): Promise<PaginatedResult<PostComment>> {
    const {
      page = 1,
      perPage = 10,
      sortField = 'createdAt',
      sortOrder = 'desc',
      ...props
    } = query;

    try {
      return paginate(
        this.prisma.postComment,
        {
          orderBy: sortBuilder(sortField, sortOrder),
          where: whereBuilder(props),
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

  async findOne(id: string) {
    try {
      const record = await this.prisma.postComment.findFirstOrThrow({
        where: {
          id,
        },
      });

      if (!record) throw new BadRequestException('Record dont exist');

      return record;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(id: string, data: UpdatePostCommentDto) {
    try {
      await this.findOne(id);

      return await this.prisma.postComment.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(id: string) {

    try {
      const record = await this.findOne(id);

      return await this.prisma.$transaction(async (tx) => {
        await this.prisma.postComment.update({ where: { id }, data: softDeleteData });
        await this.prisma.post.update({
          where: { id: record.postId },
          data: {
            comments: await this.prisma.postComment.count({ where: { postId: record.postId, isDeleted: false } })
          }
        })
      });

    } catch (error) {
      throw new HttpException(error.message, 500);
    }

  }
}
