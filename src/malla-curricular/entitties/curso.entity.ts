import { CursoEvaluar } from 'src/summit/entities/curso-evaluar.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('curso')
export class Curso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => CursoEvaluar, (cursoEvaluar) => cursoEvaluar.curso)
  cursosEvaluar: CursoEvaluar[];
}
