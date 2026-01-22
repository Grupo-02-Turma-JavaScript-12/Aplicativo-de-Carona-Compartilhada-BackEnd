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
import { ReservaService } from '../services/reservas.service';
import { Reserva } from '../entities/reservas.entity';

@Controller('/reservas')
export class ReservaController {
  constructor(private reservaService: ReservaService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Reserva[]> {
    return this.reservaService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Reserva> {
    return this.reservaService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() reserva: Reserva): Promise<Reserva> {
    return this.reservaService.create(reserva);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() reserva: Reserva): Promise<Reserva> {
    return this.reservaService.update(reserva);
  }

  @Put('/status/:id')
  @HttpCode(HttpStatus.OK)
  alterarStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { status: string },
  ): Promise<Reserva> {
    return this.reservaService.alterarStatus(id, body.status);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.reservaService.delete(id);
  }
}
