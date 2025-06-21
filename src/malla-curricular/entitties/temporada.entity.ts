import { Cronograma } from 'src/summit/entities/cronograma.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('temporada')
export class Temporada {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Cronograma, (cronograma) => cronograma)
  cronogramas: Cronograma[];
}
