import { Grado } from 'src/malla-curricular/entitties/grado.entity';
import { Seccion } from 'src/malla-curricular/entitties/seccion.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { AlumnoGrupo } from './alumno-grupo.entity';
import { Temporada } from 'src/malla-curricular/entitties/temporada.entity';

@Entity('grupo', { schema: 'summit' })
@Unique(['nombre', 'seccionId', 'gradoId', 'temporadaId'])
export class Grupo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  seccionId: number;

  @Column()
  gradoId: number;

  @Column()
  temporadaId: number;

  @Column()
  cantidadAlumnos: number;

  @ManyToOne(() => Seccion, (seccion) => seccion.grupos)
  seccion: Seccion;

  @ManyToOne(() => Temporada, (temporada) => temporada.grupos)
  temporada: Temporada;

  @ManyToOne(() => Grado, (grados) => grados.grupos)
  grado: Grado;

  @OneToMany(() => AlumnoGrupo, (ag) => ag.grupo)
  alumnos: AlumnoGrupo[];
}
