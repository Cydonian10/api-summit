import { CursoEvaluar } from 'src/summit/entities/curso-evaluar.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Grado } from './grado.entity';

@Entity('curso')
export class Curso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => CursoEvaluar, (cursoEvaluar) => cursoEvaluar.curso)
  cursosEvaluar: CursoEvaluar[];

  @ManyToMany(() => Grado, (grado) => grado.cursos)
  grados: Grado[];
}
