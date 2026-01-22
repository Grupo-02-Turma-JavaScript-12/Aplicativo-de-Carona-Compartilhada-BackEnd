import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Reserva } from '../entities/reservas.entity';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    private reservaRepository: Repository<Reserva>,
  ) {}

  async findAll(): Promise<Reserva[]> {
    return await this.reservaRepository.find({
      relations: {
        carona: true,
        passageiro: true,
      },
    });
  }

  async findById(id: number): Promise<Reserva> {
    const reserva = await this.reservaRepository.findOne({
      where: { id },
      relations: {
        carona: true,
        passageiro: true,
      },
    });

    if (!reserva) {
      throw new HttpException('Reserva não encontrada!', HttpStatus.NOT_FOUND);
    }

    return reserva;
  }

  async create(reserva: Reserva): Promise<Reserva> {
    reserva.status = 'pendente';
    return await this.reservaRepository.save(reserva);
  }

  async update(reserva: Reserva): Promise<Reserva> {
    await this.findById(reserva.id);
    return await this.reservaRepository.save(reserva);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.reservaRepository.delete(id);
  }

  async alterarStatus(id: number, status: string): Promise<Reserva> {
    const reserva = await this.findById(id);

    if (!['pendente', 'confirmada', 'cancelada'].includes(status)) {
      throw new HttpException('Status inválido!', HttpStatus.BAD_REQUEST);
    }

    reserva.status = status;
    return await this.reservaRepository.save(reserva);
  }
}
