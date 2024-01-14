import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { getStringHashed } from 'src/settings/utils';
import {
  paginate,
  PaginatedResult,
  sortBuilder,
  whereBuilder,
} from 'src/settings/database/queries';
import { CreateUserDto as CreateDTO } from './dto/create-user.dto';
import { UpdateUserDto as UpdateDTO } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { softDeleteData } from 'src/settings/utils/softdelete';

@Injectable()
export class UserService {
  selectDefault: any;
  constructor(private prisma: PrismaService) {
    this.selectDefault = {
      id: true,
      email: true,
      name: true,
      fullName: true,
      isActive: true,
      password: false,
    };
  }

  async create(data: CreateDTO) {
    try {
      data.password = await getStringHashed(data.password);

      return await this.prisma.user.create({
        data,
        select: this.selectDefault,
      });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll(query: any): Promise<PaginatedResult<User>> {
    const {
      page = 1,
      perPage = 10,
      sortField = 'fullName',
      sortOrder = 'asc',
      ...props
    } = query;

    try {
      return paginate(
        this.prisma.user,
        {
          orderBy: sortBuilder(sortField, sortOrder),
          select: this.selectDefault,
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
      const record = await this.prisma.user.findFirstOrThrow({
        where: {
          id,
        },
        select: this.selectDefault,
      });

      if (!record) throw new BadRequestException('Record dont exist');

      return record;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }


  async findByLogin(login: string) {
    try {
      return await this.prisma.user.findFirstOrThrow({
        where: { name: login },
      });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.prisma.user.findFirstOrThrow({
        where: { email },
      });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findPhoto(id: string) {
    try {
      const record = await this.prisma.user.findFirstOrThrow({
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


      return await this.prisma.user.update({
        where: { id },
        data: { photo },
      });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(id: string, data: UpdateDTO) {
    try {
      await this.findOne(id);

      if (data.password) data.password = await getStringHashed(data.password);

      return await this.prisma.user.update({
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
      await this.prisma.user.update({ where: { id }, data: softDeleteData });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
