import { Injectable } from '@nestjs/common';

@Injectable()
export class ShootService {
  getShipLocation(shipType: string, board : Map<string, number>){
    return {
      type: shipType,
      coordinates: [
        [0,1]
      ]
    }
  }
}