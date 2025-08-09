import {
  IsDate,
  IsNotEmpty,
  IsString,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class FaseDto {
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

export class CreateCronogramaDto {
  @IsDate()
  @Type(() => Date)
  fechaInicio: Date;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsDate()
  @Type(() => Date)
  fechaFin: Date;

  @IsNumber()
  temporadaId: number;

  @ValidateNested({ each: true })
  @Type(() => FaseDto)
  fases: FaseDto[];
}
