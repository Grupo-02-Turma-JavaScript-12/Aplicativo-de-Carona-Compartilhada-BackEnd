import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Carona } from '../entities/carona.entity';
import { CaronaService } from '../services/carona.service';

@Controller('/caronas')
export class CaronaController {
  constructor(private readonly caronaService: CaronaService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Carona[]> {
    return this.caronaService.findAll();
  }
}
