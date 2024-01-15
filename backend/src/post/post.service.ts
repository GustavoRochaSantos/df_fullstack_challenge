import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PaginatedResult, paginate, sortBuilder, whereBuilder } from 'src/settings/database/queries';
import { convertDatesFromObject, convertDiferenceBetweenDates, formatBrDate } from 'src/settings/utils';
import { softDeleteData } from 'src/settings/utils/softdelete';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
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

      const customData = (data: any) => {
        const prepareData = (item: any) => {
          const userId = item.userId;

          return {
            ...item,
            createdAt: item.createdAt ? convertDiferenceBetweenDates(item.createdAt) : null,
            updatedAt: item.updatedAt ? formatBrDate(item.updatedAt) : null,
            deletedAt: item.deletedAt ? formatBrDate(item.deletedAt) : null,
            isLikedByYou: item.PostLike.filter(item => item.likedByUserId === userId).length > 0
          };
        };

        if (data.length) {
          return data.map((item) => prepareData(item));
        }

        if (!Object.keys(data).length) return data;

        return prepareData(data);
      }

      return paginate(
        this.prisma.post,
        {
          orderBy: sortBuilder(sortField, sortOrder),
          where: whereBuilder(props),
          include: {
            User: {
              select: {
                id: true,
                name: true,
                fullName: true,
                photo: true
              }
            },
            PostComment: true,
            PostLike: {
              select: {
                likedByUserId: true
              }
            }
          }
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
        include: {
          User: true,
          PostComment: true,
          PostLike: {
            select: {
              likedByUserId: true
            }
          }
        },

      });

      if (!record) throw new BadRequestException('Record dont exist');

      return record;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findPhoto(id: string) {
    try {
      const record = await this.prisma.post.findFirstOrThrow({
        where: {
          id,
        },
        select: {
          photo: true
        },
      });

      if (!record) throw new BadRequestException('Record dont exist');

      return record;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async updatePhoto(id: string, photo: string) {
    try {
      await this.findOne(id);


      return await this.prisma.post.update({
        where: { id },
        data: { photo },
      });
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
