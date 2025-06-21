import { Grado } from 'src/malla-curricular/entitties/grado.entity';
import { Seccion } from 'src/malla-curricular/entitties/seccion.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cronograma } from './cronograma.entity';
import { Curso } from 'src/malla-curricular/entitties/curso.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { SeccionCursoEvaluacion } from './seccion-curso-evalucion.entity';

@Entity('curso_evaluar')
export class CursoEvaluar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gradoId: number;

  @Column()
  seccionId: number;

  @Column()
  cronogramaId: number;

  @Column()
  cursoId: number;

  @Column()
  evaluadorId: number;

  @ManyToOne(() => Grado, (grado) => grado.cursosEvaluar)
  @JoinColumn({ name: 'gradoId' })
  grado: Grado;

  @ManyToOne(() => Seccion, (seccion) => seccion.cursosEvaluar)
  @JoinColumn({ name: 'seccionId' })
  seccion: Seccion;

  @ManyToOne(() => Cronograma, (cronograma) => cronograma)
  @JoinColumn({ name: 'cronogramaId' })
  cronograma: Cronograma;

  @ManyToOne(() => Curso, (curso) => curso.cursosEvaluar)
  @JoinColumn({ name: 'cursoId' })
  curso: Curso;

  @ManyToOne(() => Usuario, (evaluador) => evaluador.cursosEvaluar)
  @JoinColumn({ name: 'evaluadorId' })
  evaluador: Usuario;

  @OneToMany(() => SeccionCursoEvaluacion, (sce) => sce.cursoEvaluar)
  seccionesCursoEvaluacion: SeccionCursoEvaluacion;
}
