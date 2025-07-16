import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { StudentRepository } from 'src/users/repo/student.repo';
import { UserStrategy } from './user.strartegy.interface';

@Injectable()
export class StudentStrategy implements UserStrategy {
    constructor(private studentRepo: StudentRepository) { }

    async signup(name: string, email: string, password: string) {
        const exists = await this.studentRepo.exists({ email });
        if (exists) throw new UnauthorizedException('Student already exists');

        const hashed = await bcrypt.hash(password, 10);
        return this.studentRepo.create({ name, email, password: hashed });
    }

    async signin(email: string, password: string) {
        const student = await this.studentRepo.findByEmail(email);
        if (!student) throw new UnauthorizedException('Student not found');

        const valid = await bcrypt.compare(password, student.password);
        if (!valid) throw new UnauthorizedException('Invalid password');

        return student;
    }

    async updateRefreshToken(id: number, refreshToken: string) {
        const hashed = await bcrypt.hash(refreshToken, 10);
        await this.studentRepo.update(id, { refreshToken: hashed });
    }

    async validateRefreshToken(id: number, refreshToken: string): Promise<boolean> {
        const student = await this.studentRepo.findById(id);
        if (!student || !student.refreshToken) return false;

        return await bcrypt.compare(refreshToken, student.refreshToken);
    }

    async removeRefreshToken(id: number) {
        await this.studentRepo.update(id, { refreshToken: null });
    }

    async signinById(id: number) {
        const user = await this.studentRepo.findById(id); 
        if (!user) throw new UnauthorizedException('User not found');
        return user;
    }

}
