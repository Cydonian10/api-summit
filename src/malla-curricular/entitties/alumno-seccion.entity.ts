import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Seccion } from './seccion.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Temporada } from './temporada.entity';

@Entity('alumno_seccion')
export class AlumnoSeccion {
  @PrimaryColumn()
  seccionId: number;

  @PrimaryColumn()
  alumnoId: number;

  @PrimaryColumn()
  temporadaId: number;

  @ManyToOne(() => Seccion)
  @JoinColumn({ name: 'seccionId' })
  seccion: Seccion;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'alumnoId' })
  alumno: Usuario;

  @ManyToOne(() => Temporada)
  @JoinColumn({ name: 'temporadaId' })
  temporada: Temporada;
}
