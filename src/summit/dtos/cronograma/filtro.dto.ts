import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class FiltroCronogramaDto {
  @IsNumber()
  @Type(() => Number)
  temporadaId: number;
}
