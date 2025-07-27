import { Temporada } from 'src/malla-curricular/entitties/temporada.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Fase } from './fases.entity';
import { CursoEvaluar } from './curso-evaluar.entity';
import { Ficha } from './ficha.entity';

@Entity({ schema: 'summit', name: 'cronograma' })
export class Cronograma {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  inicio: Date;

  @Column()
  nombre: string;

  @ManyToOne(() => Temporada, (temporada) => temporada.cronogramas)
  temporada: Temporada;

  @OneToMany(() => Fase, (fase) => fase.cronograma)
  fases: Fase[];

  @OneToMany(() => CursoEvaluar, (cursoEvaluar) => cursoEvaluar.cronograma)
  cursosEvaluar: CursoEvaluar[];

  @OneToMany(() => Ficha, (ficha) => ficha.cronograma)
  fichas: Ficha[];
}
