import { Grado } from 'src/malla-curricular/entitties/grado.entity';
import { Seccion } from 'src/malla-curricular/entitties/seccion.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Documento } from './documentos.entity';

@Entity('proyecto')
export class Proyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gradoId: number;

  @Column({
    nullable: true,
  })
  seccionId: number | null;

  @Column()
  usuarioId: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Grado, (grado) => grado.proyectos)
  @JoinColumn({ name: 'gradoId' })
  grado: Grado;

  @ManyToOne(() => Seccion, (seccion) => seccion.proyectos)
  @JoinColumn({ name: 'seccionId' })
  seccion: Seccion | null;

  @ManyToOne(() => Usuario, (usuario) => usuario.proyectos)
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuario;

  @ManyToMany(() => Documento, (documento) => documento.proyectos)
  @JoinTable({
    name: 'proyecto_documento',
  })
  documentos: Documento[];
}
