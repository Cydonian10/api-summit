import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CursoEvaluar } from './curso-evaluar.entity';
import { Seccion } from 'src/malla-curricular/entitties/seccion.entity';

@Entity('seccion_curso_evaluacion', { schema: 'summit' })
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

  @ManyToOne(() => Seccion, (seccion) => seccion.seccionesCursosEvaluaciones)
  seccion: Seccion;

  @ManyToOne(() => CursoEvaluar, (ce) => ce.seccionesCursoEvaluacion, {
    onDelete: 'CASCADE',
  })
  cursoEvaluar: CursoEvaluar;
}
