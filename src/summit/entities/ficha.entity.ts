import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cronograma } from './cronograma.entity';
import { Nivel } from 'src/malla-curricular/entitties/nivel.entity';
import { Grado } from 'src/malla-curricular/entitties/grado.entity';
import { Escala } from './escala.entity';
import { TipoAlumno } from './alumno-grupo.entity';
import { Evaluacion } from './evaluacion.entity';

@Entity('ficha', { schema: 'summit' })
export class Ficha {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  cronogramaId: number;

  @Column()
  nivelId: number;

  @Column()
  gradoId: number | null;

  @Column()
  escalaId: number;

  @Column()
  tipoAlumno: TipoAlumno;

  @ManyToOne(() => Cronograma, (cronograma) => cronograma.fichas)
  cronograma: Cronograma;

  @ManyToOne(() => Nivel, (nivel) => nivel.fichas)
  nivel: Nivel;

  @ManyToOne(() => Grado, (grado) => grado.fichas)
  grado: Grado;

  @ManyToOne(() => Escala, (escala) => escala.fichas)
  escala: Escala;
}
