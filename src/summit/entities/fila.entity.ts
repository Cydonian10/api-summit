import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Columna } from './columna.entity';

@Entity({ schema: 'summit', name: 'fila' })
export class Fila {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  columnaId: number;

  @ManyToOne(() => Columna, (columna) => columna.filas)
  columna: Columna;

  @Column()
  nombre: string;

  @Column()
  orden: number;

  @Column({ nullable: true })
  filaPadreId: number;

  @ManyToOne(() => Fila, (fila) => fila.hijos, { nullable: true })
  filaPadre: Fila;

  @OneToMany(() => Fila, (fila) => fila.filaPadre)
  hijos: Fila[];

  @Column({ type: 'enum', enum: ['grupo', 'item'] })
  tipo: 'grupo' | 'item';
}
