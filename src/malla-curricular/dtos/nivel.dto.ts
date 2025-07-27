import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CretaeNivelDto {
  @IsString()
  nombre: string;

  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  gradoIds: number[];
}

export class UpdateNivelDto {
  @IsString()
  @IsOptional()
  nombre: string;
}

export class InsertGradoNivelDto {
  @IsArray()
  @IsNotEmpty()
  @IsInt({ each: true })
  @Type(() => Number)
  gradoIds: number[];
}
