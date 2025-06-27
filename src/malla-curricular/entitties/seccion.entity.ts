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
import { Proyecto } from 'src/summit/entities/proyecto.entity';
import { SeccionCursoEvaluacion } from 'src/summit/entities/seccion-curso-evalucion.entity';

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

  @OneToMany(() => Proyecto, (proyecto) => proyecto.seccion)
  proyectos: Proyecto[];

  @OneToMany(() => SeccionCursoEvaluacion, (sce) => sce.seccion)
  seccionesCursosEvaluaciones: SeccionCursoEvaluacion[];
}
