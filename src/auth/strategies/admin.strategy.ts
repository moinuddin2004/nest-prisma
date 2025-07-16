// src/auth/strategies/admin.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AdminRepository } from 'src/users/repo/admin.repo';
import { UserStrategy } from './user.strartegy.interface';

@Injectable()
export class AdminStrategy implements UserStrategy {
  constructor(private readonly adminRepo: AdminRepository) { }

  async signup(name: string, email: string, password: string) {
    const exists = await this.adminRepo.exists({ email });
    if (exists) throw new UnauthorizedException('Admin already exists');

    const hashed = await bcrypt.hash(password, 10);
    return this.adminRepo.create({ name, email, password: hashed });
  }

  async signin(email: string, password: string) {
    const admin = await this.adminRepo.findByEmail(email);
    if (!admin) throw new UnauthorizedException('Admin not found');

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) throw new UnauthorizedException('Invalid password');

    return admin;
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    const hashed = await bcrypt.hash(refreshToken, 10);
    await this.adminRepo.update(id, { refreshToken: hashed });
  }

  async validateRefreshToken(id: number, refreshToken: string): Promise<boolean> {
    const admin = await this.adminRepo.findById(id);
    if (!admin || !admin.refreshToken) return false;

    return await bcrypt.compare(refreshToken, admin.refreshToken);
  }

  async removeRefreshToken(id: number) {
    await this.adminRepo.update(id, { refreshToken: null });
  }

  async signinById(id: number) {
    const user = await this.adminRepo.findById(id);
    if (!user) throw new UnauthorizedException('User not found');
    return user;
  }

}
