import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Carona } from '../../Carona/entities/carona.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_reservas' })
export class Reserva {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  status: string;

  @ManyToOne(() => Carona, (carona) => carona.reservas, {
    onDelete: 'CASCADE',
  })
  carona: Carona;

  @ApiProperty()
  @ManyToOne(() => Usuario, (usuario) => usuario.reservas, {
    onDelete: 'CASCADE',
  })
  passageiro: Usuario;
}
