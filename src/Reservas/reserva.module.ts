import { Module } from '@nestjs/common';
import { Carona } from './entities/carona.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaronaService } from './services/carona.service';
import { CaronaController } from './controllers/carona.controller';
import { Reserva } from './entities/reservas.entity';
import { ReservaService } from './services/reservas.service';
import { ReservaController } from './controllers/reservas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva])],
  providers: [ReservaService],
  controllers: [ReservaController],
  exports: [ReservaService],
})
export class CaronaModule {}
