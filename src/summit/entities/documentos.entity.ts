import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Proyecto } from './proyecto.entity';

@Entity({ schema: 'summit', name: 'documento' })
export class Documento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToMany(() => Proyecto)
  proyectos: Proyecto[];
}
