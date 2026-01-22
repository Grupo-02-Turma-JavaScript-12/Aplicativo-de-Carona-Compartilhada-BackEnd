import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
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

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Carona> {
    return this.caronaService.findById(id);
  }

  @Get('/destino/:destino')
  @HttpCode(HttpStatus.OK)
  findAllByDestino(@Param('destino') destino: string): Promise<Carona[]> {
    return this.caronaService.findAllByDestino(destino);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() carona: Carona): Promise<Carona> {
    return this.caronaService.create(carona);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() carona: Carona): Promise<Carona> {
    return this.caronaService.update(carona);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.caronaService.delete(id);
  }
}
