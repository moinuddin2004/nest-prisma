// src/users/repo/teacher.repo.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Teacher } from '@prisma/client';
import { BaseRepository } from 'src/common/base/BaseRepo';

@Injectable()
export class TeacherRepository extends BaseRepository<
    Teacher
> {
    constructor(prisma: PrismaService) {
        super(prisma, prisma.teacher);
    }

    findByEmail(email: string) {
        return this.modelDelegate.findUnique({ where: { email } });
    }
}
