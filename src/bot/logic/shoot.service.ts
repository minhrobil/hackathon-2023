import { Injectable } from '@nestjs/common';
import { ShootDto } from '../dto/shoot.dto';
import { Coordinate } from '../entities/coordinate.entity';
import { Stack } from './stack.service';

@Injectable()
export class ShootService {
  huntShip(shootDto: ShootDto, enemyBoard: Map<string, number>, huntShotStack: Stack<Coordinate>) {
    return huntShotStack.pop()
  }
}