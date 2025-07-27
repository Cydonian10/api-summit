import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Seccion } from './seccion.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Temporada } from './temporada.entity';
import { Grado } from './grado.entity';

@Entity('alumno_seccion')
@Unique(['seccionId', 'gradoId', 'alumnoId', 'temporadaId'])
export class AlumnoSeccion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  seccionId: number;

  @Column()
  gradoId: number;

  @Column()
  alumnoId: number;

  @Column()
  temporadaId: number;

  @ManyToOne(() => Seccion)
  @JoinColumn({ name: 'seccionId' })
  seccion: Seccion;

  @ManyToOne(() => Grado)
  @JoinColumn({ name: 'gradoId' })
  grado: Grado;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'alumnoId' })
  alumno: Usuario;

  @ManyToOne(() => Temporada)
  @JoinColumn({ name: 'temporadaId' })
  temporada: Temporada;
}
