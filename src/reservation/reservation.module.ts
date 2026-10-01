import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service.js';
import { ReservationController } from './reservation.controller.js';

@Module({
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
