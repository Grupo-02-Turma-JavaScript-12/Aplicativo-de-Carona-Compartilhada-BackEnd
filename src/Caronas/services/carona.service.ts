import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';
import { Carona } from '../entities/carona.entity';

@Injectable()
export class CaronaService {
  constructor(
    @InjectRepository(Carona)
    private caronaRepository: Repository<Carona>,
  ) {}

  async findAll(): Promise<Carona[]> {
    return await this.caronaRepository.find();
  }

  async findById(id: number): Promise<Carona> {
    const carona = await this.caronaRepository.findOne({
      where: {
        id,
      },
    });

    if (!carona)
      throw new HttpException('Carona não encontrada!', HttpStatus.NOT_FOUND);

    return carona;
  }
  async findAllByDestino(destino: string): Promise<Carona[]> {
    return await this.caronaRepository.find({
      where: {
        destino: ILike(`%${destino}%`),
      },
    });
  }

  async create(carona: Carona): Promise<Carona> {
    return await this.caronaRepository.save(carona);
  }

  async update(carona: Carona): Promise<Carona> {
    await this.findById(carona.id);

    return await this.caronaRepository.save(carona);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.caronaRepository.delete(id);
  }
}
