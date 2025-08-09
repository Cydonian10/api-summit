import { IsArray, ArrayNotEmpty, IsNumber, IsInt } from 'class-validator';

export class CrearCursoEvaluarDto {
  @IsArray()
  // @ArrayNotEmpty()
  @IsInt({ each: true })
  gradoIds: number[];

  @IsNumber()
  cronogramaId: number;

  @IsNumber()
  cursoId: number;

  @IsNumber()
  evaluadorId: number;
}
