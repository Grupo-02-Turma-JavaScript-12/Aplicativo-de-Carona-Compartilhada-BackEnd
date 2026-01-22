import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Carona } from '../../carona/entities/carona.entity';

@Entity({ name: 'reservas' })
export class Reserva {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @ManyToOne(() => Carona, (carona) => carona.reservas, {
    onDelete: 'CASCADE',
  })
  carona: Carona;

  @ManyToOne(() => Usuario, (usuario) => usuario.reservas, {
    onDelete: 'CASCADE',
  })
  passageiro: Usuario;
}