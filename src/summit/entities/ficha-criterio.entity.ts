import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Criterio } from './criterio.entity';
import { Ficha } from './ficha.entity';
import { Aspecto } from './aspecto.entity';
import { EvaluacionDetalle } from './evaluacion-detalle.entity';

@Entity({ name: 'ficha_criterio', schema: 'summit' })
export class FichaCriterio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  criterioId: number;

  @Column()
  fichaId: number;

  @Column()
  aspectoId: number;

  @ManyToOne(() => Criterio, (criterio) => criterio.fichasCriterios)
  @JoinColumn({ name: 'criterioId' })
  criterio: Criterio;

  @ManyToOne(() => Ficha, (ficha) => ficha.fichasCriterios)
  @JoinColumn({ name: 'fichaId' })
  ficha: Ficha;

  @ManyToOne(() => Aspecto, (aspecto) => aspecto.fichasCriterios)
  @JoinColumn({ name: 'aspectoId' })
  aspecto: Aspecto;

  @OneToMany(
    () => EvaluacionDetalle,
    (evaluaconDetalle) => evaluaconDetalle.fichaCriterio,
  )
  evaluaconesDetalles: EvaluacionDetalle[];
}
