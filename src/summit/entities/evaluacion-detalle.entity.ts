import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Evaluacion } from './evaluacion.entity';
import { Fila } from './fila.entity';

@Entity({ schema: 'summit', name: 'evaluacion_detalle' })
export class EvaluacionDetalle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  evaluacionId: number;

  @Column()
  filaId: number;

  @ManyToOne(() => Fila)
  fila: Fila;

  @Column()
  valor: number;

  @ManyToOne(() => Evaluacion)
  evaluacion: Evaluacion;
}
