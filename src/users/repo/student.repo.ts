// src/users/repo/student.repo.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Student } from '@prisma/client';
import { BaseRepository } from 'src/common/base/BaseRepo';

@Injectable()
export class StudentRepository extends BaseRepository<
  Student
> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.student);
  }

  findByEmail(email: string) {
    return this.modelDelegate.findUnique({ where: { email } });
  }
}
