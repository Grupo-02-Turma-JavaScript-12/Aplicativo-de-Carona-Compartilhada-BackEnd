import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  nome: string;

  @IsNotEmpty()
  @Length(11, 11)
  @Column({ length: 11, nullable: false })
  cpf: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  usuario: string;

  @IsNotEmpty()
  @Length(11, 11)
  @Column({ length: 11, nullable: false })
  telefone: string;

  @IsNotEmpty()
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
  nota_avaliacao: number;
}
