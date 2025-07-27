import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Grupo } from './grupo.entity';
import { AlumnoEvaluar } from './alumno-evaluar.entity';

export enum TipoAlumno {
  normal = 'NORMAL',
  especial = 'ESPECIAL',
}

@Entity({ schema: 'summit', name: 'alumno_grupo' })
export class AlumnoGrupo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  alumnoId: number;

  @Column()
  grupoId: number;

  @ManyToOne(() => Usuario, (alumno) => alumno.grupos, { onDelete: 'CASCADE' })
  alumno: Usuario;

  @ManyToOne(() => Grupo, (grupo) => grupo.alumnos, { onDelete: 'CASCADE' })
  grupo: Grupo;

  @Column()
  tipoAlumno: TipoAlumno;

  @OneToMany(() => AlumnoEvaluar, (alumnoEvaluar) => alumnoEvaluar.alumnoGrupo)
  alumnosEvaluar: AlumnoEvaluar[];
}
