import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterCommand } from './command/register.command';
import { LoginCommand } from './command/login.command';
import { RefreshTokenCommand } from './command/refresh-token.command';
import { AuthTokenDto } from './dto/auth.token.dto';
import { JwtTokenService } from './jwt.service';
import { AppLogger } from 'src/common/services/logger.service';
import { AdminStrategy } from './strategies/admin.strategy';
import { TeacherStrategy } from './strategies/teacher.strategy';
import { StudentStrategy } from './strategies/student.strategy';

// src/auth/auth.service.ts

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtTokenService: JwtTokenService,
        private readonly logger: AppLogger,
        private readonly adminStrategy: AdminStrategy,
        private readonly teacherStrategy: TeacherStrategy,
        private readonly studentStrategy: StudentStrategy,
    ) { }

    private getStrategy(role: string) {
        switch (role) {
            case 'admin': return this.adminStrategy;
            case 'teacher': return this.teacherStrategy;
            case 'student': return this.studentStrategy;
            default:
                this.logger.warn(`Invalid role: ${role}`, AuthService.name);
                throw new UnauthorizedException('Invalid role');
        }
    }

    async register(cmd: RegisterCommand): Promise<{ message: string }> {
        this.logger.info(`Registering ${cmd.role} with email: ${cmd.email}`, AuthService.name);

        const strategy = this.getStrategy(cmd.role);
        const user = await strategy.signup(cmd.name, cmd.email, cmd.password);

        return { message: 'User registered successfully' };
    }

    async login(cmd: LoginCommand): Promise<AuthTokenDto> {
        this.logger.info(`Login attempt for: ${cmd.email}`, AuthService.name);

        const strategy = this.getStrategy(cmd.role);
        const user = await strategy.signin(cmd.email, cmd.password);

        const tokens = await this.jwtTokenService.generateTokens(user.id.toString(), user.email, cmd.role);
        const hashedRefresh = await this.jwtTokenService.hashRefreshToken(tokens.refreshToken);

        await strategy.updateRefreshToken(user.id, hashedRefresh);

        this.logger.info(`Login successful for: ${cmd.email}`, AuthService.name);
        return AuthTokenDto.toDto(tokens, user);
    }


    async refreshTokens(body: RefreshTokenCommand): Promise<AuthTokenDto> {
        const { userId, refreshToken, role } = body;
        this.logger.debug(`Refreshing tokens for userId: ${userId}`, AuthService.name);

        const strategy = this.getStrategy(role);
        const isValid = await strategy.validateRefreshToken(userId, refreshToken);

        if (!isValid) {
            this.logger.warn(`Invalid refresh token for userId: ${userId}`, AuthService.name);
            throw new UnauthorizedException('Invalid refresh token');
        }

        const user = await strategy.signinById(userId); 
        const tokens = await this.jwtTokenService.generateTokens(user.id.toString(), user.email, role);
        const hashed = await this.jwtTokenService.hashRefreshToken(tokens.refreshToken);

        await strategy.updateRefreshToken(user.id, hashed);

        this.logger.info(`Token refresh successful for userId: ${userId}`, AuthService.name);
        return AuthTokenDto.toDto(tokens, user);
    }

}
