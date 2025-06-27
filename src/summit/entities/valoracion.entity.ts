import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Escala } from './escala.entity';

@Entity('valoracion')
export class Valoracion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  value: number;

  @Column()
  escalaId: number;

  @ManyToOne(() => Escala, (escala) => escala.valoraciones)
  escala: Escala;
}
