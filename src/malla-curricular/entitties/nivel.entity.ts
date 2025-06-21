import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Grado } from './grado.entity';

@Entity('nivel')
export class Nivel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Grado, (grado) => grado.nivel)
  grados: Grado[];
}
