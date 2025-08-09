import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GeneraGrupoDto {
  @IsNumber()
  temporadaId: number;

  @IsNumber()
  seccionId: number;

  @IsNumber()
  gradoId: number;

  @IsNumber()
  cantidadAlumnos: number;
}

export class DeleteGrupoDto {
  @IsNumber()
  @Type(() => Number)
  temporadaId: number;

  @IsNumber()
  @Type(() => Number)
  seccionId: number;

  @IsNumber()
  @Type(() => Number)
  gradoId: number;
}

export class FiltroCantidadAlumnos {
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

export class UpdateGrupoAlumnoDto {
  @IsNumber()
  alumnoId: number;
  @IsNumber()
  grupoId: number;
  @IsNumber()
  grupoDestinoId: number;
}
