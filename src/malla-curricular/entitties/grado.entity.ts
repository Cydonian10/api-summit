import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Seccion } from './seccion.entity';
import { Nivel } from './nivel.entity';
import { Grupo } from 'src/summit/entities/grupo.entity';
import { CursoEvaluar } from 'src/summit/entities/curso-evaluar.entity';
import { Proyecto } from 'src/summit/entities/proyecto.entity';

@Entity('grado')
export class Grado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  nivelId: number;

  @ManyToOne(() => Nivel, (nivel) => nivel.grados)
  @JoinColumn({ name: 'nivelId' })
  nivel: Nivel;

  @ManyToMany(() => Seccion, (seccion) => seccion.grados)
  @JoinTable({
    name: 'grado_seccion',
  })
  secciones: Seccion[];

  @ManyToOne(() => Grupo, (grupo) => grupo.grado)
  grupos: Grupo[];

  @OneToMany(() => CursoEvaluar, (cursoEvaluar) => cursoEvaluar.grado)
  cursosEvaluar: CursoEvaluar[];

  @OneToMany(() => Proyecto, (proyecto) => proyecto.grado)
  proyectos: Proyecto[];
}
