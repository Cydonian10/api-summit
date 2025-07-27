import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cronograma } from './cronograma.entity';

@Entity({ schema: 'summit', name: 'fase' })
export class Fase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('date')
  fechaInicio: Date;

  @Column('date')
  fechaFin: Date;

  @ManyToOne(() => Cronograma)
  cronograma: Cronograma;
}
