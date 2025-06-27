import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ficha } from './ficha.entity';
import { Valoracion } from './valoracion.entity';

@Entity('escala')
export class Escala {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Ficha, (ficha) => ficha.escala)
  fichas: Ficha[];

  @OneToMany(() => Valoracion, (valoracion) => valoracion.escala)
  valoraciones: Valoracion[];
}
