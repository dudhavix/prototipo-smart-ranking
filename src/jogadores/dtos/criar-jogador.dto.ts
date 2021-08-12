import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CriarJogadorDto {
    @IsNotEmpty()
    @MinLength(11)
    readonly telefoneCelular: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly nome: string;
}