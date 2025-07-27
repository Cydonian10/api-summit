import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FichaCriterio } from './ficha-criterio.entity';

@Entity({ schema: 'summit', name: 'criterio' })
export class Criterio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @OneToMany(() => FichaCriterio, (fichaCriterio) => fichaCriterio.criterio)
  fichasCriterios: FichaCriterio[];
}
