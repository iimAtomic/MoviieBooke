import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({example: 'vegbahermereite@gmail.com', description: 'Email address' })
    @IsEmail({}, { message: "L'email doit être valide" })
    email: string;

    @ApiProperty({example: 'dsvjdfknvieodbk' , description: 'Mots de passe' })
    @IsString({ message: "Le mot de passe doit être une chaîne de caractères" })
    @IsNotEmpty({ message: "Le mot de passe est requis" })
    password: string;
}
