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
import { Ficha } from 'src/summit/entities/ficha.entity';
import { Curso } from './curso.entity';

@Entity('grado')
export class Grado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  nivelId: number | null;

  @ManyToOne(() => Nivel, (nivel) => nivel.grados, {
    nullable: true,
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'nivelId' })
  nivel: Nivel;

  @ManyToMany(() => Seccion, (seccion) => seccion.grados)
  @JoinTable({
    name: 'grado_seccion',
  })
  secciones: Seccion[];

  @OneToMany(() => Grupo, (grupo) => grupo.grado)
  grupos: Grupo[];

  @OneToMany(() => CursoEvaluar, (cursoEvaluar) => cursoEvaluar.grado)
  cursosEvaluar: CursoEvaluar[];

  @OneToMany(() => Proyecto, (proyecto) => proyecto.grado)
  proyectos: Proyecto[];

  @OneToMany(() => Ficha, (ficha) => ficha.nivel)
  fichas: Ficha[];

  @ManyToMany(() => Curso, (curso) => curso.grados)
  @JoinTable({
    name: 'grado_curso',
  })
  cursos: Curso[];
}
