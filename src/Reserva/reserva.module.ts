import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaController } from './controllers/reserva.controller';
import { Reserva } from './entities/reserva.entity';
import { ReservaService } from './services/reserva.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva])],
  providers: [ReservaService],
  controllers: [ReservaController],
  exports: [ReservaService],
})
export class ReservaModule {}
