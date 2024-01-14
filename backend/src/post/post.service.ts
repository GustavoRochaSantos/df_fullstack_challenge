import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'nestjs-prisma';
import { softDeleteData } from 'src/settings/utils/softdelete';
import { PaginatedResult, paginate, sortBuilder, whereBuilder } from 'src/settings/database/queries';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {
  }

  async create(userId: string, data: CreatePostDto) {
    try {
      return await this.prisma.post.create({
        data: {
          ...data,
          userId
        },
      });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll(query: any): Promise<PaginatedResult<Post>> {
    const {
      page = 1,
      perPage = 10,
      sortField = 'createdAt',
      sortOrder = 'desc',
      ...props
    } = query;

    try {
      return paginate(
        this.prisma.post,
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
      const record = await this.prisma.post.findFirstOrThrow({
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

  async update(id: string, data: UpdatePostDto) {
    try {
      await this.findOne(id);

      return await this.prisma.post.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);
      await this.prisma.post.update({ where: { id }, data: softDeleteData });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

}
