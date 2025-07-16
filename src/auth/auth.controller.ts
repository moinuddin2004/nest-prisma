import {
    Body,
    Controller,
    Get,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterCommand } from './command/register.command';
import { LoginCommand } from './command/login.command';
import { RefreshTokenCommand } from './command/refresh-token.command';
import { ResponseWrapper } from 'src/common/dtos/ResponseWrapper';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() body: RegisterCommand) {
        const result = await this.authService.register(body);
        return ResponseWrapper.success(result, 'Register seccessful');
    }

    @Post('login')
    async login(@Body() body: LoginCommand) {
        const result = await this.authService.login(body);
        return ResponseWrapper.success(result, 'Login successful');
    }

    @Post('refresh')
    async refresh(@Body() body: RefreshTokenCommand) {
        const result = await this.authService.refreshTokens(body);
        return ResponseWrapper.success(result, 'Tokens refreshed');
    }

}
