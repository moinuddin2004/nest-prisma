import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtTokenService } from './jwt.service';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { CommonModule } from 'src/common/common.module';
import { AdminStrategy } from './strategies/admin.strategy';
import { TeacherStrategy } from './strategies/teacher.strategy';
import { StudentStrategy } from './strategies/student.strategy';
import { StudentRepository } from 'src/users/repo/student.repo';
import { TeacherRepository } from 'src/users/repo/teacher.repo';
import { AdminRepository } from 'src/users/repo/admin.repo';

@Module({
  imports: [CommonModule],
  providers: [
    AuthService,
    JwtTokenService,
    NestJwtService,
    ConfigService,
    AdminStrategy,
    TeacherStrategy,
    StudentStrategy,
    AdminRepository,
    TeacherRepository,
    StudentRepository,
  ],
  controllers: [AuthController],
})
export class AuthModule { }
