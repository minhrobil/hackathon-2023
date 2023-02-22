import { Injectable } from '@nestjs/common';
import { ShootDto } from '../dto/shoot.dto';
import { Coordinate } from '../entities/coordinate.entity';
import { Queue } from './queue.service';

@Injectable()
export class ShootService {
  huntShip(shootDto: ShootDto, enemyBoard: Map<string, number>, huntShotQueue: Queue<Coordinate>) {
    return huntShotQueue.pop()
  }
}