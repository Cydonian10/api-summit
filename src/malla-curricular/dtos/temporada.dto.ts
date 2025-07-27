import { IsOptional, IsString } from 'class-validator';

export class CreateTemporadaDto {
  @IsString()
  nombre: string;
}

export class UpdateTemporadaDto {
  @IsString()
  @IsOptional()
  nombre: string;
}
