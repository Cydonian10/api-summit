import { Grado } from 'src/malla-curricular/entitties/grado.entity';
import { Seccion } from 'src/malla-curricular/entitties/seccion.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlumnoGrupo } from './alumno-grupo.entity';

@Entity('grupo')
export class Grupo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  seccionId: number;

  @Column()
  gradoId: number;

  @Column()
  cantidadAlumnos: number;

  @ManyToOne(() => Seccion, (seccion) => seccion.grupos)
  seccion: Seccion;

  @ManyToOne(() => Grado, (grados) => grados.grupos)
  grado: Grado;

  @OneToMany(() => AlumnoGrupo, (ag) => ag.grupo)
  alumnos: AlumnoGrupo[];
}
