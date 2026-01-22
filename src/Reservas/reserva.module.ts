import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
