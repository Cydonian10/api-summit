import { IsOptional, IsString } from 'class-validator';

export class CreateCursoDto {
  @IsString()
  nombre: string;
}

export class UpdateCursoDto {
  @IsOptional()
  @IsString()
  nombre: string;
}
