import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
