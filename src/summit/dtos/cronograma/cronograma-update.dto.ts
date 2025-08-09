import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class UpdateFaseDto {
  @IsOptional()
  @IsNumber()
  id?: number; // ← solo si es fase ya existente

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsDate()
  @Type(() => Date)
  fechaInicio: Date;

  @IsDate()
  @Type(() => Date)
  fechaFin: Date;
}

export class UpdateCronogramaDto {
  @IsDate()
  @Type(() => Date)
  fechaInicio: Date;

  @IsDate()
  @Type(() => Date)
  fechaFin: Date;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  temporadaId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateFaseDto)
  fases: UpdateFaseDto[];
}
