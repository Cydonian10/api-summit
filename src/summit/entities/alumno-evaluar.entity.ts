import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CursoEvaluar } from './curso-evaluar.entity';
import { AlumnoGrupo } from './alumno-grupo.entity';
import { Evaluacion } from './evaluacion.entity';

@Entity({ schema: 'summit', name: 'alumno_evaluar' })
export class AlumnoEvaluar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cursoEvaluarId: number;

  @Column()
  alumnoGrupoId: number;

  @ManyToOne(() => CursoEvaluar)
  cursoEvaluar: CursoEvaluar;

  @ManyToOne(() => AlumnoGrupo)
  alumnoGrupo: AlumnoGrupo;

  @OneToMany(() => Evaluacion, (evaluacon) => evaluacon.alumnoEvaluar)
  evaluaciones: Evaluacion[];
}
