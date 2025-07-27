import { IsOptional, IsString } from 'class-validator';

export class CreateSeccionDto {
  @IsString()
  nombre: string;
}

export class UpdateSeccionDto {
  @IsString()
  @IsOptional()
  nombre: string;
}
