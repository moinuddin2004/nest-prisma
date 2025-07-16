// src/common/base/base.repository.ts
import { PrismaClient, Prisma } from '@prisma/client';

export class BaseRepository<TModel> {
  constructor(
    protected readonly prisma: PrismaClient,
    protected readonly modelDelegate: {
      findMany: (args?: Prisma.SelectSubset<any, any>) => Promise<TModel[]>;
      findUnique: (
        args: Prisma.SelectSubset<any, any>,
      ) => Promise<TModel | null>;
      findFirst: (
        args?: Prisma.SelectSubset<any, any>,
      ) => Promise<TModel | null>;
      create: (args: Prisma.SelectSubset<any, any>) => Promise<TModel>;
      update: (args: Prisma.SelectSubset<any, any>) => Promise<TModel>;
      delete: (args: Prisma.SelectSubset<any, any>) => Promise<TModel>;
    },
  ) {}

  async findAll(): Promise<TModel[]> {
    return this.modelDelegate.findMany();
  }

  async findById(id: number): Promise<TModel | null> {
    return this.modelDelegate.findUnique({ where: { id } });
  }

  async findOne(where: any): Promise<TModel | null> {
    return this.modelDelegate.findFirst({ where });
  }

  async create(data: any): Promise<TModel> {
    return this.modelDelegate.create({ data });
  }

  async update(id: number, data: any): Promise<TModel> {
    return this.modelDelegate.update({ where: { id }, data });
  }

  async delete(id: number): Promise<TModel> {
    return this.modelDelegate.delete({ where: { id } });
  }

  async exists(where: any): Promise<boolean> {
    const record = await this.modelDelegate.findFirst({ where });
    return !!record;
  }
}
