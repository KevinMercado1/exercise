import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto.js';
import { UpdateReservationDto } from './dto/update-reservation.dto.js';

@Injectable()
export class ReservationService {
  create(createReservationDto: CreateReservationDto) {
    const reservation = {
      name: createReservationDto.name,
      email: createReservationDto.email,
      people: createReservationDto.people,
      createAt: new Date(),
    };

    if (reservation.people < 1) {
      throw new Error('Number of people must be at least 1');
    } else if (!reservation.name || !reservation.email || !reservation.people) {
      throw new Error('Name, email, and number of people are required');
    }
    return reservation;
  }

  findAll() {
    return `This action returns all reservations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
