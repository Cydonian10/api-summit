import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsString,
  Length,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateAlumnoSeccionDto {
  @IsNumber()
  seccionId: number;

  @IsNumber()
  gradoId: number;

  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  alumnosIds: number[];

  @IsNumber()
  temporadaId: number;
}

export class FiltroAlumnoSecionDto {
  @IsNumber()
  @Type(() => Number)
  seccionId: number;

  @IsNumber()
  @Type(() => Number)
  gradoId: number;

  @IsNumber()
  @Type(() => Number)
  temporadaId: number;
}

class AlumnoDto {
  @IsString()
  @Length(2, 50)
  nombre: string;

  @IsString()
  @Length(2, 30)
  nickname: string;

  @IsString()
  @Length(6, 20)
  password: string;
}

export class CreateAlumnoMatriculadoDto {
  @IsInt()
  @Min(1)
  seccionId: number;

  @IsInt()
  @Min(1)
  temporadaId: number;

  @IsInt()
  @Min(1)
  gradoId: number;

  @ValidateNested()
  @Type(() => AlumnoDto)
  alumno: AlumnoDto;
}
