import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reserva } from '../../Reserva/entities/reserva.entity';
import { Carona } from '../../Carona/entities/carona.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  nome: string;

  @IsNotEmpty()
  @Length(11, 11)
  @Column({ length: 11, nullable: false })
  @ApiProperty()
  cpf: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty({ example: 'email@email.com.br' })
  usuario: string;

  @IsNotEmpty()
  @Length(11, 11)
  @Column({ length: 11, nullable: false })
  @ApiProperty()
  telefone: string;

  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  @Max(5)
  @Column({
    type: 'decimal',
    precision: 3,
    scale: 1,
    nullable: false,
    default: 0,
  })
  @ApiProperty()
  nota_avaliacao: number;

  @ApiProperty()
  @OneToMany(() => Reserva, (reserva) => reserva.passageiro)
  reservas: Reserva[];

  @ApiProperty()
  @OneToMany(() => Carona, (carona) => carona.motorista)
  caronas: Carona[];
}
