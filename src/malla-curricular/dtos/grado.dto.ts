import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateGradoDto {
  @IsString()
  nombre: string;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  nivelId: number;

  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  seccionesIds: number[];

  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  cursosIds: number[];
}

export class UpdateGradoDto {
  @IsString()
  nombre: string;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  nivelId: number;
}

export class InsertSeccionesGradoDto {
  @IsArray()
  @IsNotEmpty()
  @IsInt({ each: true })
  @Type(() => Number)
  seccionesIds: number[];
}

export class InsertCursosGradoDto {
  @IsArray()
  @IsNotEmpty()
  @IsInt({ each: true })
  @Type(() => Number)
  cursosIds: number[];
}
