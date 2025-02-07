import { IsEmail, IsString, MinLength, IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({ example: 'john.doe@example.com', description: 'L\'adresse e-mail de l\'utilisateur' })
    @IsEmail({}, { message: "L'email doit être valide" })
    email: string;

    @ApiProperty({ example: 'Doe', description: 'Le nom de famille de l\'utilisateur' })
    @IsString({ message: "Le nom doit être une chaîne de caractères" })
    @IsNotEmpty({ message: "Le nom est requis" })
    name: string;

    @ApiProperty({ example: 'John', description: 'Le prénom de l\'utilisateur' })
    @IsString({ message: "Le prénom doit être une chaîne de caractères" })
    @IsNotEmpty({ message: "Le prénom est requis" })
    surname: string;

    @ApiProperty({ example: 'password123', description: 'Le mot de passe de l\'utilisateur' })
    @IsString({ message: "Le mot de passe est requis" })
    @MinLength(6, { message: "Le mot de passe doit contenir au moins 6 caractères" })
    password: string;
}




