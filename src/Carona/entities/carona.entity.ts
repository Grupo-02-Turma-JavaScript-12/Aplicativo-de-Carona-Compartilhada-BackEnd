import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reserva } from '../../Reserva/entities/reserva.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_caronas' })
export class Carona {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  origem: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  destino: string;

  @IsNotEmpty()
  @Column({ type: 'int', nullable: false })
  @ApiProperty()
  vagas_disponiveis: number;

  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  @ApiProperty()
  valor: number;

  @ApiProperty()
  @OneToMany(() => Reserva, (reserva) => reserva.carona)
  reservas: Reserva[];

  @ApiProperty()
  @ManyToOne(() => Usuario, (usuario) => usuario.caronas, {
    onDelete: 'CASCADE',
  })
  motorista: Usuario;
}
