import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlumnoEvaluar } from './alumno-evaluar.entity';
import { Ficha } from './ficha.entity';
import { EvaluacionDetalle } from './evaluacion-detalle.entity';

@Entity({ schema: 'summit', name: 'evaluacion' })
export class Evaluacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  alumnoEvaluarId: number;

  @Column()
  fichaId: number;

  @Column()
  total: number;

  @Column()
  nota: number;

  @Column()
  observacion: string;

  @ManyToOne(() => AlumnoEvaluar, (alumnoEvaluar) => alumnoEvaluar.evaluaciones)
  alumnoEvaluar: AlumnoEvaluar;

  @ManyToOne(() => Ficha, (ficha) => ficha.evaluaciones)
  ficha: Ficha;

  @OneToMany(
    () => EvaluacionDetalle,
    (evaluaconDetalle) => evaluaconDetalle.evaluacion,
  )
  evaluaconesDetalles: EvaluacionDetalle[];
}
