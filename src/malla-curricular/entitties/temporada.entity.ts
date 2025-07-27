import { Cronograma } from 'src/summit/entities/cronograma.entity';
import { Proyecto } from 'src/summit/entities/proyecto.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('temporada')
export class Temporada {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Cronograma, (cronograma) => cronograma)
  cronogramas: Cronograma[];

  @OneToMany(() => Proyecto, (proyecto) => proyecto.temporada)
  proyectos: Proyecto[];
}
