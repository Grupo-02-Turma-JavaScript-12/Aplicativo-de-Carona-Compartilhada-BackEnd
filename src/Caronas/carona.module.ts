import { Module } from '@nestjs/common';
import { Carona } from './entities/carona.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaronaService } from './services/carona.service';
import { CaronaController } from './controllers/carona.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Carona])],
  providers: [CaronaService],
  controllers: [CaronaController],
  exports: [],
})
export class CaronaModule {}
