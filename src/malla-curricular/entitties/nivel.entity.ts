import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Grado } from './grado.entity';
import { Ficha } from 'src/summit/entities/ficha.entity';

@Entity('nivel')
export class Nivel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Grado, (grado) => grado.nivel)
  grados: Grado[];

  @OneToMany(() => Ficha, (ficha) => ficha.nivel)
  fichas: Ficha[];
}
