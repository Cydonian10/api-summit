import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CursoEvaluar } from './curso-evaluar.entity';
import { Seccion } from 'src/malla-curricular/entitties/seccion.entity';

@Entity('seccion_curso_evaluacion')
export class SeccionCursoEvaluacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date')
  fechaInicio: Date;

  @Column()
  cursoEvaluarId: number;

  @Column()
  seccionId: number;

  @Column({ nullable: true })
  nota: number | null;

  @ManyToOne(() => Seccion)
  seccion: Seccion;

  @ManyToOne(() => CursoEvaluar, (ce) => ce.seccionesCursoEvaluacion)
  cursoEvaluar: CursoEvaluar;
}
