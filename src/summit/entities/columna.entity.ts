import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ficha } from './ficha.entity';
import { Fila } from './fila.entity';

@Entity({ schema: 'summit', name: 'columna' })
export class Columna {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fichaId: number;

  @ManyToOne(() => Ficha)
  evaluacion: Ficha;

  @Column()
  nombre: string;

  @Column()
  orden: number;

  @OneToMany(() => Fila, (fila) => fila.columna)
  filas: Fila[];
}
