import { AlumnoGrupo } from 'src/summit/entities/alumno-grupo.entity';
import { CursoEvaluar } from 'src/summit/entities/curso-evaluar.entity';
import { Proyecto } from 'src/summit/entities/proyecto.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @OneToMany(() => AlumnoGrupo, (ag) => ag.alumno)
  grupos: AlumnoGrupo[];

  @OneToMany(() => CursoEvaluar, (cursoEvaluar) => cursoEvaluar.evaluador)
  cursosEvaluar: CursoEvaluar[];

  @OneToMany(() => Proyecto, (proyecto) => proyecto.usuario)
  proyectos: Proyecto[];
}
