import { Controller, Post, Body, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth') // 🔹 Tags pour organiser les routes dans Swagger UI
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    @ApiOperation({ summary: 'Inscription d\'un nouvel utilisateur' })
    @ApiResponse({ status: 201, description: 'Utilisateur enregistré avec succès.' })
    @ApiResponse({ status: 400, description: 'Requête invalide.' })
    async register(@Body() registerDto: RegisterDto) {
        try {
            const user = await this.userService.register(registerDto);
            return { message: "Inscription réussie", user };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Post('login')
    @ApiOperation({ summary: 'Connexion d\'un utilisateur' })
    @ApiResponse({ status: 200, description: 'Connexion réussie.' })
    @ApiResponse({ status: 401, description: 'Non autorisé.' })
    async login(@Body() loginDto: LoginDto) {
        try {
            const token = await this.userService.login(loginDto);
            return { message: "Connexion réussie", token };
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }
}
