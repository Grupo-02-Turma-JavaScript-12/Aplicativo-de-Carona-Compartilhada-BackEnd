import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_caronas' })
export class Carona {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  origem: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  destino: string;

  @IsNotEmpty()
  @Column({ type: 'int', nullable: false })
  vagas_disponiveis: number;

  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  valor: number;
}
