import { Type } from 'class-transformer';
import { IsNotEmpty, IsDate } from 'class-validator';

export class UpdateFechaDto {
  @IsNotEmpty({ message: 'La fecha de inicio es obligatoria' })
  @Type(() => Date) // convierte string a Date automáticamente
  @IsDate({ message: 'La fecha de inicio debe ser una fecha válida' })
  fechaInicio: Date;
}
