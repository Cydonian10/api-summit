import { IsString, MinLength } from 'class-validator';

export class UsuarioCreateDto {
  @IsString()
  nombre: string;

  @IsString()
  nickname: string;

  @IsString()
  @MinLength(4)
  password: string;
}
