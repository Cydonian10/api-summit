import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FichaCriterio } from './ficha-criterio.entity';

@Entity({ schema: 'summit', name: 'aspecto' })
export class Aspecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @OneToMany(() => FichaCriterio, (fichaCriterio) => fichaCriterio.aspecto)
  fichasCriterios: FichaCriterio[];
}
