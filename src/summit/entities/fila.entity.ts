export class Fila {
  id: number;

  columnaId: number;

  nombre: string;

  orden: number;

  filaId: number;

  tipo: 'grupo' | 'item';
}

// @Entity()
// export class Fila {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => Columna, columna => columna.filas, { onDelete: 'CASCADE' })
//   @JoinColumn({ name: 'columna_id' })
//   columna: Columna;

//   @Column()
//   nombre: string;

//   @Column({ nullable: true })
//   orden: number;

//   // 🧠 Autorreferencia: una fila puede tener un padre (grupo)
//   @ManyToOne(() => Fila, fila => fila.hijos, { nullable: true, onDelete: 'SET NULL' })
//   @JoinColumn({ name: 'padre_id' })
//   padre: Fila;

//   // 👶 Hijos: otras filas que dependen de esta (si es un grupo)
//   @OneToMany(() => Fila, fila => fila.padre)
//   hijos: Fila[];

//   @Column({
//     type: 'enum',
//     enum: ['grupo', 'item'],
//   })
//   tipo: 'grupo' | 'item';
// }
