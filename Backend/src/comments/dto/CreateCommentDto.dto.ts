import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    IsMongoId,
} from 'class-validator';

export class CreateCommentDto {
    
    // El postId debe ser un ObjectId válido de MongoDB
    @IsMongoId()
    @IsNotEmpty()
    postId: string;

    // El nombre debe tener al menos 3 caracteres
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    // El email debe ser válido
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    // El comentario debe tener al menos 5 caracteres
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    body: string;
}