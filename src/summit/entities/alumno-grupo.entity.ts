import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Grupo } from './grupo.entity';

export enum TipoAlumno {
  normal = 'NORMAL',
  especial = 'ESPECIAL',
}

@Entity('alumno_grupo')
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

  @Column({
    type: 'enum',
    enum: TipoAlumno,
    enumName: 'tipo_alumno_enum',
    name: 'tipo_alumno',
  })
  tipoAlumno: TipoAlumno;
}
