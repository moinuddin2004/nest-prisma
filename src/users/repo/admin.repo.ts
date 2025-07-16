// src/users/admin.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Admin } from '@prisma/client';
import { BaseRepository } from 'src/common/base/BaseRepo';

@Injectable()
export class AdminRepository extends BaseRepository<
  Admin
> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.admin);
  }

  findByEmail(email: string) {
    return this.modelDelegate.findUnique({ where: { email } });
  }
}
