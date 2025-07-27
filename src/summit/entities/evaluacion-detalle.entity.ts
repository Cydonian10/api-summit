import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FichaCriterio } from './ficha-criterio.entity';
import { Evaluacion } from './evaluacion.entity';

@Entity({ schema: 'summit', name: 'evaluacion_detalle' })
export class EvaluacionDetalle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fichaCriterioId: number;

  @Column()
  evalucionId: number;

  @ManyToOne(() => FichaCriterio)
  fichaCriterio: FichaCriterio;

  @ManyToOne(() => Evaluacion)
  evaluacion: Evaluacion;
}
