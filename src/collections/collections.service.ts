import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCollectionDto, UpdateCollectionDto } from './dto/collection.dto';

@Injectable()
export class CollectionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCollectionDto) {
    const existing = await this.prisma.collection.findUnique({
      where: { slug: dto.slug },
    });

    if (existing) {
      throw new ConflictException('Collection with this slug already exists');
    }

    return this.prisma.collection.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.collection.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const collection = await this.prisma.collection.findUnique({
      where: { id },
      include: {
        products: {
          take: 10,
          include: {
            images: { take: 1, orderBy: { order: 'asc' } },
          }
        }
      }
    });

    if (!collection) {
      throw new NotFoundException('Collection not found');
    }

    return collection;
  }

  async findBySlug(slug: string) {
    const collection = await this.prisma.collection.findUnique({
      where: { slug },
      include: {
        products: {
          where: { status: 'ACTIVE' },
          include: {
            images: { take: 1, orderBy: { order: 'asc' } },
            variants: { select: { color: true } }
          }
        }
      }
    });

    if (!collection) {
      throw new NotFoundException('Collection not found');
    }

    return collection;
  }

  async update(id: string, dto: UpdateCollectionDto) {
    await this.findOne(id);
    return this.prisma.collection.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.collection.delete({
      where: { id },
    });
  }
}
