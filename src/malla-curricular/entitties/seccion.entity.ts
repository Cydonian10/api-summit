import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Grado } from './grado.entity';
import { AlumnoSeccion } from './alumno-seccion.entity';
import { Grupo } from 'src/summit/entities/grupo.entity';
import { CursoEvaluar } from 'src/summit/entities/curso-evaluar.entity';
import { Proyecto } from 'src/summit/entities/proyecto.entity';

@Entity('seccion')
export class Seccion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToMany(() => Grado, (grado) => grado.secciones)
  grados: Grado[];

  @OneToMany(() => AlumnoSeccion, (as) => as.seccion)
  alumno: AlumnoSeccion;

  @OneToMany(() => Grupo, (grupo) => grupo.seccion)
  grupos: Grupo[];

  @OneToMany(() => CursoEvaluar, (cursoEvaluar) => cursoEvaluar.seccion)
  cursosEvaluar: CursoEvaluar[];

  @OneToMany(() => Proyecto, (proyecto) => proyecto.seccion)
  proyectos: Proyecto[];
}
