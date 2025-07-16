import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { TeacherRepository } from 'src/users/repo/teacher.repo';
import { UserStrategy } from './user.strartegy.interface';

@Injectable()
export class TeacherStrategy implements UserStrategy {
    constructor(private teacherRepo: TeacherRepository) { }

    async signup(name: string, email: string, password: string) {
        const exists = await this.teacherRepo.exists({ email });
        if (exists) throw new UnauthorizedException('Teacher already exists');

        const hashed = await bcrypt.hash(password, 10);
        return this.teacherRepo.create({ name, email, password: hashed });
    }

    async signin(email: string, password: string) {
        const teacher = await this.teacherRepo.findByEmail(email);
        if (!teacher) throw new UnauthorizedException('Teacher not found');

        const valid = await bcrypt.compare(password, teacher.password);
        if (!valid) throw new UnauthorizedException('Invalid password');

        return teacher;
    }

    async updateRefreshToken(id: number, refreshToken: string) {
        const hashed = await bcrypt.hash(refreshToken, 10);
        await this.teacherRepo.update(id, { refreshToken: hashed });
    }

    async validateRefreshToken(id: number, refreshToken: string): Promise<boolean> {
        const teacher = await this.teacherRepo.findById(id);
        if (!teacher || !teacher.refreshToken) return false;

        return await bcrypt.compare(refreshToken, teacher.refreshToken);
    }

    async removeRefreshToken(id: number) {
        await this.teacherRepo.update(id, { refreshToken: null });
    }
    async signinById(id: number) {
        const user = await this.teacherRepo.findById(id); 
        if (!user) throw new UnauthorizedException('User not found');
        return user;
    }

}
